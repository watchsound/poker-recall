import React from 'react';
import './ControlButton.css';

const ControlButton = ({ onClick }) => {
  return (
    <button className="control-button" onClick={onClick}>
      Play Card
    </button>
  );
};

export default ControlButton;
