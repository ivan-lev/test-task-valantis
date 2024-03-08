import './CardList.css';

import React from 'react';
import Card from '../Card/Card';

export default function CardList({ paginatedList }) {
  return (
    <>
      <ul className="card-list">
        {paginatedList.map(item => (
          <li className="card-list__item" key={item.id}>
            <Card data={item} />
          </li>
        ))}
      </ul>
    </>
  );
}
