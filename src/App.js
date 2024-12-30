import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Footer from './components/Footer';
import ProductUploadForm from './admin/ProductUploadForm';
import OfferForm from './admin/OfferForm';
import BlogPost from './admin/BlogPost.js'
import BlogPosts from './components/BlogPosts.js';
import AdminDashboard from './admin/AdminDashboard.js'
import SearchComponent from './components/SearchComponent.js';
import SellDeviceForm from './components/SellDeviceForm.js';
import Adminlogin from './admin/AdminLogin.js'
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.js'

function App() {
  return (
    <AuthProvider>
      <HashRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path='/Pup' element={<ProductUploadForm />}/>
          <Route path='/of' element={<OfferForm />}/>
          <Route path='/postblog' element={<BlogPost />}/>
          <Route path='/blog' element={<BlogPosts />}/>
          <Route
  path='/dashboard'
  element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>}
/>
          <Route path='/search' element={<SearchComponent/>}/>
          <Route path='/sell' element={<SellDeviceForm />}/>
          <Route path='/login' element={<Adminlogin />}/>
        </Routes>
        <Footer />
      </div>
    </HashRouter>
    </AuthProvider>
    
  );
}

export default App;
