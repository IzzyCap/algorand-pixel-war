import React from 'react';
import classes from './spinner.module.css';

interface SpinnerProps {
  size?: number;
  roundCorners?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 50, roundCorners = false}) => {
  const spinnerStyle: React.CSSProperties = {
    width: size,
    height: size,
  };

  return (
    <div className={`${roundCorners ? `round-corners` : ''} ${classes.spinnerContainer}`} >
      <div className={classes.spinner} style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;
