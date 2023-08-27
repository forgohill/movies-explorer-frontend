import React from 'react';
import './SearchForm.css';
import placeholderSerch from '../../images/search__gray.svg'
const SearchForm = () => {

  const clickChecbox = () => {
    console.log('clickChecbox');
  }
  return (
    <section className="search">
      <div className="search__container">
        <form
          action=""
          className="search__form"
          noValidate>
          <fieldset className='search__fieldset'>
            <label htmlFor="search__input" className='search__label-form'>
              <img src={placeholderSerch} alt="" className='search__search-image' />
              <input
                type="text"
                className="search__input"
                id="search__input"
                placeholder='Фильм' />
            </label>
          </fieldset>
          <button type='submit' className="search__button links__hover"></button>
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
          Короткометражки
        </div>
      </div>
      <div className="search__line"></div>
    </section>
  );
}

export default SearchForm;
