// src/components/WhatsAppFloatingIcon.js
import React from "react";

const WhatsAppFloatingIcon = () => {
  const phoneNumber = "9632492563";

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "120px",
        right: "20px",
        width: "55px",
        height: "55px",
        borderRadius: "50%",
        background: "#25D366", // WhatsApp green
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      <i
        className="fab fa-whatsapp"
        style={{
          color: "#fff",
          fontSize: "26px",
        }}
      ></i>
    </a>
  );
};

export default WhatsAppFloatingIcon;
