import React, { useEffect, useState } from 'react'
import Header from './components/header/Header.jsx'
import Calendar from './components/calendar/Calendar.jsx'
import Modal from './components/modal/Modal.jsx'

import {
	getWeekStartDate,
	generateWeekRange,
	roundToQuarterHour,
} from '../src/utils/dateUtils.js'

import { months } from '../src/utils/dateUtils.js'

import './common.scss'
import axios from 'axios'
import { _ } from 'core-js'

const baseUrl = 'https://658d94da7c48dce9473970f5.mockapi.io/tasks'

const App = () => {
	const [weekStartDate, setWeekStartDate] = useState(new Date())
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [events, setEvents] = useState([])
	const [initialEventData, setInitialEventData] = useState({
		data: '',
		dateFrom: '',
		dateTo: '',
	})

	useEffect(() => {
		getData()
	}, [])

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

	const handleOpenModal = (
		eventData = {
			data: '',
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
		try {
			const roundStart = roundToQuarterHour(new Date(eventData.dateFrom))
			const roundEnd = roundToQuarterHour(new Date(eventData.dateTo))

			const eventToCreate = {
				...eventData,
				dateFrom: roundStart,
				dateTo: roundEnd,
			}

			const res = await axios.post(baseUrl, eventToCreate)
			if (res.status === 201) {
				const eventDataWithDates = {
					...res.data,
					dateFrom: new Date(res.data.dateFrom),
					dateTo: new Date(res.data.dateTo),
				}
				setEvents(prevEvents => [...prevEvents, eventDataWithDates])
				handleCloseModal()
			} else {
				console.log(res.status)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const getData = async () => {
		try {
			const res = await axios.get(baseUrl)
			if (res.status === 200) {
				setEvents(
					res.data.map(elem => {
						return {
							...elem,
							dateFrom: new Date(elem.dateFrom),
							dateTo: new Date(elem.dateTo),
						}
					})
				)
			} else {
				console.log(res.status)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleDelete = async id => {
		try {
			const res = await axios.delete(`${baseUrl}/${id}`)
			if (res.status === 200) {
				setEvents(prevEvents => prevEvents.filter(event => event.id !== id))
			} else {
				console.log(res.status)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const weekDates = generateWeekRange(getWeekStartDate(weekStartDate))
	const startMonth = months[weekDates[0].getMonth()]
	const endMonth = months[weekDates[weekDates.length - 1].getMonth()]
	const navTextMonth =
		startMonth === endMonth ? startMonth : `${startMonth} - ${endMonth}`

	return (
		<>
			<Header
				onPrevWeek={handlePrevWeek}
				onNextWeek={handleNextWeek}
				onCurrentWeek={handleCurrentWeek}
				navTextMonth={navTextMonth}
				onOpenModal={() => handleOpenModal}
			/>
			<Calendar
				weekDates={weekDates}
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
