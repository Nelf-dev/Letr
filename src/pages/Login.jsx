import React from 'react';

const Login = () => {
    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className="logo">Letr</span>
                <span className="title">Login</span>
                <form>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button>Sign In</button>
                </form>
                <p>Don't have an account? Register</p>
            </div>
        </div>
    );
}

export default Login;
