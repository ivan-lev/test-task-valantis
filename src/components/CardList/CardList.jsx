import './CardList.css';

import React from 'react';

export default function CardList({ list }) {
  return (
    <>
      <ul className="movies-card-list">
        {list.map(item => (
          <li className="card-list__item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
