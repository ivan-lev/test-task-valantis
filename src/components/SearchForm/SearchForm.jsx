import './SearchForm.css';

//React and components
import React, { useState } from 'react';

export default function SearchForm({
  searchQuery,
  onType,
  searchJewelry,
  brands,
  setSelectedBrand
}) {
  const [searchPlaceholder, setSearchPlaceholder] = useState('Введите ваш запрос');

  const handleSetBrand = event => {
    setSelectedBrand(event.target.value);
  };

  const handleSetSearchQuery = event => {
    onType(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    searchJewelry(inputValue);
    setSearchPlaceholder('Фильм');
  };

  return (
    <section className="main__section search-form">
      <form className="search-form__form" onSubmit={handleSearch}>
        <div className="search-form__input-line">
          <input
            className="search-form__input"
            type="text"
            name="movie"
            placeholder={searchPlaceholder}
            onChange={handleSetSearchQuery}
            value={searchQuery}
            autoFocus
          ></input>
          <button type="submit" className="search-form__button" onClick={handleSearch}></button>
        </div>
        <div className="search-form__filters">
          <div className="search-form__block">
            <span>Бренд</span>
            <select className="search-form__brand" onChange={handleSetBrand}>
              {brands.map(brand => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div className="search-form__block">
            <span>Цена</span>
            <input
              className="search-form__price-input"
              type="number"
              min="0"
              max="1000"
              value="0"
            ></input>
            <input
              className="search-form__price-input"
              type="number"
              min="0"
              max="1000"
              value="1000"
            ></input>
          </div>
        </div>
      </form>
    </section>
  );
}
