import React from 'react';
import './HeroSection.css';
import { FaSearch } from "react-icons/fa";
import {Link} from 'react-router-dom';


const HeroSection = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Unleash Your Shopping Dreams</h1>
                <p className="hero-subtitle">Where supply meets demand. Dive into the extraordinary and redefine the way you shop.</p>
                <div className="cta-buttons">
                   <Link to='/products'> <button className="cta-primary">Shop Now</button></Link>
                 <Link to="search" >  <button className="cta-secondary"><FaSearch /> Search Now</button></Link> 
                </div>
            </div>
        </div>
    );
};
export default HeroSection;