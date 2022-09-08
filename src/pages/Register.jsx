import React, { useState } from 'react';
import Add from "../img/addimg.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [err,setErr] = useState(null)
    const navigate = useNavigate()
    // const { currentUser } = useContext(AuthContext) 

    // useEffect(() => { //does not allow register again if not logged out
    //     if (currentUser) {
    //         navigate("/");
    //     }
    // }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

    try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const storageRef = ref(storage, displayName);
        if (file) {
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
        (error) => { setErr(true) }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                await updateProfile(res.user,{
                    displayName,
                    photoURL: downloadURL,
                });
                await setDoc(doc(db, "users", res.user.uid),{
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                });
            

                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/");
                setTimeout(window.location.reload(), 1000);

            });
        }
        );
        } else {
            await updateProfile(res.user,{
                displayName,
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/letr-c11e5.appspot.com/o/default-avatar.jpg?alt=media&token=19e3a9b0-49c6-4c25-88bb-56e7f50bbc36'
            });
            await setDoc(doc(db, "users", res.user.uid),{
                uid: res.user.uid,
                displayName,
                email,
                photoURL: 'https://firebasestorage.googleapis.com/v0/b/letr-c11e5.appspot.com/o/default-avatar.jpg?alt=media&token=19e3a9b0-49c6-4c25-88bb-56e7f50bbc36'
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
        }
    }catch(err){
        setErr(err);
    }
    
    };

    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <div className="wave logo">
                    <span style={{"--i":1}}>L</span>
                    <span style={{"--i":2}}>E</span>
                    <span style={{"--i":3}}>T</span>
                    <span style={{"--i":4}}>R</span>
                </div>
                <span className="title">Register</span>
                <form onSubmit={ handleSubmit }>
                    <input type="text" placeholder="Display name"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <input style={ {display:"none"} } type="file" id="file"/>
                    <label htmlFor="file">
                        <img src={Add} alt="displayFile"/>
                        <span>Add an Avatar</span>
                    </label>
                    <button>Sign Up</button>
                    {err && <span>{ err.message }</span>}
                </form>
                <p>Have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Register;
