import React from 'react';

const CustomButton = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

export default CustomButton;
