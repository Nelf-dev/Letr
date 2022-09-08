import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAuth, updateProfile } from "firebase/auth";
import { db, storage } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

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
        <div>
            <form onSubmit={handleSubmit}>
            <img className="editpfp" src={currentUser.photoURL} alt="displayicon" />
            <label htmlFor="file">Change your profile picture</label>
            <input type="file" id="file"/>
            <input type="text" placeholder="Display name" defaultValue={currentUser.displayName} />
            <button>Update Profile</button>
            </form>
        </div>
    );
}

export default Edit;
