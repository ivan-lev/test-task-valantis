import './Filter.css';

import React from 'react';

export default function Filter({
  brands,
  selectedBrand,
  setSelectedBrand,
  minCost,
  maxCost,
  setMinCost,
  setMaxCost,
  minMax,
  onFilter
}) {
  const handleSetBrand = event => {
    setSelectedBrand(event.target.value);
  };

  return (
    <div className="filter">
      <div className="filter__block">
        <span>Бренд</span>
        <select className="filter__brand" value={selectedBrand} onChange={handleSetBrand}>
          <option key="all-brands" value="all-brands">
            Все бренды
          </option>
          {brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <div className="filter__block">
        <span>Цена</span>
        <input
          className="filter__price-input"
          type="number"
          min="0"
          max={maxCost}
          placeholder={minMax.min}
          value={minCost}
          onChange={setMinCost}
        ></input>
        <input
          className="filter__price-input"
          type="number"
          min="0"
          max={maxCost}
          placeholder={minMax.max}
          value={maxCost}
          onChange={setMaxCost}
        ></input>
      </div>
      <button className="filter__button" onClick={onFilter}>
        Фильтровать
      </button>
    </div>
  );
}
