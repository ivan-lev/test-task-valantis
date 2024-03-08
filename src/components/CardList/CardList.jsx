import './CardList.css';

import React from 'react';
import Card from '../Card/Card';

export default function CardList({ list }) {
  return (
    <>
      <ul className="card-list">
        {list.map(item => (
          <li className="card-list__item" key={item.id}>
            <Card data={item} />
          </li>
        ))}
      </ul>
    </>
  );
}
