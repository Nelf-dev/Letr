import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'
import React, {useState} from 'react';


const Sidebar = () => {

    const [active, setActive] = useState("sidebar")
    const [hamburger, setHamburger] = useState(false)

    const handleToggle = (e) => {
        e.preventDefault();
        setHamburger(!hamburger);
        setActive( active === "sidebar" ? "sidebar active" : "sidebar")
    }

    return (
        <div className={active}>
            <Navbar />
            <Search />
            <Chats />
            <div className={ hamburger ? "hamburger active" : "hamburger" } onClick={ handleToggle }>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </div>
        </div>
    );
}

export default Sidebar;
