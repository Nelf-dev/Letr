import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

import { AuthContext } from "../context/AuthContext";


const Login = () => {

    const [err,setErr] = useState(false)
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)

    useEffect(() => { //does not allow login again if not logged out
        if (currentUser) {
            navigate("/");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

    try{
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/")
    }catch(err){
        setErr(true);
    }
    
    };

    return (
        <div className='formContainer'>
            <div className="formWrapper">
            <div class="wave logo">
                <span style={{"--i":1}}>L</span>
                <span style={{"--i":2}}>E</span>
                <span style={{"--i":3}}>T</span>
                <span style={{"--i":4}}>R</span>
            </div>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button>Sign In</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
}

export default Login;
