import { Link } from 'react-router-dom';
import './App.css';

function Header() {
    return (
        <>
        <header className='header'>
            <div className='logo'>
                <Link to="/">🛒 ShoppyGlobe</Link>
            </div>
            <nav className='nav-links'>
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
            </nav>
        </header>
        </>
    )
}

export default Header;