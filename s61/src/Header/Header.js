import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../Helpers/userManager';

function Header(props) {
    const navigate = useNavigate();

    const handleLogout = () => {
        props.setIsLoggedIn(false);
        logoutUser();
        navigate('/login');
    }

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/report">Report</Link></li>
                    <li><Link to="/summary">Summary</Link></li>
                </ul>
            </nav>
            {props.isLoggedIn ? 
                <button onClick={handleLogout}>Logout</button> : 
                null
            }
        </header>
    );
};

export default Header;