import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import  About  from "./components/About";
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
  Routes
} from "react-router-dom";







function App() {
  const [alert, Setalert] = useState();
  const showAlert =(message,type)=>{
    Setalert({
      type:type,
      message:message
  
  })
   setTimeout(() => {
    Setalert(null);
 
   }, 2000);
  }

  return (
    <>
    <NoteState>
    <Router>

    <Navbar/>
    <Alert alert={alert}/>
    <Routes>
          <Route path="/Home"element= {<Home showAlert={showAlert}/>}/>
          <Route  path="/about"element={<About/>}/>
          <Route path="/login"element= {<Login  showAlert={showAlert}/>}/>
          <Route  path="/signup"element={<Signup  showAlert={showAlert}/>}/>
        </Routes>
   
    
  


    </Router>
    </NoteState>
    </>
  );
}

export default App;
