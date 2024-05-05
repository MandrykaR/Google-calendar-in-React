import React, { useState } from 'react'
import Header from './components/header/Header.jsx'
import Calendar from './components/calendar/Calendar.jsx'

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js'
import { months } from '../src/utils/dateUtils.js'

import './common.scss'
import Modal from './components/modal/Modal.jsx'

const App = () => {
	const [weekStartDate, setWeekStartDate] = useState(new Date())
	const [isModalOpen, setIsModalOpen] = useState(false)

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

	const handleCurrentWeek = () => {
		setWeekStartDate(new Date())
	}

	const handleOpenModal = () => {
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	const weekDates = generateWeekRange(getWeekStartDate(weekStartDate))
	const startMouth = months[weekDates[0].getMonth()]
	const endMouth = months[weekDates[weekDates.length - 1].getMonth()]

	const navTextMouth =
		startMouth === endMouth ? startMouth : `${startMouth} - ${endMouth}`

	return (
		<>
			<Header
				onPrevWeek={handlePrevWeek}
				onNextWeek={handleNextWeek}
				onCurrentWeek={handleCurrentWeek}
				navTextMouth={navTextMouth}
				onOpenModel={handleOpenModal}
			/>
			<Calendar weekDates={weekDates} />
			{isModalOpen && <Modal onClose={handleCloseModal} />}
		</>
	)
}

export default App
