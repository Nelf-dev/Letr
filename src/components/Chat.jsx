import React, { useContext } from 'react';
import Messages from './Messages';
import Input from './Input';
import more from '../img/more.png'
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
    const { data } = useContext(ChatContext);
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{ data.user?.displayName }</span>
                <div className="chatIcons">
                    <img src= { more } alt="profile picture" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
}

export default Chat;
