import React from 'react'
import Day from '../day/Day.jsx'

import './week.scss'

const Week = ({ weekDates, events, onDeleteEvent, onOpenModal }) => {
	return (
		<div className='calendar__week'>
			{weekDates.map(dayStart => {
				const dayEnd = new Date(dayStart.getTime()).setHours(
					dayStart.getHours() + 24
				)
				//getting all events from the day we will render
				const dayEvents = events.filter(event => {
					return event.dateFrom > dayStart && event.dateTo < dayEnd
				})
				return (
					<Day
						key={dayStart.getDate()}
						dataDay={dayStart.getDate()}
						dayStart={dayStart}
						dayEvents={dayEvents}
						onDeleteEvent={onDeleteEvent}
						onOpenModal={onOpenModal}
					/>
				)
			})}
		</div>
	)
}

export default Week
