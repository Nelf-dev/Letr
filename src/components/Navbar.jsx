import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';
import { Link } from 'react-router-dom'

const Navbar = () => {
    const {currentUser} = useContext(AuthContext)

    return (
        <div className="navbar">
            <span className="logo">Letr</span>
            <div className="user">
                <Link to="/edit"><img src={currentUser.photoURL} alt="displayicon" /></Link>
                <span><Link to="/edit">{currentUser.displayName}</Link></span>
                <button onClick={()=>signOut(auth)}>Log Out</button>
            </div>
        </div>
    );
}

export default Navbar;
