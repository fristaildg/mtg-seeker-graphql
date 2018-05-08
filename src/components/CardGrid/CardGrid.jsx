import React from 'react';
import PropTypes from 'prop-types';
import './CardGrid.css';

const CardGrid = ({children}) => (
  <div className="card-grid">
    {children}
  </div>
)

CardGrid.propTypes = {
  children: PropTypes.node
};

export default CardGrid;
