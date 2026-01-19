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
      setScrolled(window.scrollY > 20);
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
        className="nav-link dropdown-toggle d-flex align-items-center gap-2 fw-semibold px-3 py-2 rounded-pill"
        onClick={() => {
          toggleDropdown(dropdownName);
          scrollToTop();
        }}
        aria-expanded={openDropdown === dropdownName}
        style={{
          background: openDropdown === dropdownName ? 'linear-gradient(135deg, #ff6b6b 0%, #ff4757 100%)' : 'transparent',
          color: openDropdown === dropdownName ? 'white' : '#2d3436',
          transition: 'all 0.3s ease',
          border: 'none'
        }}
      >
        <i className={`fas ${icon} ${openDropdown === dropdownName ? 'fa-bounce' : ''}`} style={{ fontSize: '0.9rem' }}></i>
        <span className="position-relative">
          {title}
          <span className="position-absolute bottom-0 start-0 w-0 h-0.5 bg-white transition-all duration-300"
            style={{ width: openDropdown === dropdownName ? '100%' : '0%' }}></span>
        </span>
        <i className={`fas fa-chevron-down ms-1 transition-transform ${openDropdown === dropdownName ? 'rotate-180' : ''}`}
          style={{ fontSize: '0.7rem', transition: 'transform 0.3s ease' }}></i>
      </button>

      <div
        className={`dropdown-menu p-3 border-0 shadow-lg ${openDropdown === dropdownName ? 'show' : ''}`}
        ref={(el) => (dropdownRefs.current[dropdownName] = el)}
        style={{
          minWidth: '220px',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
          marginTop: '10px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          animation: openDropdown === dropdownName ? 'slideDown 0.3s ease' : 'none',

          zIndex: 10000,        // ⭐ MOST IMPORTANT
          position: 'absolute' // ⭐
        }}

      >
        {items.map((item, index) => (
          <Link
            key={index}
            className="dropdown-item d-flex align-items-center gap-3 px-3 py-2 rounded-3 mb-1"
            to={item.path}
            onClick={handleLinkClick}
            style={{
              transition: 'all 0.2s ease',
              color: '#2d3436',
              textDecoration: 'none'
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
              style={{ width: '30px', height: '30px' }}>
              <i className="fas fa-arrow-right text-danger" style={{ fontSize: '0.7rem' }}></i>
            </div>
            <div>
              <div className="fw-medium">{item.label}</div>
              <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                Learn more
              </small>
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
            padding: 0.5rem 1rem;
            font-weight: 600;
            color: #2d3436;
            transition: all 0.3s ease;
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
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
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
        `}
      </style>

      <nav
        className={`navbar navbar-expand-lg navbar-light sticky-top ${scrolled ? 'navbar-glass py-2' : 'py-3'}`}
        style={{
          transition: 'all 0.3s ease',
          zIndex: 9999,        // ⭐ dropdown front-ல வர
          position: 'relative'
        }}
      >

        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
            <div className="position-relative">
              <img
                src={logo}
                alt="Logo"
                width={scrolled ? "80" : "100"}
                height={scrolled ? "80" : "100"}
                className="transition-all duration-300"
                style={{
                  filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
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
            className="navbar-toggler border-0 position-relative"
            type="button"
            onClick={() => {
              toggleMobileMenu();
              scrollToTop();
            }}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: isMobileMenuOpen ? 'linear-gradient(135deg, #ff6b6b 0%, #ff4757 100%)' : 'transparent',
              transition: 'all 0.3s ease'
            }}
          >
            <span className={`navbar-toggler-icon ${isMobileMenuOpen ? 'text-white' : ''}`}></span>
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
              padding: '1.5rem',
              borderRadius: '0 0 20px 20px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              zIndex: 999
            } : {}}>
            <ul className="navbar-nav ms-auto align-items-center gap-2">
              <li className="nav-item">
                <Link
                  className="nav-link-custom"
                  to="/"
                  onClick={handleLinkClick}
                  style={{
                    color: location.pathname === '/' ? '#ff4757' : '#2d3436'
                  }}
                >
                  <i className="fas fa-home me-2"></i>
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
                  <i className="fas fa-briefcase me-2"></i>
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
                  <i className="fas fa-envelope me-2"></i>
                  CONTACT
                </Link>
              </li>

              {/* Search Icon */}
              <li className="nav-item ms-2">
                <button
                  className="btn btn-gradient rounded-circle d-flex align-items-center justify-content-center"
                  onClick={toggleSearch}
                  style={{
                    width: '44px',
                    height: '44px',
                    boxShadow: '0 4px 12px rgba(255, 107, 107, 0.2)'
                  }}
                >
                  <i className={`fas fa-search ${showSearch ? 'fa-spin' : ''}`} style={{ fontSize: '1rem' }}></i>
                </button>
              </li>

              {/* CTA Button */}
              <li className="nav-item ms-2">
                <Link
                  className="btn btn-outline-danger rounded-pill px-4 fw-semibold"
                  to="/contact"
                  onClick={handleLinkClick}
                  style={{
                    borderWidth: '2px',
                    borderColor: '#ff4757',
                    color: '#ff4757',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ff4757 100%)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 107, 107, 0.3)';
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
              <div ref={searchRef} className="d-flex justify-content-center mt-4 search-slide">
                <form className="d-flex w-100 max-w-md" onSubmit={handleSearchSubmit}>
                  <div className="input-group input-group-lg shadow-lg rounded-pill overflow-hidden">
                    <span className="input-group-text bg-white border-0">
                      <i className="fas fa-search text-danger"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-0 ps-0"
                      placeholder="Search jobs, services, or information..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      style={{
                        fontSize: '1rem',
                        color: '#2d3436'
                      }}
                    />
                    <button
                      type="submit"
                      className="btn btn-gradient px-4"
                      style={{
                        borderRadius: '0 50px 50px 0'
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