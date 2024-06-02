import { roundToQuarterHour } from './dateUtils.js'

export const validateEvent = (eventData, events) => {
	if (eventData.title === '') {
		return 'Please enter the title'
	}

	const startDateTime = new Date(`${eventData.date}${eventData.dateFrom}`)
	const endDateTime = new Date(`${eventData.date}${eventData.dateTo}`)

	if (startDateTime >= endDateTime) {
		return 'End time must be after start time.'
	}

	const eventDuration = (endDateTime - startDateTime) / (1000 * 60 * 60)
	if (eventDuration > 6) {
		return 'Event duration cannot be longer than 6 hours.'
	}

	const isOverlap = events.some(event => {
		const existingStart = new Date(event.dateFrom)
		const existingEnd = new Date(event.dateTo)
		return startDateTime < existingEnd && endDateTime > existingStart
	})

	if (isOverlap) {
		return 'Event time overlaps with an existing event.'
	}

	return null
}

export const prepareEventData = eventData => {
	const roundStart = roundToQuarterHour(new Date(eventData.dateFrom))
	const roundEnd = roundToQuarterHour(new Date(eventData.dateTo))

	return {
		...eventData,
		dateFrom: roundStart,
		dateTo: roundEnd,
	}
}
