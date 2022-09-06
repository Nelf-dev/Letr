import React from 'react';
import Messages from './Messages';
import Input from './Input';
import request from '../img/request.png'
import more from '../img/more.png'

const Chat = () => {
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>Jane</span>
                <div className="chatIcons">
                    <img src={request} alt="" />
                    <img src={more} alt="" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
}

export default Chat;
