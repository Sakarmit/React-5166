import axios from 'axios';

const API_URL = process.env.REACT_APP_API_LOCATION;

async function loginUser(username, password) {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username: username,
            password: password
        });
        const token = response.data.token;
        localStorage.setItem('token', token);
    } catch (error) {
        if (error.response && error.response.data.err) {
            return error.response.data.err;
        } else {
            return error.message;
        }
    }
}

async function validateActiveToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    try {
        await axios.get(`${API_URL}/validate`, {
            headers: { 'Authorization': `Bearer ${token}`}
        });
        return true;
    } catch (error) {
        localStorage.removeItem('token');
        return false;
    }
    
}

function logoutUser() {
    localStorage.removeItem('token');
}

export { loginUser, logoutUser , validateActiveToken};