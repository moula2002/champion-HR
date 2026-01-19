import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaPhoneAlt,
  FaHandshake,
} from "react-icons/fa";
import contactImg from "../assets/contact-banner.jpg";

const ContactUs = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">

        {/* ================= TOP SECTION ================= */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="fw-bold text-danger mb-4">Contact Us</h2>

            <p className="text-muted mb-2">
              Contact us with any questions or inquiries or call{" "}
              <strong>+91-9632492563</strong>
            </p>

            <p className="text-muted">
              We would be happy to answer your questions and set up a meeting
              with you. We assure you,{" "}
              <span className="text-danger fw-bold">
                Champions HR Services
              </span>{" "}
              can set you apart from the flock.
            </p>

            <div className="d-flex gap-3 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-5">
                <FaFacebookF />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-5">
                <FaLinkedinIn />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-5">
                <FaTwitter />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-5">
                <FaYoutube />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark fs-5">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="col-md-6 text-center">
            <img
              src={contactImg}
              alt="Contact Champions HR Services"
              className="img-fluid rounded shadow-sm"
            />
          </div>
        </div>

        {/* ================= INFO CARDS ================= */}
        <div className="row mt-5 g-4 justify-content-center">
          <div className="col-md-4">
            <div className="border p-4 text-center bg-white rounded shadow-sm">
              <FaHandshake className="text-danger fs-3 mb-2" />
              <h5 className="text-danger fw-bold">Need Help?</h5>
              <a href="mailto:info@championshrservices.com" className="text-decoration-none text-dark">
                <p className="mb-0">info@championshrservices.com</p>
              </a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border p-4 text-center bg-white rounded shadow-sm">
              <FaPhoneAlt className="text-danger fs-3 mb-2" />
              <h5 className="text-danger fw-bold">Feel Like Talking</h5>
              <a href="tel:+919632492563" className="text-decoration-none text-dark">
                <p className="mb-0">+91-9632492563</p>
              </a>
            </div>
          </div>
        </div>

        {/* ================= GOOGLE MAP ================= */}
        <div className="row mt-5">
          <div className="col-md-10 mx-auto">
            <h4 className="text-danger mb-3">Our Location</h4>

            <iframe
              title="Champions HR Services Location"
              src="https://www.google.com/maps?q=62/3+Janaki+Raman+Building+12th+Main+Road+WCR+Shivanagar+Bengaluru+560010&z=17&output=embed"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <p className="mt-3 text-muted">
              <strong>Head Office Address:</strong><br />
              62/3, Janaki Raman Building,<br />
              12th Main Road, WCR Shivanagar,<br />
              Bengaluru – <strong>560010</strong>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;