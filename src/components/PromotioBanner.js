// PromotionBanner.js
import React, { useState, useEffect } from "react";
import "./PromotionBanner.css";
import { Link } from "react-router-dom";
const promotionData = [
  {
    title: "Mega Smartphone Sale!",
    description: "Upgrade to the latest smartphones with up to 50% OFF.",
    buttonText: "Shop Now",
  },
  {
    title: "Buy One, Get One Free!",
    description: "Exclusive offer on select smartphone models.",
    buttonText: "Grab the Deal",
  },
  {
    title: "Limited Time Offer!",
    description: "Get an additional 20% off on your first purchase.",
    buttonText: "Save Now",
  },
];

const PromotionBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promotionData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentPromotion = promotionData[currentIndex];

  return (
    <div >
      <div className="promotion-banner">
      <div className="promotion-content">
        <h1 className="promotion-title">{currentPromotion.title}</h1>
        <p className="promotion-description">{currentPromotion.description}</p>
        <Link to='/products'>  <button className="shop-now-button">{currentPromotion.buttonText}</button> </Link>
      </div>
    </div>
  </div>
     );
};

export default PromotionBanner;
