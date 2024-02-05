import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import signup from "../images/sign-up.webp";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success){
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken); 
      navigate("/login");
      props.showAlert("Account created successfully","suceess");
  }
    else{
      props.showAlert("Invalid details","danger");
  }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='container'>
      <div className="row">
                <div className="col-md-5 d-flex flex-column align-items-left">
                    <img className="img-fluid" src={signup} alt="register" style={{ width: "600px", height: "550px", objectFit: "cover" }} />
                </div>
    <table style={{width:"650px",marginLeft:"50px"}}>
    <tbody>
      <tr>
        <td>
    <div className='container'>
    <Button className="mb-4" variant="text" color="secondary" startIcon={<ArrowBackIcon />} component={Link} to="/" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Home</Button>
      <h2>Create a new account to use iNotebook</h2>
      <p className="mb-4">Use your email to create a new account</p>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" placeholder="Name*" id="name" name="name" autoComplete="current-password" onChange={onChange} />
        </div>
        <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" placeholder="email*" id="email" name="email" autoComplete="current-password" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="password*" id="password" name="password" autoComplete="current-password" minLength={5} required onChange={onChange}/>
        </div>
        <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">I have read terms and conditions</label>
  </div>
        <button  className="mb-4" color="secondary" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif",fontSize: "1.1rem" ,width :"100px"}} type="submit">Register</button>
      </form>
      <p>Have an account? <Link to="/login" >login</Link> </p>
    </div>
   
    </td>
      </tr></tbody>
    </table>
    </div>
    </div>
  );
};

export default Signup;
