import React, { useEffect, useState } from 'react'
import Header from './components/header/Header.jsx'
import Calendar from './components/calendar/Calendar.jsx'
import Modal from './components/modal/Modal.jsx'
import {
	getWeekNavigationText,
	getNextWeek,
	getPrevWeek,
} from './utils/weekUtils.js'
import { fetchEvents, createEvent, deleteEvent } from './utils/api.js'
import { validateEvent, prepareEventData } from './utils/eventUtils.js'
import { generateWeekRange, getWeekStartDate } from './utils/dateUtils.js'
import './common.scss'

const App = () => {
	const [weekStartDate, setWeekStartDate] = useState(new Date())
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [events, setEvents] = useState([])
	const [initialEventData, setInitialEventData] = useState({
		date: '',
		dateFrom: '',
		dateTo: '',
	})

	useEffect(() => {
		const loadData = async () => {
			try {
				const events = await fetchEvents()
				setEvents(events)
			} catch (error) {
				console.log(error)
			}
		}
		loadData()
	}, [])

	const handlePrevWeek = () => {
		setWeekStartDate(getPrevWeek)
	}

	const handleNextWeek = () => {
		setWeekStartDate(getNextWeek)
	}

	const handleCurrentWeek = () => {
		setWeekStartDate(new Date())
	}

	const handleOpenModal = (
		eventData = {
			date: '',
			title: '',
			description: '',
			dateFrom: '',
			dateTo: '',
		}
	) => {
		setInitialEventData(eventData)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	const handleEventCreate = async eventData => {
		const errorMessage = validateEvent(eventData, events)
		if (errorMessage) {
			alert(errorMessage)
			return
		}

		try {
			const preparedEventData = prepareEventData(eventData)
			const newEvent = await createEvent(preparedEventData)
			setEvents(prevEvents => [...prevEvents, newEvent])
			handleCloseModal()
		} catch (error) {
			console.log(error)
		}
	}

	const handleDelete = async id => {
		try {
			const now = new Date()
			const eventToDelete = events.find(event => event.id === id)
			const eventStartTime = new Date(eventToDelete.dateFrom)
			const timeDiff = (eventStartTime - now) / (1000 * 60)

			if (timeDiff <= 15) {
				alert(
					'You cannot delete an event less than 15 minutes before it starts.'
				)
				return
			}

			await deleteEvent(id)
			setEvents(prevEvents => prevEvents.filter(event => event.id !== id))
		} catch (error) {
			console.log(error)
		}
	}

	const navTextMonth = getWeekNavigationText(weekStartDate)
	return (
		<>
			<Header
				onPrevWeek={handlePrevWeek}
				onNextWeek={handleNextWeek}
				onCurrentWeek={handleCurrentWeek}
				navTextMonth={navTextMonth}
				onOpenModal={handleOpenModal}
			/>
			<Calendar
				weekDates={generateWeekRange(getWeekStartDate(weekStartDate))}
				events={events}
				onDeleteEvent={handleDelete}
				onOpenModal={handleOpenModal}
			/>
			{isModalOpen && (
				<Modal
					onEventCreate={handleEventCreate}
					onClose={handleCloseModal}
					initialEventData={initialEventData}
				/>
			)}
		</>
	)
}

export default App
