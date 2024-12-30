import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

function ProductUploadForm() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: null,
    category: '',
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch categories from the backend
    axios.get('/bermenah/get-categories.php')
      .then((response) => setCategories(response.data.categories))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('category', product.category);
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
      const response = await axios.post('/bermenah/upload-product.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message || 'Product uploaded successfully!');
    } catch (error) {
      setMessage('Failed to upload product. Please try again.');
      console.error(error);
    }
  };

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Upload Product
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <TextField
          fullWidth
          required
          margin="normal"
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          required
          margin="normal"
          label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
        <FormControl fullWidth required margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 2 }}
        >
          Upload Image
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 4 }}
          fullWidth
        >
          Submit
        </Button>
      </Box>
      {message && (
        <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Container>
  );
}

export default ProductUploadForm;
