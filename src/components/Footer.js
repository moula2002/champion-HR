import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Function to scroll to top when any link is clicked
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* ================= ABOUT US ================= */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">About Us</h5>
            <p>
              Champions HR Services is a leading provider of recruitment
              solutions, HR staffing, and HR compliance services across India.
              Reach out to us for tailored solutions that meet your recruitment
              and HR compliance needs.
            </p>

            <h6 className="fw-bold mt-3">Follow Us</h6>
            <div>
              <a
                href="https://x.com/Basavaraj_189"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-sm me-1"
                onClick={handleClick}
              >
                <i className="fab fa-twitter"></i>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61575737247861"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-sm me-1"
                onClick={handleClick}
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              <a
                href="https://www.instagram.com/championhrservices"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-sm me-1"
                onClick={handleClick}
              >
                <i className="fab fa-instagram"></i>
              </a>

              <a
                href="http://www.linkedin.com/in/champion-hr-services"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-sm me-1"
                onClick={handleClick}
              >
                <i className="fab fa-linkedin-in"></i>
              </a>

              <a
                href="https://youtube.com/@basavaraj-09"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-sm"
                onClick={handleClick}
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">

              <li>
                <Link to="/" className="footer-link" onClick={handleClick}>
                  <i className="fas fa-home me-2"></i>Home
                </Link>
              </li>

              <li>
                <Link to="/jobs" className="footer-link" onClick={handleClick}>
                  <i className="fas fa-briefcase me-2"></i>Jobs
                </Link>
              </li>

              <li>
                <Link to="/services" className="footer-link" onClick={handleClick}>
                  <i className="fas fa-concierge-bell me-2"></i>Our Services
                </Link>
              </li>

              <li>
                <Link to="/about" className="footer-link" onClick={handleClick}>
                  <i className="fas fa-users me-2"></i>About Us
                </Link>
              </li>

              <li>
                <Link to="/contact" className="footer-link" onClick={handleClick}>
                  <i className="fas fa-envelope me-2"></i>Contact Us
                </Link>
              </li>

            </ul>
          </div>

          {/* ================= OUR SERVICES ================= */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Our Services</h5>
            <ul className="list-unstyled">

              <li>
                <Link to="/services/staffing" className="footer-link" onClick={handleClick}>
                  Staffing Solutions
                </Link>
              </li>

              <li>
                <Link to="/services/compliance" className="footer-link" onClick={handleClick}>
                  HR Compliance
                </Link>
              </li>

              <li>
                <Link to="/services/industries" className="footer-link" onClick={handleClick}>
                  Industries We Serve
                </Link>
              </li>

            </ul>
          </div>

          {/* ================= CONTACT INFO ================= */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Contact Information</h5>

            <p>
              <i className="fas fa-map-marker-alt me-2"></i>
              <strong>Head Office Address:</strong><br />
              62/3, Janaki Raman Building, 12th Main Road, WCR Shivanagar,
              Bengaluru, Bengaluru Urban, Karnataka - 560010
            </p>

            {/* PHONE */}
            <div className="d-flex align-items-start mb-2">
              <i className="fas fa-phone me-2 mt-1"></i>
              <span>Phone: +91-9632492563</span>
            </div>

            {/* INSTAGRAM */}
            <div className="d-flex align-items-start">
              <i
                className="fab fa-instagram me-2 mt-1"
                style={{ color: "#E1306C" }}
              ></i>

              <a
                href="https://www.instagram.com/bvr_4u/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none"
                onClick={handleClick}
              >
                Follow Instagram <strong>@bvr_4u</strong> • Hiring Alerts Everyday
              </a>
            </div>
          </div>

        </div>

        {/* ================= COPYRIGHT ================= */}
        <div className="text-center border-top pt-3 mt-3">
          <p className="mb-0 small">
            © {new Date().getFullYear()} Champions HR Services. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;