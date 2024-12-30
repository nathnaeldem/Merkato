import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./FashionShowcase.css";

const FashionShowcase = () => {
  const [data, setData] = useState({ offers: [], products: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/bermenah/get_data.php");
        setData({
          offers: response.data.offers.slice(0, 3),
          products: response.data.products.slice(0, 3),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="fashion-showcase-container">
      <h1 className="showcase-title">Featured Products</h1>

      <section className="showcase-section">
        <div className="section-header">
          <h2>Offers</h2>
          <p>&nbsp;ልዩ ቅናሾች</p>
        </div>
        <div className="card-container">
          {data.offers.map((offer) => (
            <div key={offer.id} className="product-card fixed-card-size">
              <img
                src={`data:image/jpeg;base64,${offer.image}`}
                alt={offer.name}
                className="product-image"
              />
              <h3 className="product-name">{offer.name}</h3>
              <p className="product-description">{offer.description}</p>
              <p className="product-price">${offer.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="showcase-section">
        <div className="section-header">
          <h2>Products</h2>
          <p> &nbsp; አዳዲስ</p>
        </div>
        <div className="card-container">
          {data.products.map((product) => (
            <div key={product.id} className="product-card fixed-card-size">
              <img
                src={`data:image/jpeg;base64,${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-category">{product.category}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="view-all-container">
        <Link to="/products" className="view-all-button">
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default FashionShowcase;
