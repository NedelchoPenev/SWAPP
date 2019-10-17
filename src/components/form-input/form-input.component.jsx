import React from 'react';

const FormInput = ({ handleChange, ...otherProps }) => (
  <div>
    <input className="form-input" onChange={handleChange} {...otherProps} />
  </div>
);

export default FormInput;
