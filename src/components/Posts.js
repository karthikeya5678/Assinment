// src/components/Posts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Posts.css";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState({});

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://picsum.photos/v2/list?limit=50');
                
                const enhancedPosts = response.data.map((photo, index) => ({
                    id: photo.id,
                    title: `Image by ${photo.author || 'Lorem Picsum'} - #${index + 1}`,
                    images: [
                        `https://picsum.photos/id/${photo.id}/300/200`, 
                        `https://picsum.photos/id/${photo.id}/400/300`, 
                        `https://picsum.photos/id/${photo.id}/500/400`
                    ]
                }));

                setPosts(enhancedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndices =>
                posts.reduce((acc, post) => {
                    const nextIndex = (prevIndices[post.id] || 0) + 1;
                    acc[post.id] = nextIndex % post.images.length;
                    return acc;
                }, {})
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [posts]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="posts">
            <h1>Posts</h1>
            <div className="post-gallery">
                {posts.map(post => (
                    <div className="post-card" key={post.id}>
                        <img
                            className="post-image"
                            src={post.images[currentImageIndex[post.id] || 0]}
                            alt={post.title}
                        />
                        <div className="post-title">{post.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;
