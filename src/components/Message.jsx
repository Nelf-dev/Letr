import React from 'react';

const Message = () => {
    return (
        <div className="message owner">
            <div className="messageInfo">
                <img src="https://images.unsplash.com/photo-1519076381129-b4234ae7e573?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=718&q=80" alt="" />
                <span>Just Now</span>
            </div>
            <div className="messageContent">
                <p>Hello</p>
                <img src="https://images.unsplash.com/photo-1519076381129-b4234ae7e573?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=718&q=80" alt="" />
            </div>
        </div>
    );
}

export default Message;
