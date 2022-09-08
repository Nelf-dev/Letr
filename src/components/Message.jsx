import React, { useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)


    const ref = useRef();

    const toDateTime = (secs) => {
        const t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(secs);
        let output = t.toDateString();

        return output
    }

    const toTime = (secs) => {
        const t = new Date(1970, 0, 1);
        t.setSeconds(secs - 50400)
        let output = t.toLocaleTimeString();

        return output
    }

    useEffect( () => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [ message ]);

    console.log(message)

    return (
        <div ref={ ref } className={ `message ${ message.senderId === currentUser.uid && "owner" }` }>
            <div className="messageInfo">
                <img src= { message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL }
                alt="messageInfo" 
                />
                <span> { toDateTime(message.date.seconds) }  </span> 
                <br />
                <span> { toTime(message.date.seconds )} </span>
            </div>
            <div className="messageContent">
                <p>{ message.text }</p>
                { message.img && <img src= { message.img } alt="messageContent" />}
            </div>
        </div>
    );
}

export default Message;
