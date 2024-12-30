import React, { useState } from 'react';
import styles from './AdminDashboard.module.css';

import {
  FaTachometerAlt,
  FaTags,
  FaBoxOpen,
  FaPen,
  FaCogs,
  FaClipboardList,
  FaSignOutAlt,
  FaTimes,
  FaPlus
} from 'react-icons/fa';

import OfferForm from './OfferForm';
import ProductUploadForm from './ProductUploadForm';
import BlogPost from './BlogPost';
import ManagementPanel from './ManagementPanel';
import CategoryAddForm from './CategoryAddForm';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Logout function to destroy the token
  const logout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return (
          <div className={styles.gridContainer}>
            <div className={styles.dashboardCard}>
              <h3>Total Users</h3>
              <p>250</p>
            </div>
            <div className={styles.dashboardCard}>
              <h3>Total Products</h3>
              <p>45</p>
            </div>
            <div className={styles.dashboardCard}>
              <h3>Posts</h3>
              <p>12</p>
            </div>
          </div>
        );
      case 'registration':
        return <OfferForm />;
      case 'tasku':
        return <ProductUploadForm />;
      case 'announce':
        return <BlogPost />;
      case 'panel':
        return <ManagementPanel />;
      case 'category':
        return <CategoryAddForm />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.dashboardWrapper}>
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>
            <FaCogs /> ADMIN PANEL
          </h2>
          <button className={styles.closeButton} onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <nav className={styles.navLinks}>
          <h4 onClick={() => setActiveComponent('dashboard')} className={styles.navLink}>
            <FaTachometerAlt /> Dashboard
          </h4>
          <h4 onClick={() => setActiveComponent('registration')} className={styles.navLink}>
            <FaTags /> Special Offers
          </h4>
          <h4 onClick={() => setActiveComponent('tasku')} className={styles.navLink}>
            <FaBoxOpen /> Product Manager
          </h4>
          <h4 onClick={() => setActiveComponent('announce')} className={styles.navLink}>
            <FaPen /> Blog Post
          </h4>
          <h4 onClick={() => setActiveComponent('category')} className={styles.navLink}>
            <FaPlus /> Add Category
          </h4>
          <h4 onClick={() => setActiveComponent('panel')} className={styles.navLink}>
            <FaClipboardList /> Management Panel
          </h4>
        </nav>
        <button className={styles.logoutButton} onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <button className={styles.hamburger} onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={styles.contentContainer}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
