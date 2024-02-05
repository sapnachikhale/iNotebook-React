import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Inotebook from './components/Inotebook';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import {useState} from 'react';
import PageNotFound from './components/Pagenotfound';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
    <NoteState>
    <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
      <Routes>
      <Route exact path="/" element={<Home />} />
        <Route exact path="/inotebook" element={<Inotebook showAlert={showAlert}/>} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
