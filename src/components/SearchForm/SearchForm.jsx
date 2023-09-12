import React, { useState, useRef } from 'react';
import './SearchForm.css';
// import placeholderSerch from '../../images/search__gray.svg'
// import { useState } from 'react';
import useValidationsForms from '../../hooks/useValidationsForms';
import { MESSAGE } from '../../utils/constats'

const SearchForm = ({
  onSubmit,
  isLoading,
  moviesFullList
}) => {

  const [errSearchMessage, setErrSearchMessage] = useState(MESSAGE.SEARCH_PLACEHOLDER_INPUT);

  const inputSearch = useRef(null);

  const listenerValidation = (isValid) => {
    if (isValid) { setErrSearchMessage(MESSAGE.SEARCH_PLACEHOLDER_INPUT) }
    else { setErrSearchMessage(MESSAGE.EMPTY_PLACEHOLDER_INPUT) }
    inputSearch.current.focus();
  }

  const {
    inputValues,
    errMessage,
    isValid,
    handleChange,
    setInputValues,
  } = useValidationsForms();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`валидация: ${isValid}`);
    listenerValidation(isValid);
    if (isValid) {
      onSubmit(inputValues.inputSearch);
    }
    // onSubmit(inputValues.inputSearch);
  }

  const clickChecbox = () => {
    console.log(moviesFullList);
    // console.log(localStorage.getItem('moviesFullList'));
    console.log('clickChecbox');
  }

  return (
    <section className="search">
      <div className="search__container">
        <form
          onSubmit={handleSubmit}
          className="search__form"
          noValidate>
          <fieldset className='search__fieldset'>
            <label htmlFor="search__input" className='search__label-form'>
              <input
                placeholder={errSearchMessage}
                ref={inputSearch}
                type="text"
                name='inputSearch'
                value={inputValues.inputSearch ?? ''}
                id="search__input"
                className="search__input"
                onChange={handleChange}
                required
              />
            </label>
          </fieldset>
          <button
            type='submit'
            className="search__button"
            disabled={isLoading}
          ></button>
        </form>
        <div className="search__wrapper">
          <label
            className='search__switch'
            htmlFor="search__checkbox">
            <input
              type="checkbox"
              className="search__checkbox"
              id='search__checkbox'
              onClick={clickChecbox}
            />
            <div className="search__slider search__slider_round"></div>
          </label>
          <label
            className='search__label-text'
            htmlFor="search__checkbox">Короткометражки</label>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
