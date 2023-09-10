import React, { useState } from 'react';
import './SearchForm.css';
// import placeholderSerch from '../../images/search__gray.svg'
// import { useState } from 'react';
import useValidationsForms from '../../hooks/useValidationsForms';


const SearchForm = ({
  onSubmit
}) => {

  const {
    inputValues,
    errMessage,
    isValid,
    handleChange,
    setInputValues,
  } = useValidationsForms();



  const clickChecbox = () => {
    console.log('clickChecbox');
  }

  return (
    <section className="search">
      <div className="search__container">
        <form
          onSubmit={onSubmit}
          action=""
          className="search__form"
          noValidate>
          <fieldset className='search__fieldset'>
            <label htmlFor="search__input" className='search__label-form'>
              <input
                placeholder='Фильм'
                type="text"
                name='inputSearch'
                value={inputValues.inputSearch ?? ''}
                id="search__input"
                className="search__input"
                onChange={handleChange}
              />
            </label>
          </fieldset>
          <button type='submit' className="search__button links-hover"></button>
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
