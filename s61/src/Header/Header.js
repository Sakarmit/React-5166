import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../Helpers/userManager';

function Header({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        setIsLoggedIn(false);
        logoutUser();
        navigate('/login');
    }

    return (
        <header role="banner">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/report">Report</Link></li>
                    <li><Link to="/summary">Summary</Link></li>
                </ul>
            </nav>
            {isLoggedIn ? 
                <button onClick={handleLogout}>Logout</button> : 
                null
            }
        </header>
    );
};

export default Header;