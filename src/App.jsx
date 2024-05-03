import React, { useState } from 'react'
import Header from './components/header/Header.jsx'
import Calendar from './components/calendar/Calendar.jsx'

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js'

import './common.scss'

const App = () => {
	const [weekStartDate, setWeekStartDate] = useState(new Date())

	const handlePrevWeek = () => {
		setWeekStartDate(
			prevStateDate =>
				new Date(prevStateDate.getTime() - 7 * 24 * 60 * 60 * 1000)
		)
	}

	const handleNextWeek = () => {
		setWeekStartDate(
			prevStateDate =>
				new Date(prevStateDate.getTime() + 7 * 24 * 60 * 60 * 1000)
		)
	}

	const weekDates = generateWeekRange(getWeekStartDate(weekStartDate))

	return (
		<>
			<Header onPrevWeek={handlePrevWeek} onNextWeek={handleNextWeek} />
			<Calendar weekDates={weekDates} />
		</>
	)
}

export default App
