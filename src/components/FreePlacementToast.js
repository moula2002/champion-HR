import React, { useEffect, useState } from "react";

const FreePlacementToast = () => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(true);
    const timer = setTimeout(() => setShowToast(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showToast && (
        <div className="placement-toast">
          <div className="toast-content">
            <div className="toast-header">
              <strong>🎯 100% Free Job Placement</strong>
              <button onClick={() => setShowToast(false)}>✕</button>
            </div>
            <div className="toast-body">
              <ul>
                <li>No Registration Fees — Apply without paying any charges.</li>
                <li>No Consultancy Charges — No hidden fees from candidates.</li>
                <li>100% Free Placement Support — Completely free services.</li>
                <li>Direct Company Hiring — Verified openings from top employers.</li>
                <li>Genuine Opportunities — Real career growth with trusted companies.</li>
              </ul>
            </div>
          </div>

          <style jsx>{`
            .placement-toast {
              position: fixed;
              z-index: 9999;
              animation: slideIn 0.5s ease-out;
            }
            
            .toast-content {
              background: white;
              border: 2px solid #dc3545;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              width: 350px;
              max-width: 90vw;
            }
            
            .toast-header {
              padding: 12px 15px;
              border-bottom: 2px solid #dc3545;
              background: #fff5f5;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            
            .toast-header strong {
              color: #dc3545;
              font-size: 16px;
            }
            
            .toast-header button {
              background: transparent;
              border: none;
              font-size: 16px;
              cursor: pointer;
              color: #666;
            }
            
            .toast-body {
              padding: 15px;
            }
            
            .toast-body ul {
              margin: 0;
              padding-left: 20px;
              list-style-type: disc;
            }
            
            .toast-body li {
              margin-bottom: 8px;
              font-size: 14px;
              color: #333;
              line-height: 1.4;
            }
            
            .toast-body li:last-child {
              margin-bottom: 0;
            }
            
            /* Desktop - Top Center */
            @media (min-width: 992px) {
              .placement-toast {
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                animation: slideInTop 0.5s ease-out;
              }
            }
            
            /* Tablet - Top Right */
            @media (min-width: 768px) and (max-width: 991px) {
              .placement-toast {
                top: 20px;
                right: 20px;
                animation: slideInRight 0.5s ease-out;
              }
            }
            
            /* Mobile - Side */
            @media (max-width: 767px) {
              .placement-toast {
                bottom: 20px;
                right: 20px;
                animation: slideInRight 0.5s ease-out;
              }
              
              .toast-content {
                width: 95vw;
                max-width: 95vw;
              }
              
              .toast-body li {
                font-size: 13px;
              }
              
              .toast-header strong {
                font-size: 15px;
              }
            }
            
            /* Small Mobile */
            @media (max-width: 480px) {
              .placement-toast {
                bottom: 10px;
                right: 10px;
                left: 10px;
                width: auto;
              }
              
              .toast-content {
                width: 100%;
                max-width: 100%;
              }
              
              .toast-body li {
                font-size: 12px;
              }
              
              .toast-header strong {
                font-size: 14px;
              }
            }
            
            /* Animations */
            @keyframes slideInTop {
              from {
                transform: translate(-50%, -100px);
                opacity: 0;
              }
              to {
                transform: translate(-50%, 0);
                opacity: 1;
              }
            }
            
            @keyframes slideInRight {
              from {
                transform: translateX(100px);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default FreePlacementToast;