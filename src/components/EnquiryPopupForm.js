import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";

function EnquiryPopupForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
  });

  const toggleForm = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("🎉 Thank you! Our team will contact you shortly.");
    setOpen(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      service: "",
    });
  };

  return (
    <>
      {/* 💬 Floating Button */}
      <div
        onClick={toggleForm}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "20px",
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          background: "#dc3545",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 99999,
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
        title="Enquiry"
      >
        {open ? "✖" : "💬"}
      </div>

      {/* 📋 Popup Form */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            width: "320px",
            zIndex: 99999,
          }}
        >
          <Card style={{ borderRadius: "14px" }} className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center text-danger mb-3">
                Enquiry Form
              </Card.Title>

              <Form onSubmit={handleSubmit}>
                {/* Full Name */}
                <Form.Group className="mb-2">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-2">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Phone */}
                <Form.Group className="mb-2">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* Service */}
                <Form.Group className="mb-3">
                  <Form.Label>Service Required</Form.Label>
                  <Form.Select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="Job Search">Looking for a Job</option>
                    <option value="Staffing">Staffing Services</option>
                    <option value="HR Compliance">HR Compliance Services</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="danger" type="submit">
                    Submit Enquiry
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}

export default EnquiryPopupForm;
