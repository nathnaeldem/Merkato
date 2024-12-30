import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SpecialOffers.css";

const SpecialOffers = () => {
  const [offersData, setOffersData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedImage, setExpandedImage] = useState(null);

  const fetchOffers = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/bermenah/getoffuria.php?page=${page}`
      );
      setOffersData(response.data.offers);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching offers:", err);
      setError("Failed to load offers. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleImageExpand = (image) => {
    setExpandedImage(image);
  };

  const handleCloseImage = () => {
    setExpandedImage(null);
  };

  if (loading) return <p>Loading offers...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="special-offers">
      <div className="special-offers-title">
        <h1>Special Offers</h1>
        <p>ቅናሽ እቃዎች</p>
      </div>
      <div className="offers-grid">
        {offersData.map((offer) => (
          <div key={offer.id} className="offer-card">
            <div className="offer-images">
              {/* Display images with different sizes */}
              {[offer.image, offer.image2, offer.image3].map(
                (img, index) => img && (
                  <img
                    key={index}
                    src={`data:image/jpeg;base64,${img}`}
                    alt={`${offer.name} image ${index + 1}`}
                    className={`offer-image ${index === 0 ? 'main-image' : 'secondary-image'}`}
                    style={{ borderRadius: '15px' }}
                    onClick={() => handleImageExpand(`data:image/jpeg;base64,${img}`)}
                  />
                )
              )}
            </div>
            <h2 className="offer-name">{offer.name}</h2>
            <p className="offer-description">{offer.description}</p>
            <p className="offer-price">{offer.price}</p>
            <button className="buy-now-button">Buy Now</button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="page-indicator">
          Page {currentPage} of {totalPages}
        </span>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>

      {/* Image Expand Dialog */}
      {expandedImage && (
        <div className="image-expand-dialog" onClick={handleCloseImage}>
          <div className="expanded-image-content">
            <img 
              src={expandedImage} 
              alt="Expanded View" 
              className="expanded-image" 
            />
            <button onClick={handleCloseImage} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialOffers;
