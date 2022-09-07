import React,{ useContext } from 'react';
import Messages from './Messages';
import Input from './Input';
import request from '../img/request.png'
import more from '../img/more.png'
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
    const { data } = useContext(ChatContext)
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{ data.user.displayName }</span>
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
