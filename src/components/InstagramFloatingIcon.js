const InstagramFloatingIcon = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "180px",
        right: "20px",
        width: "60px",
        height: "60px",
        zIndex: 99999,
      }}
    >
      {/* 🔵 Instagram Icon ONLY */}
      <a
        href="https://www.instagram.com/bvr_4u/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          background:
            "linear-gradient(45deg,#f58529,#dd2a7b,#8134af,#515bd4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "26px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        <i className="fab fa-instagram"></i>
      </a>
    </div>
  );
};

export default InstagramFloatingIcon;
