import React, { useState } from 'react'

import './modal.scss'

const Modal = ({ onEventCreate, onClose }) => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		date: '',
		dateFrom: '',
		dateTo: '',
	})

	const handleChange = e => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = e => {
		e.preventDefault()

		const eventDateSplit = formData.date.split('-')
		const eventDateFrom = formData.dateFrom.split(':')
		const eventDateTo = formData.dateTo.split(':')

		const hourFrom = Number(eventDateFrom[0])
		const minuteFrom = Number(eventDateFrom[1])

		const hourTo = Number(eventDateTo[0])
		const minuteTo = Number(eventDateTo[1])

		const year = Number(eventDateSplit[0])
		const months = Number(eventDateSplit[1] - 1)
		const day = Number(eventDateSplit[2])

		const createEventData = {
			title: formData.title,
			description: formData.description,
			dateFrom: new Date(year, months, day, hourFrom, minuteFrom),
			dateTo: new Date(year, months, day, hourTo, minuteTo),
		}

		// Pass the form data back to the parent component
		onEventCreate(createEventData)
	}

	return (
		<div className='modal overlay'>
			<div className='modal__content'>
				<div className='create-event'>
					<button className='create-event__close-btn' onClick={onClose}>
						+
					</button>
					<form className='event-form' onSubmit={handleSubmit}>
						<input
							type='text'
							name='title'
							value={formData.title}
							placeholder='Title'
							className='event-form__field'
							onChange={handleChange}
						/>
						<div className='event-form__time'>
							<input
								type='date'
								name='date'
								className='event-form__field'
								value={formData.date}
								onChange={handleChange}
							/>
							<input
								value={formData.dateFrom}
								type='time'
								name='dateFrom'
								className='event-form__field'
								onChange={handleChange}
							/>
							<span>-</span>
							<input
								type='time'
								name='dateTo'
								className='event-form__field'
								onChange={handleChange}
								value={formData.dateTo}
							/>
						</div>
						<textarea
							name='description'
							value={formData.description}
							onChange={handleChange}
							placeholder='Description'
							className='event-form__field'
						></textarea>
						<button type='submit' className='event-form__submit-btn'>
							Create
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Modal
