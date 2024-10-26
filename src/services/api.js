// src/services/api.js
import axios from 'axios';

export const fetchUsers = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response; // This should return an object with a 'data' property
};
