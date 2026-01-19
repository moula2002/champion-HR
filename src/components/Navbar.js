import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Logo4.jpg';

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const location = useLocation();
  const dropdownRefs = useRef({});

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (showSearch) setShowSearch(false);
    closeAllDropdowns();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    closeAllDropdowns();
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    closeAllDropdowns();
    scrollToTop(); // Add scroll to top for search too
  };

  // Close mobile menu when route changes
  useEffect(() => {
    closeMobileMenu();
    scrollToTop(); // Scroll to top on route change
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    scrollToTop();
  };

  // Handle link click with scroll to top
  const handleLinkClick = () => {
    closeMobileMenu();
    closeAllDropdowns();
    scrollToTop();
  };

  // Simple Dropdown Component with scroll to top
  const SimpleDropdown = ({ title, items, icon, dropdownName }) => (
    <li className="nav-item dropdown">
      <button
        className="nav-link dropdown-toggle text-dark custom-hover-red d-flex align-items-center"
        onClick={() => {
          toggleDropdown(dropdownName);
          scrollToTop();
        }}
        aria-expanded={openDropdown === dropdownName}
      >
        <i className={`fas ${icon} me-2`}></i> {title}
      </button>
      <div 
        className={`dropdown-menu ${openDropdown === dropdownName ? 'show' : ''}`}
        ref={el => dropdownRefs.current[dropdownName] = el}
      >
        {items.map((item, index) => (
          <Link 
            key={index}
            className="dropdown-item" 
            to={item.path}
            onClick={handleLinkClick}
          >
            <i className="fas fa-arrow-right me-2 text-danger"></i> {item.label}
          </Link>
        ))}
      </div>
    </li>
  );

  const aboutItems = [
    { path: "/about/mission", label: "Mission & Values" },
    { path: "/about/company", label: "Our Company" }
  ];

  const servicesItems = [
    { path: "/services/staffing", label: "Staffing Solutions" },
    { path: "/services/compliance", label: "HR & Statutory Compliance" },
    { path: "/services/industries", label: "Industries We Serve" }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div className="container">
        {/* Logo - Click also scrolls to top */}
        <Link 
          className="navbar-brand" 
          to="/" 
          onClick={handleLinkClick}
        >
          <img src={logo} alt="Logo" width="100" height="100" />
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => {
            toggleMobileMenu();
            scrollToTop();
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link 
                className="nav-link text-dark" 
                to="/" 
                onClick={handleLinkClick}
              >
                <i className="fas fa-home me-2"></i>HOME
              </Link>
            </li>

            <li className="nav-item">
              <Link 
                className="nav-link text-dark" 
                to="/jobs" 
                onClick={handleLinkClick}
              >
                <i className="fas fa-briefcase me-2"></i> JOBS
              </Link>
            </li>

            {/* About Dropdown */}
            <SimpleDropdown 
              title="ABOUT"
              items={aboutItems}
              icon="fa-user"
              dropdownName="about"
            />

            {/* Services Dropdown */}
            <SimpleDropdown 
              title="SERVICES"
              items={servicesItems}
              icon="fa-cogs"
              dropdownName="services"
            />

            <li className="nav-item">
              <Link 
                className="nav-link text-dark" 
                to="/contact" 
                onClick={handleLinkClick}
              >
                <i className="fas fa-phone-alt me-2"></i> CONTACT
              </Link>
            </li>

            {/* Search Button */}
            <li className="nav-item">
              <button
                className="btn btn-link nav-link text-dark"
                onClick={toggleSearch}
              >
                <i className="fas fa-search"></i>
              </button>
            </li>
          </ul>

          {/* Search Box */}
          {showSearch && (
            <div className="d-flex mt-2 mt-lg-0 ms-lg-3">
              <form className="d-flex" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="btn btn-danger ms-2">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          padding: 0;
        }
        
        .nav-link {
          padding: 1rem 1.5rem !important;
          font-weight: 500;
          transition: all 0.3s;
          cursor: pointer;
        }
        
        .nav-link:hover {
          color: #dc3545 !important;
          background-color: #f8f9fa;
        }
        
        /* Desktop Dropdown */
        @media (min-width: 992px) {
          .dropdown-menu {
            border: none;
            border-radius: 0;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            margin-top: 0;
            background: white;
            min-width: 200px;
          }
          
          .dropdown-item {
            padding: 0.75rem 1.5rem;
            color: #333 !important;
            border-bottom: 1px solid #f0f0f0;
            transition: all 0.3s;
            cursor: pointer;
          }
          
          .dropdown-item:last-child {
            border-bottom: none;
          }
          
          .dropdown-item:hover {
            background-color: #dc3545;
            color: white !important;
          }
          
          .dropdown-item:hover i {
            color: white !important;
          }
        }
        
        /* Mobile Styles */
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: white;
            padding: 1rem;
            border-top: 1px solid #eee;
          }
          
          .nav-item {
            border-bottom: 1px solid #f5f5f5;
          }
          
          .nav-item:last-child {
            border-bottom: none;
          }
          
          .dropdown-menu {
            background: #f8f9fa;
            border: none;
            border-radius: 0;
            margin: 0;
            padding: 0;
            width: 100%;
          }
          
          .dropdown-item {
            padding: 0.75rem 1rem 0.75rem 2rem;
            color: #333 !important;
            border-bottom: 1px solid #e9ecef;
            cursor: pointer;
          }
          
          .dropdown-item:last-child {
            border-bottom: none;
          }
          
          .dropdown-item:hover {
            background: #e9ecef;
          }
        }
        
        .custom-hover-red:hover {
          color: #dc3545 !important;
        }
        
        /* Smooth scrolling for the whole page */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;