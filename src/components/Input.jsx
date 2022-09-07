import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import Add from '../img/addimg.png'
import attach from '../img/attach.png'

const Input = () => {
    const [ text, setText ] = useState("");
    const [ img, setImg ] = useState(null);

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const handleSend = () => {

        if(img) {

        } else {

        }
    }

    return (
        <div className="input">
            <input type="text" placeholder="Type something..." onChange={ e => setText(e.target.value) } />
            <div className="send">
                <img src={attach} alt="" />
                <input type="file" style={{display: " none"}} id="file" onChange={ e => setImg(e.target.files[0]) } />
                <label htmlFor="file">
                    <img src={Add} alt="" />
                </label>
                <button onClick={ handleSend }>Send</button>
            </div>
        </div>
    );
}

export default Input;