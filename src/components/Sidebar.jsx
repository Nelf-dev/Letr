import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import React from 'react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Navbar />
            <Search />
            <Chats />
        </div>
    );
}

export default Sidebar;
