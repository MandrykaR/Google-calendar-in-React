import React from 'react'
import Navigation from './../navigation/Navigation.jsx'
import Week from '../week/Week.jsx'
import Sidebar from '../sidebar/Sidebar.jsx'
import PropTypes from 'prop-types'

import './calendar.scss'

const Calendar = ({ weekDates, events, onDeleteEvent, onOpenModal }) => {
	return (
		<section className='calendar'>
			<Navigation weekDates={weekDates} />
			<div className='calendar__body'>
				<div className='calendar__week-container'>
					<Sidebar />
					<Week
						weekDates={weekDates}
						events={events}
						onDeleteEvent={onDeleteEvent}
						onOpenModal={onOpenModal}
					/>
				</div>
			</div>
		</section>
	)
}

Calendar.propTypes = {
	weekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
	events: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			dateFrom: PropTypes.instanceOf(Date).isRequired,
			dateTo: PropTypes.instanceOf(Date).isRequired,
		})
	).isRequired,
	onDeleteEvent: PropTypes.func.isRequired,
	onOpenModal: PropTypes.func.isRequired,
}

export default Calendar
