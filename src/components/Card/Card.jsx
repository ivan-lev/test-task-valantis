import './Card.css';

import image from '../../assets/images/ring.jpg';

export default function Card({ data }) {
  return (
    <div className="card">
      <img className="card__cover" src={image} alt={`${data.product}`} />
      {data.brand && <span className="card__brand">{data.brand}</span>}

      <div className="card__info">
        <span className="card__id">{data.id}</span>
        <span className="card__price">{data.price}</span>
        <span className="card__title">{data.product}</span>
      </div>
    </div>
  );
}
