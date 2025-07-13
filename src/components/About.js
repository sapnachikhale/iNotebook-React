import React from 'react';
import '../Styles/About.css';
import awesome from '../images/great.jpg';
import login from '../images/awesome.jpg';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import Alert from "./Alert";

function About() {
  return (
    <>
      <Alert />
      <div className="aboutImg text-center"></div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center text-center text-md-left">
            <h2 className="mb-3" style={{ fontWeight: "bold" }}>Make something <span style={{ color: "#9C27B0" }}>Awesome</span></h2>
            <p>
              iNotebook is made from the pain of writing all the things in a notebook which is very hectic. So we made an online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbance. You can also access your notes anywhere in the world, at any time. So don't forget to create notes because creating anything is always important.
            </p>
            <div className="d-flex justify-content-center mt-3">
              <Button component={Link} to="/login" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.25rem" }}>Get Started</Button>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <img src={awesome} alt="awesome" className="img-fluid note-img" />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 d-flex justify-content-center">
            <img src={login} alt="login" className="img-fluid note-img" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center text-center text-md-left">
            <h2 className="mb-3" style={{ fontWeight: "bold" }}>Sign in and Enjoy</h2>
            <p>
              Create your account and start experiencing our note-taking app. It is fast, secure, and easy to use. Just a few steps and you are ready to go.
            </p>
            <div className="d-flex justify-content-center mt-3">
              <Button component={Link} to="/login" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.25rem" }}>Sign In</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
