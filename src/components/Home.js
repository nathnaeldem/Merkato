import React from 'react';
import { ReactTyped } from 'react-typed';
import './home.css';
import buy from './sell.png';

import PromotionBanner from './PromotioBanner.js';
import FashionShowcase from './FashionShowcase.js';
import map from './map.png'
import {Link} from 'react-router-dom';
import HeroSection from './HeroSection.js';


function Home() {
  return (
    <div className="home-container">
      <HeroSection />

      <FashionShowcase />
        
        
     

      <div className="Best">
        <h2 className="best-title">Best Online Market in Ethiopia</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <h3>Authentic Products</h3>
            <p>100% genuine products with warranty </p>
          </div>

          <div className="feature-card">
            <h3>Expert Support</h3>
            <p>Dedicated team of experts at your service</p>
          </div>

          <div className="feature-card">
            <h3>Best Prices</h3>
            <p>Competitive prices with flexible payment options</p>
          </div>
        </div>
        <PromotionBanner />
        <div className="location-card">
          <h3>Find Us</h3>
          <a               href="https://www.google.com/maps/dir/Bole,+Addis+Ababa/8.992831,38.791041/@8.9929713,38.7890579,17.05z/data=!4m9!4m8!1m5!1m1!1s0x164b9b33a3569139:0xb505349b8c87fdd2!2m2!1d38.8100855!2d8.9831138!1m0!3e0?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
>
          <div className="map-container">
            <img
              src={map}
              
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></img>
          </div>
          </a>
        </div>
        
      </div>
      
    </div>
  );
}

export default Home;
