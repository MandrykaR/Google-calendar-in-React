import React from 'react';
import PropTypes from 'prop-types';
import {
  getNextWeek,
  getPrevWeek,
  getWeekNavigationText,
} from '../../utils/weekUtils';
import './header.scss';

const Header = ({ onOpenModal, weekStartDate, setWeekStartDate }) => {
  const handlePrevWeek = () => {
    setWeekStartDate(getPrevWeek(weekStartDate));
  };

  const handleNextWeek = () => {
    setWeekStartDate(getNextWeek(weekStartDate));
  };

  const handleCurrentWeek = () => {
    setWeekStartDate(new Date());
  };

  const navTextMonth = getWeekNavigationText(weekStartDate);

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={onOpenModal}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={handleCurrentWeek}
        >
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={handlePrevWeek}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={handleNextWeek}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{navTextMonth}</span>
      </div>
    </header>
  );
};

Header.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  weekStartDate: PropTypes.instanceOf(Date).isRequired,
  setWeekStartDate: PropTypes.func.isRequired,
};

export default Header;
