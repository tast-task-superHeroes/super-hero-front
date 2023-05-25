import { useState, useEffect } from 'react';
import './SuccessfulMessage.scss';

export const SuccessfulMessage = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, []);

  return (
    <div className={`success-animation ${isAnimating ? 'animate' : ''}`}>
      <span>Success</span>
    </div>
  );
};