import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Helpers/userManager';

function LoginPage(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const error = await loginUser(username, password);
        if (error) {
            setError(error);
        } else {
            props.setIsLoggedIn(true);
        }
    };

    if (props.isLoggedIn) {
        navigate('/');
    }

    return (
        <main>
            <h2>
                Login to access site
            </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </main>
    );
}

export default LoginPage;