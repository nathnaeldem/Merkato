import React, { useState } from "react";
import axios from "axios";
import "./OfferForm.css";

const OfferForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image1: null,
    image2: null,
    image3: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };

  const removeImage = (imageKey) => {
    setFormData({
      ...formData,
      [imageKey]: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);

    // Append each image if it exists
    if (formData.image1) data.append("image1", formData.image1);
    if (formData.image2) data.append("image2", formData.image2);
    if (formData.image3) data.append("image3", formData.image3);

    try {
      // Debugging: Log FormData before submission
      for (let [key, value] of data.entries()) {
        console.log(`${key}: ${value instanceof File ? value.name : value}`);
      }

      const response = await axios.post(
        "/bermenah/upoffer.php",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);

      // Clear form after successful submission
      setFormData({
        name: "",
        price: "",
        description: "",
        image1: null,
        image2: null,
        image3: null,
      });
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <form className="offer-form" onSubmit={handleSubmit}>
      <h2>Upload a New Offer</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>

      {/* Image Upload Slots */}
      <div className="image-upload-slots">
        {[1, 2, 3].map((i) => (
          <div key={i} className="image-slot">
            <label>
              Image {i}:
              <input
                type="file"
                name={`image${i}`}
                onChange={handleFileChange}
                accept="image/*"
                required={i === 1} // Make Image 1 required
              />
            </label>
            {formData[`image${i}`] && (
              <div className="selected-image">
                <span>{formData[`image${i}`].name}</span>
                <button
                  type="button"
                  onClick={() => removeImage(`image${i}`)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default OfferForm;
