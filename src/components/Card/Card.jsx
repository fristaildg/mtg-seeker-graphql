import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Card.css';

const Card = ({data}) => (
  <div className={`card-container ${classNames(data.colors.map(color => {
    const identifier = color.identifier;
    return identifier;
  }))}`}>
    <section className="card-header">
      <h2 className="card-name">
        {data.name}
      </h2>
      <span className="card-cmc">
        {data.cmc}
      </span>    
    </section>
    <section className="card-info">
      <span className="card-type">
        {data.cardType}
      </span>
      <p className="card-text">
        {data.text}
      </p>
    </section>
    <section className="card-footer">
      <span className="card-artist-name">
        {data.artist.identifier}
      </span>
    </section>
  </div> 
)

Card.propTypes = {
  data: PropTypes.object
}

export default Card;
