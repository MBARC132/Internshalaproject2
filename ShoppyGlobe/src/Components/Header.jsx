import { Link } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function Header() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">🛒 ShoppyGlobe</Link>
            </div>

            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>

            <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/LoginForm" onClick={() => setMenuOpen(false)}>
                    Cart
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
                <Link to="/RegisterForm" onClick={() => setMenuOpen(false)}>User Register/Login</Link>
            </nav>
        </header>
    );
}

export default Header;
