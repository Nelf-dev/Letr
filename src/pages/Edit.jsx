import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAuth, updateProfile } from "firebase/auth";
import { db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Link } from 'react-router-dom';

const Edit = () => {
    const { currentUser } = useContext(AuthContext);
    const auth = getAuth()

    const handleSubmit = async(e) => {
        e.preventDefault();
        const image = e.target[0].files[0];
        console.log(image)
        const displayName = e.target[1].value;
        console.log(displayName);
        console.log(auth.currentUser.email);

        try {

            const storageRef = ref(storage,displayName);
            if(image){
                const uploadTask = uploadBytesResumable(storageRef,image);
                getDownloadURL(uploadTask.snapshot.ref).then( async(URL) => {
                    await updateProfile(auth.currentUser,{
                        displayName: displayName,
                        photoURL: URL,
                    }).then( async() => {
                            await setDoc(doc(db, "users", auth.currentUser.uid),{
                            displayName: displayName,
                            email: auth.currentUser.email,
                            photoURL: URL,
                        });
                        console.log("Profile Updated");
                        window.location.reload();
                    }).catch((error) => {
                        console.log(error);
                    })
                })
            } else {
                await updateProfile(auth.currentUser,{
                    displayName: displayName,
                    photoURL: "https://firebasestorage.googleapis.com/v0/b/letr-c11e5.appspot.com/o/default-avatar.jpg?alt=media&token=19e3a9b0-49c6-4c25-88bb-56e7f50bbc36",
                }).then( async() => {
                        await setDoc(doc(db, "users", auth.currentUser.uid),{
                        displayName: displayName,
                        email: auth.currentUser.email,
                        photoURL: "https://firebasestorage.googleapis.com/v0/b/letr-c11e5.appspot.com/o/default-avatar.jpg?alt=media&token=19e3a9b0-49c6-4c25-88bb-56e7f50bbc36",
                    });
                    console.log("Profile Updated");
                    window.location.reload();
                }).catch((error) => {
                    console.log(error);
                })
            }
        }catch(err){
            console.log(err);
        }
    };

        console.log(currentUser.photoURL)
    return (
        <div className="edit">
            <div className="card">
                <div>
                    <h2>Edit Profile</h2>
                </div>
                <div>
                    <img className="editpfp" src={currentUser.photoURL} alt="displayicon"/>
                </div>
                <div>
                    <p>Change your profile picture</p>
                </div>
                <div className="forms">
                    <form onSubmit={handleSubmit}>
                    <div>
                        <input type="file" id="file"/>
                    </div>
                    <div>
                        <p>Display name</p>
                    </div>
                    <div>
                        <input className="dname" type="text" placeholder="Display name" defaultValue={currentUser.displayName} />
                    </div>
                        <button className="dbutton">Update Profile</button>
                    </form>
                </div>
                <Link to="/"><button className="homebutton">Home</button></Link>
            </div>
        </div>
    );
}

export default Edit;
