import React from 'react';
import './AuthInput.css';

const AuthInput = ({
  labelName,
  inptValue,
  idInput,
  nameInput,
  placeholderInput,
  erorrMessage
}) => {
  return (
    <label
      className='input-auth'
      htmlFor={idInput}>{labelName}
      <input
        placeholder={placeholderInput}
        name={nameInput}
        // value={inptValue}
        className='input-auth__input' id={idInput}
        type='text'
      />
      <span
        className={`input-auth__error input-auth__error_${idInput}`}>{erorrMessage}</span>
    </label>
  );
}

export default AuthInput;
