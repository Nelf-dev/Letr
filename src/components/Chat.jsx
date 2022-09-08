import React, { useContext } from 'react';
import Messages from './Messages';
import Input from './Input';
// import more from '../img/more.png'
import { ChatContext } from '../context/ChatContext';
import { useState } from 'react';

const Chat = () => {

    const [hamburger, setHamburger] = useState(false)

    const handleToggle = () => {
        setHamburger(!hamburger)
    }

    const { data } = useContext(ChatContext);
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{ data.user?.displayName }</span>
                <div className={ hamburger ? "hamburger active" : "hamburger" } onClick={ handleToggle }>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    {/* <img src= { more } alt="chat icon" /> */}
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
}

export default Chat;
