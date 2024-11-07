import {
    Link
} from 'react-router-dom';

function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/report">Report</Link></li>
                    <li><Link to="/summary">Summary</Link></li>
                </ul>
            </nav>
            <button>
                Login/Logout Temp
            </button>
        </header>
    );
};

export default Header;