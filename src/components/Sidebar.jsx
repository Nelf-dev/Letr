import Navbar from './Navbar'
import Search from './Search'
import React from 'react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Navbar />
            <Search />
        </div>
    );
}

export default Sidebar;
