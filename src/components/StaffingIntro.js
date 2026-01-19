import React from "react";
import { useLocation } from "react-router-dom";

const StaffingIntro = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" && (
        <section className="py-5 text-center bg-dark text-white">
          <div className="container">
            <h2 className="fw-bold display-5">Staffing, Recruitment and HR Compliance Services</h2>
            <hr className="mx-auto my-3" style={{ width: "60px", borderTop: "3px solid #fff" }} />
            <h5 className="mb-4">Champions HR Services</h5>
            <p className="mb-4" style={{textAlign:"justify", maxWidth: "900px", margin: "0 auto", lineHeight: "1.8" }}>
              Champions HR Services Bangalore, Karnataka. is a leading player in the global staffing and recruitment ecosystem...
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default StaffingIntro;