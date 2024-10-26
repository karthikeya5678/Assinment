// src/components/Users.js
import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../services/api';
import './Users.css';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedUserId, setExpandedUserId] = useState(null); // State for the user whose details are expanded

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await fetchUsers();
                console.log('Fetched Users:', response.data);
                setUsers(response.data);
            } catch (err) {
                setError('Failed to load users. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleUserClick = (userId) => {
        // Toggle the expanded user ID on click
        setExpandedUserId(prevId => (prevId === userId ? null : userId));
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="users">
            <h1>Users</h1>
            <ul className="user-list">
                {users.map(user => (
                    <li className="user-item" key={user.id} onClick={() => handleUserClick(user.id)}>
                        {user.name}
                        {/* Display user details if this user is expanded */}
                        {expandedUserId === user.id && (
                            <div className="user-details">
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phone}</p>
                                <p><strong>Website:</strong> {user.website}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
