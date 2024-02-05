import React, {useState} from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        
        if (json.success) {
            // Save the auth token and redirect only if login is successful
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Login successfully", "success");
            navigate('/inotebook');
        } else {
            // Show an alert for unsuccessful login
            props.showAlert("Invalid credentials", "danger");
        }
    };
    

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <center><table style={{width:"700px"}}>
            <tbody>
                    <tr>
                        <td>
             <Button className="mb-4 mx-1" variant="text" color="secondary" startIcon={<ArrowBackIcon />} component={Link} to="/" style={{ textTransform: "none", fontFamily: "'Poppins', sans-serif" }}>Home</Button>
             <h2 style={{ fontWeight: "Bold" }}>Login</h2>
                <p className="mb-4 mx-1">Sign in on the internal platform</p>
                <div className="d-flex">
                    <Button size="large" fullWidth className="mb-4 me-4" variant="contained" color="primary" startIcon={<FacebookIcon />} component={Link} style={{ textTransform: "none", fontSize: "1rem", color: "White", fontFamily: "'Poppins', sans-serif" }}>Login with Facebook</Button>
                    <Button size="large" fullWidth className="mb-4" variant="contained" color="error" startIcon={<GoogleIcon />} component={Link}  style={{ textTransform: "none", fontSize: "1.1rem", color: "White", fontFamily: "'Poppins', sans-serif" }}>Login with Google</Button>
                </div>
                <p className="mb-4 d-flex justify-content-center">or login with email and password</p>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" placeholder="email*" autoComplete="current-password" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" >Password</label>
                    <input type="password" className="form-control" placeholder="password*" autoComplete="current-password" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <button  type="submit" className="btn btn-primary"  >Login</button>
                </form>
                <p >Don't have an account? <Link to="/signup" >register</Link> </p>
            </td>
                    </tr>
                    </tbody>
                </table></center>
        </div>
    )
}

export default Login