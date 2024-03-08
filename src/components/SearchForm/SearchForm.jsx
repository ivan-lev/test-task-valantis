import './SearchForm.css';

//React and components
import React, { useState } from 'react';

export default function SearchForm({
  searchQuery,
  onType,
  // brands,
  // setSelectedBrand,
  onSearch
  // minCost,
  // maxCost,
  // setMinCost,
  // setMaxCost
}) {
  const [searchPlaceholder, setSearchPlaceholder] = useState('Введите ваш запрос');

  // const handleSetBrand = event => {
  //   setSelectedBrand(event.target.value);
  // };

  const handleSetSearchQuery = event => {
    onType(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    onSearch();
  };

  return (
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
    </form>
  );
}
