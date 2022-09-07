import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAuth, updateProfile } from "firebase/auth";

const Edit = () => {
    const { currentUser } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [url, setURL] = useState('');
    

    const handleSubmit = (e) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
    displayName: name, 
    photoURL: url
    }).then(() => {
        console.log("Profile Updated!")
    }).catch((error) => {
        console.log("Error Occurred!", error)
    });
        e.preventDefault();
        console.log(name);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <img className="editpfp" src={currentUser.photoURL} alt="displayicon" />
            <label htmlFor="file">Change your profile picture</label>
            <input type="text" id="file" onChange={(e) => {setURL(e.target.value)}}/>
            <input type="text" placeholder="Display name" defaultValue={currentUser.displayName} onChange={(e) => {setName(e.target.value)}} />
            <button>Update Profile</button>
            </form>
        </div>
    );
}

export default Edit;
