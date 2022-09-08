import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import React from 'react';

const Home = () => {
    return (
        <div className="home">
            <div className="container">
                <Sidebar />
                <Chat />
            </div>
            
        </div>
    );
}

export default Home;
