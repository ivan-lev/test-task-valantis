import './Filter.css';

import React from 'react';

export default function Filter({
  brands,
  setSelectedBrand,
  minCost,
  maxCost,
  setMinCost,
  setMaxCost
}) {
  const handleSetBrand = event => {
    setSelectedBrand(event.target.value);
  };

  return (
    <div className="filter">
      <div className="filter__block">
        <span>Бренд</span>
        <select className="filter__brand" onChange={handleSetBrand}>
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
          value={minCost}
          onChange={setMinCost}
        ></input>
        <input
          className="filter__price-input"
          type="number"
          min="0"
          value={maxCost}
          onChange={setMaxCost}
        ></input>
      </div>
    </div>
  );
}
