import React from 'react'

import Event from '../event/Event.jsx'
import { formatMins } from '../../../src/utils/dateUtils.js'

import './hour.scss'

const Hour = ({
	dataHour,
	hourEvents,
	onDeleteEvent,
	onOpenModal,
	dataDay,
}) => {
	const handleClick = () => {
		const date = new Date(dataDay)
		date.setHours(dataHour, 0, 0, 0)
		const dateFrom = date.toISOString().slice(0, 16)
		date.setHours(dataHour + 1, 0, 0, 0)
		const dateTo = date.toISOString().slice(0, 16)

		onOpenModal({
			title: '',
			description: '',
			date: dateFrom.slice(0, 10),
			dateFrom: dateFrom.slice(11),
			dateTo: dateTo.slice(11),
		})
	}

	return (
		<div
			className='calendar__time-slot'
			data-time={dataHour + 1}
			onClick={handleClick}
		>
			{hourEvents.map(({ id, dateFrom, dateTo, title }) => {
				const eventStart = `${dateFrom.getHours()}:${formatMins(
					dateFrom.getMinutes()
				)}`
				const eventEnd = `${dateTo.getHours()}:${formatMins(
					dateTo.getMinutes()
				)}`

				return (
					<Event
						key={id}
						id={id}
						//calculating event height = duration of event in minutes
						height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
						marginTop={dateFrom.getMinutes()}
						time={`${eventStart} - ${eventEnd}`}
						title={title}
						onDeleteEvent={onDeleteEvent}
					/>
				)
			})}
		</div>
	)
}

export default Hour
