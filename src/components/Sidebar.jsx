import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import React, { useState } from 'react';


const Sidebar = () => {

    const [mobile, setMobile] = useState(false)

    const handleToggle = () => {
        setMobile(!mobile)
    }
//{ mobile ? "sidebar active" : "sidebar" } onChange={ handleToggle }

    return (
        <div className="sidebar">
            <Navbar />
            <Search />
            <Chats />
        </div>
    );
}

export default Sidebar;
