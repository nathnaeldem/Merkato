import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DisplayDevices.css"; // Assume this CSS file contains styling

const DisplayDevices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("/bermenah/get_devices.php");
        setDevices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching devices:", error);
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  if (loading) {
    return <div className="loading">Loading devices...</div>;
  }

  if (devices.length === 0) {
    return <div className="no-devices">No devices listed yet!</div>;
  }

  return (
    <div className="device-list">
      <h1>Available Devices</h1>
      <div className="device-grid">
        {devices.map((device, index) => (
          <div key={index} className="device-card">
            <div className="device-images">
              {device.images && device.images.length > 0 ? (
                device.images.map((src, imgIndex) => (
                  <img key={imgIndex} src={src} alt={`Device ${index} Image ${imgIndex + 1}`} />
                ))
              ) : (
                <p>No Images</p>
              )}
            </div>
            <h2>{device.deviceType}</h2>
            <p><strong>Price:</strong> ${device.offerPrice}</p>
            <p><strong>Description:</strong> {device.description}</p>
            <p><strong>Contact:</strong> {device.phoneNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayDevices;

// PHP Script to Fetch Data
/**
 * get_devices.php
 *
 * 
 */
