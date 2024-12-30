import React, { useState } from "react";
import axios from "axios";
import "./SellDeviceForm.css"; // Assume there’s a CSS file for styles

const SellDeviceForm = () => {
  const [formData, setFormData] = useState({
    deviceType: "",
    offerPrice: "",
    description: "",
    images: [],
    phoneNumber: "",
  });
  const [previewImages, setPreviewImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("deviceType", formData.deviceType);
    formDataToSend.append("offerPrice", formData.offerPrice);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formData.images.forEach((image, index) => {
      formDataToSend.append(`image${index}`, image);
    });

    try {
      const response = await axios.post("/bermenah/sell_device.php", formDataToSend);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="sell-device-container">
      <div className="sell-device-form">
        <h1>Sell Your Device</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="deviceType">Device Type</label>
            <select
              id="deviceType"
              name="deviceType"
              value={formData.deviceType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a device</option>
              <option value="phone">Phone</option>
              <option value="gaming-laptop">Gaming Laptop</option>
              <option value="tablet">Tablet</option>
              <option value="laptop">Laptop</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="offerPrice">Offer Price ($)</label>
            <input
              type="number"
              id="offerPrice"
              name="offerPrice"
              value={formData.offerPrice}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="images">Upload Images</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
            />
          </div>

          <div className="image-preview">
            {previewImages.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index + 1}`} />
            ))}
          </div>

          <button className="buttonsell" type="submit">Submit</button>
        </form>
      </div>
      
      <div className="sell-device-banner">
        <h2>Turn Your Tech into Cash!</h2>
        <div className="banner-content">
          <div className="banner-feature">
            <i className="fas fa-money-bill-wave"></i>
            <p>Get the Best Value</p>
          </div>
          <div className="banner-feature">
            <i className="fas fa-shipping-fast"></i>
            <p>Quick & Easy Process</p>
          </div>
          <div className="banner-feature">
            <i className="fas fa-shield-alt"></i>
            <p>Secure Transaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellDeviceForm;

// Create a PHP script to handle the form data and create the table.
/**
 * sell_device.php
 *
 * 
 */
