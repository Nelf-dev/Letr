import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar">
            <span className="logo">Letr</span>
            <div className="user">
                <img src="https://images.unsplash.com/photo-1611403119860-57c4937ef987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXNpYW4lMjBtYWxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60" alt="" />
                <span>John</span>
                <button>Log Out</button>
            </div>
        </div>
    );
}

export default Navbar;
