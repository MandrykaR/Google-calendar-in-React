import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({
  onPrevWeek,
  onNextWeek,
  onCurrentWeek,
  onOpenModal,
  navTextMonth,
}) => {
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={onOpenModal}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={onCurrentWeek}
        >
          Today
        </button>
        <button className="icon-button navigation__nav-icon">
          <i className="fas fa-chevron-left" onClick={onPrevWeek}></i>
        </button>
        <button className="icon-button navigation__nav-icon">
          <i className="fas fa-chevron-right" onClick={onNextWeek}></i>
        </button>
        <span className="navigation__displayed-month">{navTextMonth}</span>
      </div>
    </header>
  );
};

Header.propTypes = {
  onPrevWeek: PropTypes.func.isRequired,
  onNextWeek: PropTypes.func.isRequired,
  onCurrentWeek: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  navTextMonth: PropTypes.string.isRequired,
};

export default Header;
