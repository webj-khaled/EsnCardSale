import React from 'react';
import './AtomAnimation.css';

const AtomAnimation: React.FC = () => {
  const numElectrons = 8; 
  const baseRadius = 15;  
  const radiusStep = 6;   

  const electrons = Array.from({ length: numElectrons }, (_, i) => {
    const orbitRadius = baseRadius + (i % 3) * radiusStep;
    const angle = (360 / numElectrons) * i; 
    const electronSize = 2.5 + (i % 2);    
    const duration = 3 + (i % 4) * 0.6;    

    // fake tilt by stretching Y radius a bit
    const rx = orbitRadius;
    const ry = orbitRadius * (i % 2 === 0 ? 0.6 : 1); // squished ellipse for tilt

    return (
      <g
        key={i}
        className="electron-orbit"
        transform={`rotate(${angle} 50 50)`}
      >
        {/* Orbit path */}
        <ellipse
          cx="50"
          cy="50"
          rx={rx}
          ry={ry}
          fill="none"
          stroke="rgba(79, 209, 197, 0.2)"
          strokeWidth="0.5"
        />
        {/* Electron */}
        <circle
          r={electronSize}
          fill="#4FD1C5"
          className="electron"
        >
          <animateMotion
            path={`M${50 + rx},50 A${rx},${ry} 0 1,1 ${49 + rx},50`}
            dur={`${duration}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values={`${electronSize};${electronSize + 1};${electronSize}`}
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    );
  });

  return (
    <div className="atom-footer">
  <div className="design-credit">
    <span>Developed and Designed by</span>
  </div>
  <a href="https://khaled-portfolio1.netlify.app/" target="_blank" rel="noopener noreferrer">
    <button className="atom-button">
      <div className="atom-container">
        <div className="atom-svg-container">
          <svg viewBox="0 0 100 100" className="atom-svg">
            {/* Nucleus */}
            <circle cx="50" cy="50" r="6" fill="#3182CE" className="nucleus">
              <animate
                attributeName="r"
                values="6;8;6"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Electrons */}
            {electrons}
          </svg>
        </div>
        <div className="name-display">
          <span>KHALED</span>
        </div>
      </div>
    </button>
  </a>
</div>

  );
};

export default AtomAnimation;
