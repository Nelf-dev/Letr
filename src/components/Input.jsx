import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import Add from '../img/addimg.png';
import attach from '../img/attach.png';
import { db, storage } from '../firebase';
import { arrayUnion, doc, updateDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
    const [ text, setText ] = useState("");
    const [ img, setImg ] = useState(null);

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const handleSend = async (e) => {

        e.preventDefault()

        if(img) {

            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
        
                (error) => {
                    // setErr(true);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL
                            }),
                        });
                    });
                }
            );

        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);
    };

    return (
        <form onSubmit={ handleSend } className="input">
            <input type="text" 
            placeholder="Type something..." 
            onChange={ e => setText(e.target.value) } 
            value={ text }
            />
            <div className="send">
                <img src={attach} alt="attachFile" />
                <input type="file" style={{display: " none"}} id="file" onChange={ e => setImg(e.target.files[0]) } />
                <label htmlFor="file">
                    <img src={Add} alt="sendFile" />
                </label>
                <button onClick={ handleSend }>Send</button>
            </div>
        </form>
    );
}

export default Input;