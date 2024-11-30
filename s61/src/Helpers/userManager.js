import axios from 'axios';

async function loginUser(username, password) {
    try {
        const response = await axios.post('http://localhost:3000/api/login', {
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
        await axios.get('http://localhost:3000/api/validate', {
            headers: { 'Authorization': `Bearer ${token}`}
        });
        return true;
    } catch (error) {
        return false;
    }
    
}

function logoutUser() {
    localStorage.removeItem('token');
}

export { loginUser, logoutUser , validateActiveToken};