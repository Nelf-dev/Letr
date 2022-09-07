import React, { useState, useContext, useEffect } from 'react';
import Add from "../img/addimg.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext"

const Register = () => {
    const [err,setErr] = useState(false)
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext) 

    useEffect(() => { //does not allow register again if not logged out
        if (currentUser) {
            navigate("/");
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

    try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
        
        (error) => {
            setErr(true)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                await updateProfile(res.user,{
                    displayName,
                    photoURL: downloadURL
                });
                await setDoc(doc(db, "users", res.user.uid),{
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL
                });

                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/");

            });
        }
        );
    }catch(err){
        setErr(true);
    }
    
    };

    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <div class="wave logo">
                    <span style={{"--i":1}}>L</span>
                    <span style={{"--i":2}}>E</span>
                    <span style={{"--i":3}}>T</span>
                    <span style={{"--i":4}}>R</span>
                </div>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Display name"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <input style={{display:"none"}} type="file" id="file"/>
                    <label htmlFor="file">
                        <img src={Add} />
                        <span>Add an Avatar</span>
                    </label>
                    <button>Sign Up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>Have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Register;
