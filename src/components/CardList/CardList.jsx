import './CardList.css';

import React from 'react';
import Card from '../Card/Card';

export default function CardList({ listToDisplay }) {
  return (
    <>
      <ul className="card-list">
        {listToDisplay.map(item => (
          <li className="card-list__item" key={item.id}>
            <Card data={item} />
          </li>
        ))}
      </ul>
    </>
  );
}
