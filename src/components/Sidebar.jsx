import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import React, { useState } from 'react';


const Sidebar = () => {

    const [mobile, setMobile] = useState(false)

    const handleToggle = () => {
        setMobile(!mobile)
    }
//

    return (
        <div className={ mobile ? "sidebar active" : "sidebar" } onChange={ handleToggle }>
            <Navbar />
            <Search />
            <Chats />
        </div>
    );
}

export default Sidebar;
