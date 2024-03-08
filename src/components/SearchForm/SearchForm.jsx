import './SearchForm.css';

//React and components
import React, { useState } from 'react';

export default function SearchForm({ searchQuery, onType, onSearch }) {
  const [searchPlaceholder, setSearchPlaceholder] = useState('Введите ваш запрос');

  const handleSetSearchQuery = event => {
    setSearchPlaceholder('Введите ваш запрос');
    onType(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    if (searchQuery.length === 0) {
      setSearchPlaceholder('Нужно ввести слово для поиска');
      return;
    }
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
