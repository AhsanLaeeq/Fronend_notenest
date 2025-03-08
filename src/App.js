// import './App.css';
// import { Navbar } from './components/Navbar';
// import { Home } from './components/Home';
// import  About  from "./components/About";
// import Signup from './components/Signup';
// import Login from './components/Login';
// import NoteState from './context/notes/NoteState';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import { useState } from 'react';
// import Alert from './components/Alert';









// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate
// } from "react-router-dom";







// function App() {
//   const [alert, Setalert] = useState();
//   const showAlert =(message,type)=>{
//     Setalert({
//       type:type,
//       message:message
  
//   })
//    setTimeout(() => {
//     Setalert(null);
 
//    }, 2000);
//   }

//   return (
//     <>
//     <NoteState>
//     <Router basename="/Frontend_notenest">
   

//     <Navbar/>
//     <Alert alert={alert}/>
//     <Routes>
//           <Route path="/"element= {<Home showAlert={showAlert}/>}/>
//           <Route  path="/about"element={<About/>}/>
//           <Route path="/login"element= {<Login  showAlert={showAlert}/>}/>
//           <Route  path="/signup"element={<Signup  showAlert={showAlert}/>}/>
//         </Routes>
   
    
  


//     </Router>
//     </NoteState>
//     </>
//   );
// }

// export default App;


import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import About from "./components/About";
import Signup from './components/Signup';
import Login from './components/Login';
import NoteState from './context/notes/NoteState';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState } from 'react';
import Alert from './components/Alert';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate  // Import Navigate to handle redirect
} from "react-router-dom";

function App() {
  const [alert, Setalert] = useState();
  const showAlert = (message, type) => {
    Setalert({
      type: type,
      message: message
    });
    setTimeout(() => {
      Setalert(null);
    }, 2000);
  };

  return (
    <>
      <NoteState>
        <Router basename="/Frontend_notenest">
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            {/* Redirect from root '/' to '/signup' */}
            <Route path="/" element={<Navigate to="/signup" replace />} />

            {/* Routes */}
            <Route path="/home" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

