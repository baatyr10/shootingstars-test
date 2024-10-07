import React, { useState, useEffect } from 'react';
import './App.css';
import starImage from './star.png';
import moonImage from './moon.png';

const Star = ({ x, isVisible }) => {
  const [y, setY] = useState(Math.random() * -window.innerHeight);

  useEffect(() => {
    const fall = () => {
      setY((prevY) => {
        if (prevY >= window.innerHeight) {
          return Math.random() * -window.innerHeight;
        }
        return prevY + 1;
      });
    };

    const interval = setInterval(fall, 12);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    isVisible && (
      <img
        className="star"
        src={starImage}
        alt="star"
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      />
    )
  );
};

const App = () => {
  const [moonGlow, setMoonGlow] = useState(false);
  const [starsVisible, setStarsVisible] = useState(true);

  const stars = Array.from({ length: 50 }).map(() => ({
    x: Math.random() * window.innerWidth,
  }));

  const handleMoonClick = () => {
    setMoonGlow(!moonGlow);
    setStarsVisible((prev) => !prev);
  };

  return (
    <div className="App">
      {stars.map((star, index) => (
        <Star key={index} x={star.x} isVisible={starsVisible} />
      ))}
      <img
        className={`moon ${moonGlow ? 'glow' : ''}`}
        src={moonImage}
        alt="moon"
        onClick={handleMoonClick}
      />
    </div>
  );
};

export default App;
