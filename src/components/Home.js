import React from 'react'
import noteImg from '../images/notes.jpg';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import "../Styles/home.css"
import Alert from "./Alert";

function Home() {
    const backgroundStyle = {
        backgroundImage: `url(${noteImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height:'650px',
        marginTop: '-75px'
        // Add any additional styles you need
    };
    return (
        <>
            <Alert />
            <div className="container home-container" style={backgroundStyle}>     
                <div className="row">
                    <div className="col-md-5">
                        <h1 className="display-4 ps-9 respo" style={{ fontWeight: "bold",textShadow: "2px 2px 4px red" }}><span style={{ color: "#9C27B0", fontWeight: "bold" }}>i</span >Notebook</h1>
                        <p className="ps-5 respo" style={{ fontSize: "1.7rem", fontWeight: "bold" }}>Your notebook on cloud - safe and secure</p>
                        <p className="ps-5 mt-3 respo" style={{ fontWeight: "bold",fontSize: "1rem" }}>An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbancee. For more info you can checkout our <Link to="/about">About Page</Link>  </p>
                        <div className="d-flex justify-content-center">
                            <Button component={Link} to="/pagenotfound" variant="contained" color="secondary" style={{ color: "White", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem" }}>Create New Note</Button>
                        </div>
                    </div>
    </div>
    </div> 
               
        </>
    )
}

export default Home
