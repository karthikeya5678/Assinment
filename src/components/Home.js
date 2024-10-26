// src/components/Home.js
import React from 'react';
import './Home.css'; // Import your CSS for styling

function Home() {
    return (
        <div className="home">
            <div className="image-container">
                // <img src={`${process.env.PUBLIC_URL}/wall2.jpg`} alt="Welcome" className="welcome-image" />
                <div className="overlay-text">Welcome</div>
            </div>
        </div>
    );
}

export default Home;
