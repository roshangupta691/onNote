import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NotesState";
import Alert from './components/Alert'
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Onloadpage from "./components/Onloadpage";
function App() {
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar />
          {/* <Alert message="This is Amazing iNoteBook APP"/> */}
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Onloadpage />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
          <Footer/>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
