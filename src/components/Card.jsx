import React from 'react';
import './Card.scss';

const Card = ({ profile, event, onMouseDown, onTouchStart  }) => {
  return (
    <div className="demo__card" onMouseDown={onMouseDown} onTouchStart={onTouchStart}>
        <div className="demo__card__top" style={{ backgroundImage: 'url(' + profile.image + ')' }}>
            <p className="demo__card__name">{profile.name}</p>
            <div className="demo__card__choice m--reject">{event !== '' ? event.left.text : '' }</div>
            <div className="demo__card__choice m--like">{event !== '' ? event.right.text : '' }</div>
        </div>
        <div className="demo__card__drag"></div>
    </div>
  );
};

export default Card;