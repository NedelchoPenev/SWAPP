import React from 'react';

import { InputStyle } from './form-input.styles';

const FormInput = ({ handleChange, ...otherProps }) => (
  <InputStyle onChange={handleChange} {...otherProps} />
);

export default FormInput;
