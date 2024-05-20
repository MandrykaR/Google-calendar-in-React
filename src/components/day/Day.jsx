import React from 'react'
import Hour from '../hour/Hour'
import CurrentTimeIndicator from '../CurrentTimeIndicator/CurrentTimeIndicator.jsx'

import './day.scss'

const Day = ({ dataDay, dayEvents, onDeleteEvent }) => {
	const hours = Array(24)
		.fill()
		.map((val, index) => index)

	return (
		<div className='calendar__day' data-day={dataDay}>
			{dataDay === new Date().getDate() && <CurrentTimeIndicator />}
			{hours.map(hour => {
				//getting all events from the day we will render
				const hourEvents = dayEvents.filter(
					event => event.dateFrom.getHours() === hour
				)

				return (
					<Hour
						key={dataDay + hour}
						dataHour={hour}
						hourEvents={hourEvents}
						onDeleteEvent={onDeleteEvent}
					/>
				)
			})}
		</div>
	)
}

export default Day
