import React, { useState } from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { MdWifiCalling3 } from "react-icons/md";
import { FaTelegram } from "react-icons/fa6";
import { MdAccountCircle, MdShoppingCart } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import logo from './p.png'

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMobileMenu = () => {
        const newMenuState = !isMobileMenuOpen;
        setIsMobileMenuOpen(newMenuState);
        document.body.style.overflow = newMenuState ? 'hidden' : 'auto';
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = 'auto';
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active-link' : '';
    };

    return (
        <nav className="navbar">
            <Link to='/' onClick={closeMobileMenu}>
                <div className='logo'>
                   <img src={logo} />
                </div>
            </Link>

            <div className='Nlinks'>
                <Link to="/contact" style={{ color: '#27A7E7' }}><FaTelegram /></Link>

                <Link
                    to="/products"
                    className={isActive('/products')}
                    onClick={closeMobileMenu}
                    style={{ color: '#00ff41' }}
                >
                    Buy
                </Link>

                <Link style={{ color: 'aliceblue' }}>|</Link>

                <Link
                    to="/sell"
                    className={isActive('/sell')}
                    onClick={closeMobileMenu}
                    style={{ color: '#fa0522' }}
                >
                    Sell
                </Link>

                <Link to="/contact" style={{ color: '#4B96B4' }}><MdWifiCalling3 /></Link>
            </div>

            <button className="hamburger" onClick={toggleMobileMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <div className='cart'>
                    <Link to='/blog' onClick={closeMobileMenu}>Blog</Link>
                    <Link to="/products" onClick={closeMobileMenu}>Products (አዳዲስ)</Link>
                    
                    <Link to="/products" onClick={closeMobileMenu}>
                        <MdShoppingCart color='#093541' style={{ fontSize: '25px' }} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
