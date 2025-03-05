// const connectToMongo= require("./db");
// const express = require('express')
// var cors = require('cors')





// connectToMongo();

// const app = express()
// const port = 8080
// app.use(cors())
// app.use(express.json())

// app.use('/api/auth',require('./routes/auth'))
// app.use('/api/notes',require('./routes/notes'))

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// const connectToMongo = require("./db");
// const express = require("express");
// var cors = require("cors");
// require("dotenv").config(); // Load environment variables

// connectToMongo();

// const app = express();
// const PORT = process.env.PORT || 8080; // Use Railway-assigned PORT or default to 8080

// app.use(cors());
// app.use(express.json());

// // ✅ Debugging middleware to log all incoming requests
// app.use((req, res, next) => {
//   console.log(`Incoming request: ${req.method} ${req.url}`);
//   next();
// });

// // Routes
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/notes", require("./routes/notes"));

// // ✅ Handle incorrect routes
// app.use((req, res) => {
//   res.status(404).json({ error: "Route not found" });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


const express = require("express");
const connectToMongo = require("./backend/db"); // Adjust path if needed
var cors = require("cors");
require("dotenv").config();
const path = require("path");

connectToMongo();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// ✅ Serve API Routes First
app.use("/api/auth", require("./backend/routes/auth")); // Adjust path if needed
app.use("/api/notes", require("./backend/routes/notes"));

// ✅ Serve Frontend (Only If No API Route Matched)
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
