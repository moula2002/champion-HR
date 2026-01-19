import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Logo4.jpg';

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const dropdownRefs = useRef({});
  const searchRef = useRef(null);

  /* ---------------- Scroll Effect ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ---------------- Scroll to Top ---------------- */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ---------------- Dropdown ---------------- */
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  /* ---------------- Mobile Menu ---------------- */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    if (showSearch) setShowSearch(false);
    closeAllDropdowns();
  };

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  /* ---------------- Search ---------------- */
  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    closeAllDropdowns();
    scrollToTop();
  };

  /* ---------------- Click Outside Handler ---------------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        if (showSearch) setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearch]);

  /* ---------------- Route change effect ---------------- */
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  /* ---------------- Handlers ---------------- */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    scrollToTop();
    setSearchQuery('');
    setShowSearch(false);
  };

  const handleLinkClick = () => {
    closeMobileMenu();
    closeAllDropdowns();
    scrollToTop();
  };

  /* ---------------- Enhanced Dropdown Component ---------------- */
  const EnhancedDropdown = ({ title, items, icon, dropdownName }) => (
    <li className="nav-item dropdown position-relative">
      <button
        className="nav-link d-flex align-items-center gap-2 fw-semibold px-3 py-1 rounded-pill"
        onClick={() => {
          toggleDropdown(dropdownName);
          scrollToTop();
        }}
        aria-expanded={openDropdown === dropdownName}
        style={{
          background: openDropdown === dropdownName ? 'linear-gradient(135deg, #ff6b6b 0%, #ff4757 100%)' : 'transparent',
          color: openDropdown === dropdownName ? 'white' : '#2d3436',
          transition: 'all 0.3s ease',
          border: 'none',
          fontSize: '0.9rem'
        }}
      >
        <i className={`fas ${icon} ${openDropdown === dropdownName ? 'fa-bounce' : ''}`} style={{ fontSize: '0.8rem' }}></i>
        <span className="position-relative">
          {title}
          <span className="position-absolute bottom-0 start-0 w-0 h-0.5 bg-white transition-all duration-300"
            style={{ width: openDropdown === dropdownName ? '100%' : '0%' }}></span>
        </span>
        <i className={`fas fa-chevron-down ms-1 transition-transform ${openDropdown === dropdownName ? 'rotate-180' : ''}`}
          style={{ fontSize: '0.6rem', transition: 'transform 0.3s ease' }}></i>
      </button>

      <div
        className={`dropdown-menu p-3 border-0 shadow-lg ${openDropdown === dropdownName ? 'show' : ''}`}
        ref={(el) => (dropdownRefs.current[dropdownName] = el)}
        style={{
          minWidth: '200px',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          marginTop: '8px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          animation: openDropdown === dropdownName ? 'slideDown 0.3s ease' : 'none',
          zIndex: 10000,
          position: 'absolute'
        }}
      >
        {items.map((item, index) => (
          <Link
            key={index}
            className="dropdown-item d-flex align-items-center gap-2 px-3 py-2 rounded-3 mb-1"
            to={item.path}
            onClick={handleLinkClick}
            style={{
              transition: 'all 0.2s ease',
              color: '#2d3436',
              fontSize: '0.875rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ff4757 100%)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#2d3436';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <div className="icon-wrapper bg-light rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '24px', height: '24px' }}>
              <i className="fas fa-arrow-right text-danger" style={{ fontSize: '0.6rem' }}></i>
            </div>
            <div>
              <div className="fw-medium">{item.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </li>
  );

  /* ---------------- Menu Items ---------------- */
  const aboutItems = [
    { path: '/about/mission', label: 'Mission & Values' },
    { path: '/about/company', label: 'Our Company' },
  ];

  const servicesItems = [
    { path: '/services/staffing', label: 'Staffing Solutions' },
    { path: '/services/compliance', label: 'HR & Statutory Compliance' },
    { path: '/services/industries', label: 'Industries We Serve' },
  ];

  /* ---------------- JSX ---------------- */
  return (
    <>
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .rotate-180 {
            transform: rotate(180deg);
          }

          .nav-link-custom {
            position: relative;
            padding: 0.375rem 0.75rem;
            font-weight: 600;
            color: #2d3436;
            transition: all 0.3s ease;
            font-size: 0.9rem;
          }

          .nav-link-custom::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: linear-gradient(135deg, #ff6b6b 0%, #ff4757 100%);
            transition: all 0.3s ease;
            transform: translateX(-50%);
          }

          .nav-link-custom:hover::after {
            width: 80%;
          }

          .nav-link-custom:hover {
            color: #ff4757;
          }

          .navbar-glass {
            background: rgba(255, 255, 255, 0.98) !important;
            backdrop-filter: blur(10px) !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          }

          .search-slide {
            animation: fadeIn 0.3s ease forwards;
          }

          .mobile-menu-slide {
            animation: slideDown 0.3s ease forwards;
          }

          .btn-gradient {
            background: linear-gradient(135deg, #ff6b6b 0%, #ff4757 100%);
            border: none;
            color: white;
            transition: all 0.3s ease;
          }

          .btn-gradient:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
          }
          
          .navbar a,
          .navbar a:hover,
          .navbar a:focus,
          .navbar a:active {
            text-decoration: none !important;
          }

          /* Reduced navbar height */
          .navbar.sticky-top {
            min-height: 60px;
            transition: all 0.3s ease;
          }

          /* Prevent navbar from moving up */
          .navbar {
            transform: translateY(0) !important;
            top: 0 !important;
          }

          /* Mobile menu adjustments */
          @media (max-width: 991.98px) {
            .navbar-collapse {
              max-height: calc(100vh - 60px);
              overflow-y: auto;
            }
          }
        `}
      </style>

      <nav
        className={`navbar navbar-expand-lg navbar-light sticky-top ${scrolled ? 'navbar-glass' : ''}`}
        style={{
          transition: 'all 0.3s ease',
          zIndex: 9999,
          position: 'sticky',
          top: 0,
          padding: scrolled ? '0.25rem 0' : '0.5rem 0',
          minHeight: '60px'
        }}
      >
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/" onClick={handleLinkClick} style={{ padding: 0 }}>
            <div className="position-relative d-flex align-items-center">
              <img
                src={logo}
                alt="Logo"
                width={scrolled ? "50" : "60"}
                height={scrolled ? "50" : "60"}
                className="transition-all duration-300"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                }}
              />
              <div className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(255, 71, 87, 0.1) 100%)',
                  borderRadius: '50%',
                  zIndex: -1
                }}></div>
            </div>
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => {
              toggleMobileMenu();
              scrollToTop();
            }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              padding: '0',
              background: isMobileMenuOpen ? 'linear-gradient(135deg, #ff6b6b 0%, #ff4757 100%)' : 'transparent',
              transition: 'all 0.3s ease'
            }}
          >
            <span className={`navbar-toggler-icon ${isMobileMenuOpen ? 'text-white' : ''}`} style={{ width: '18px', height: '18px' }}></span>
          </button>

          {/* Main Navigation */}
          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show mobile-menu-slide' : ''}`}
            style={isMobileMenuOpen ? {
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)',
              padding: '1rem',
              borderRadius: '0 0 15px 15px',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
              zIndex: 999,
              maxHeight: 'calc(100vh - 60px)',
              overflowY: 'auto'
            } : {}}>
            <ul className="navbar-nav ms-auto align-items-center gap-1">
              <li className="nav-item">
                <Link
                  className="nav-link-custom"
                  to="/"
                  onClick={handleLinkClick}
                  style={{
                    color: location.pathname === '/' ? '#ff4757' : '#2d3436'
                  }}
                >
                  <i className="fas fa-home me-1" style={{ fontSize: '0.8rem' }}></i>
                  HOME
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link-custom"
                  to="/jobs"
                  onClick={handleLinkClick}
                  style={{
                    color: location.pathname === '/jobs' ? '#ff4757' : '#2d3436'
                  }}
                >
                  <i className="fas fa-briefcase me-1" style={{ fontSize: '0.8rem' }}></i>
                  JOBS
                </Link>
              </li>

              <EnhancedDropdown
                title="ABOUT"
                items={aboutItems}
                icon="fa-users"
                dropdownName="about"
              />

              <EnhancedDropdown
                title="SERVICES"
                items={servicesItems}
                icon="fa-cogs"
                dropdownName="services"
              />

              <li className="nav-item">
                <Link
                  className="nav-link-custom"
                  to="/contact"
                  onClick={handleLinkClick}
                  style={{
                    color: location.pathname === '/contact' ? '#ff4757' : '#2d3436'
                  }}
                >
                  <i className="fas fa-envelope me-1" style={{ fontSize: '0.8rem' }}></i>
                  CONTACT
                </Link>
              </li>

              {/* Search Icon */}
              <li className="nav-item ms-1">
                <button
                  className="btn btn-gradient rounded-circle d-flex align-items-center justify-content-center"
                  onClick={toggleSearch}
                  style={{
                    width: '36px',
                    height: '36px',
                    boxShadow: '0 2px 8px rgba(255, 107, 107, 0.2)'
                  }}
                >
                  <i className={`fas fa-search ${showSearch ? 'fa-spin' : ''}`} style={{ fontSize: '0.9rem' }}></i>
                </button>
              </li>

              {/* CTA Button */}
              <li className="nav-item ms-1">
                <Link
                  className="btn btn-outline-danger rounded-pill px-3 fw-semibold"
                  to="/contact"
                  onClick={handleLinkClick}
                  style={{
                    borderWidth: '2px',
                    borderColor: '#ff4757',
                    color: '#ff4757',
                    transition: 'all 0.3s ease',
                    fontSize: '0.85rem',
                    padding: '0.375rem 1rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ff4757 100%)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(255, 107, 107, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#ff4757';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Get Started
                </Link>
              </li>
            </ul>

            {/* Search Bar */}
            {showSearch && (
              <div ref={searchRef} className="d-flex justify-content-center mt-3 search-slide">
                <form className="d-flex w-100 max-w-md" onSubmit={handleSearchSubmit}>
                  <div className="input-group input-group-sm shadow rounded-pill overflow-hidden">
                    <span className="input-group-text bg-white border-0 py-2">
                      <i className="fas fa-search text-danger" style={{ fontSize: '0.9rem' }}></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-0 ps-0 py-2"
                      placeholder="Search jobs, services, or information..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      style={{
                        fontSize: '0.9rem',
                        color: '#2d3436'
                      }}
                    />
                    <button
                      type="submit"
                      className="btn btn-gradient px-3 py-2"
                      style={{
                        borderRadius: '0 50px 50px 0',
                        fontSize: '0.9rem'
                      }}
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;