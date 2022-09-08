import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase';

const Navbar = () => {
    const {currentUser} = useContext(AuthContext)

    return (
        <div className="navbar">
            <span className="logo">Letr</span>
            <div className="user">
                <img src={currentUser.photoURL ? currentUser.photoURL : 'https://firebasestorage.googleapis.com/v0/b/letr-c11e5.appspot.com/o/default-avatar.jpg?alt=media&token=19e3a9b0-49c6-4c25-88bb-56e7f50bbc36'} alt="displayicon" />
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>Log Out</button>
            </div>
        </div>
    );
}

export default Navbar;
