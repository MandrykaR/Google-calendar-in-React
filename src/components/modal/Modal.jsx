import React, { useState } from 'react'
import axios from 'axios'

import './modal.scss'

const Modal = ({ onClose }) => {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		date: '',
		startTime: '',
		endTime: '',
	})


	const handleChange = e => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const res = await axios.post(
				'https://658d94da7c48dce9473970f5.mockapi.io/tasks',
				formData
			)

			if (res.status === 201) {
				res.data
			} else {
				console.log(res.status)
			}
		} catch (error) {
			console.log(error)
		}
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
								value={formData.startTime}
								type='time'
								name='startTime'
								className='event-form__field'
								onChange={handleChange}
							/>
							<span>-</span>
							<input
								type='time'
								name='endTime'
								className='event-form__field'
								onChange={handleChange}
								value={formData.endTime}
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
