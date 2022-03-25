import React from 'react';
import './PointCard.style.scss';

const PointCard = ({ point }) => {
  return (
    <div className="point-card">
      <span className="point-card__point">{point}</span>
      <span className="point-card__text">
        point{Number(point) > 1 ? 's' : null}
      </span>
    </div>
  );
};

export default PointCard;
