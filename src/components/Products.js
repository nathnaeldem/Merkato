import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  Pagination,
  Dialog,
  DialogContent,
  IconButton
} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';
import SpecialOffers from './SpecialOffers';
import Loader from './loader';

function Products() {
  const [category, setCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsResponse = await fetch(`/bermenah/get-products.php?page=${page}`);
        if (!productsResponse.ok) throw new Error('Failed to fetch products');
        const productsData = await productsResponse.json();

        const categoriesResponse = await fetch('/bermenah/get-categories.php');
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesResponse.json();

        setProducts(productsData.products);
        setTotalPages(productsData.totalPages);
        setCategories(categoriesData.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, [page]);

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageExpand = (image) => {
    setExpandedImage(image);
  };

  const handleCloseImage = () => {
    setExpandedImage(null);
  };

  const filteredProducts = category === 'all'
    ? products
    : products.filter(product => product.category.toLowerCase() === category.toLowerCase());

  if (loading) {
    return (
      <Container sx={{ py: 8 }}>
        <Loader />
      </Container>
    );
  }

  return (
    <div>
      <Container sx={{ py: 8 }}>
        <Typography style={{ fontWeight: 'bold' }} variant="h4" component="h1" gutterBottom textAlign="center">
          Our Products
        </Typography>
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>አዳዲስ እቃዎች</p>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={category}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab 
              label="All Products" 
              value="all"
              sx={{ fontSize: '1.1rem', fontWeight: 'bold', '&.Mui-selected': { color: '#1976d2' }}}
            />
            {categories.map((cat) => (
              <Tab
                key={cat.id}
                label={cat.name}
                value={cat.name.toLowerCase()}
                sx={{ fontSize: '1.1rem', fontWeight: 'bold', '&.Mui-selected': { color: '#1976d2' }}}
              />
            ))}
          </Tabs>
        </Box>

        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 260, objectFit: 'contain' }}
                    image={`data:image/jpeg;base64,${product.image}`}
                    alt={product.name}
                  />
                  <IconButton
                    onClick={() => handleImageExpand(`data:image/jpeg;base64,${product.image}`)}
                    sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8, 
                      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                      color: '#fff',
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
                    }}
                  >
                    <ZoomInIcon />
                  </IconButton>
                </Box>
                {product.image2 && (
                  <CardMedia
                    component="img"
                    sx={{ height: 260, objectFit: 'contain' }}
                    image={`data:image/jpeg;base64,${product.image2}`}
                    alt={`${product.name} Image 2`}
                  />
                )}
                {product.image3 && (
                  <CardMedia
                    component="img"
                    sx={{ height: 260, objectFit: 'contain' }}
                    image={`data:image/jpeg;base64,${product.image3}`}
                    alt={`${product.name} Image 3`}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    ETB {product.price}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    Category: {product.category}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      mt: 2,
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: '#1565c0',
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: '1.1rem',
              }
            }}
          />
        </Box>
      </Container>

      <SpecialOffers />

      {/* Image Expand Dialog */}
      <Dialog open={!!expandedImage} onClose={handleCloseImage}>
        <DialogContent sx={{ position: 'relative', p: 0 }}>
          <IconButton
            onClick={handleCloseImage}
            sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff' }}
          >
            <CloseIcon />
          </IconButton>
          {expandedImage && (
            <img
              src={expandedImage}
              alt="Expanded"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Products;
