import React from 'react'
import './navigation.scss'

import { days } from '../../utils/dateUtils.js'

const Navigation = ({ weekDates }) => {
	return (
		<header className='calendar__header'>
			{weekDates.map(dayDate => (
				<div className='calendar__day-label day-label '>
					<span className='day-label__day-name'>{days[dayDate.getDay()]}</span>
					<span
						className={`day-label__day-number ${
							isCurrentDay(dayDate) ? 'current-day' : ''
						}`}
					>
						{dayDate.getDate()}
					</span>
				</div>
			))}
		</header>
	)
}

const isCurrentDay = date => {
	const currentDate = new Date()
	return (
		date.getDate() === currentDate.getDate() &&
		date.getMonth() === currentDate.getMonth() &&
		date.getFullYear() === currentDate.getFullYear()
	)
}

export default Navigation
