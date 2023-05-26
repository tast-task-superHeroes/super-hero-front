import { useState, useEffect } from 'react';
import './SuccessfulMessage.scss';
import classNames from 'classnames';

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
    <div className={classNames('success-animation', {'animate': isAnimating})}>
      <span>Success</span>
    </div>
  );
};