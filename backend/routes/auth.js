const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Debugging Log for Incoming Requests
router.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log("Request Body:", req.body);
    next();
});

// Create a User using: POST "/api/auth/createuser". Doesn't require auth
router.post(
    '/createuser',
    [
        body('password', 'Must be at least 8 characters').isLength({ min: 8 }),
        body('name', 'Enter a valid name').isLength({ min: 5 }),
        body('email', 'Enter a valid email').isEmail(),
    ],
    async (req, res) => {
        let success = false;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: "User with this email already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });

            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_SECRET);

            success = true;
            res.json({ success, authtoken });
        } catch (err) {
            console.error("Error in /createuser:", err.message);
            res.status(500).send("Some error occurred");
        }
    }
);

// Authenticate a user using POST "/api/auth/login". No login required
router.post(
    '/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be blank').exists(),
    ],
    async (req, res) => {
        let success = false;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: "Invalid credentials" });
            }

            // Compare passwords
            let passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ success, error: "Invalid credentials" });
            }

            // Generate JWT token
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, JWT_SECRET);

            success = true;
            res.json({ success, authtoken });
        } catch (err) {
            console.error("Error in /login:", err.message);
            res.status(500).send("Some error occurred");
        }
    }
);

// Get user details: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.json(user);
    } catch (err) {
        console.error("Error in /getuser:", err.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
