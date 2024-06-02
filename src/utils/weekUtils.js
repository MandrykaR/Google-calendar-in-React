import { getWeekStartDate, generateWeekRange } from './dateUtils.js'
import { months } from './dateUtils.js'

export const getWeekNavigationText = weekStartDate => {
	const weekDates = generateWeekRange(getWeekStartDate(weekStartDate))
	const startMonth = months[weekDates[0].getMonth()]
	const endMonth = months[weekDates[weekDates.length - 1].getMonth()]
	return startMonth === endMonth ? startMonth : `${startMonth} - ${endMonth}`
}

export const getNextWeek = prevStateDate =>
	new Date(prevStateDate.getTime() + 7 * 24 * 60 * 60 * 1000)

export const getPrevWeek = prevStateDate =>
	new Date(prevStateDate.getTime() - 7 * 24 * 60 * 60 * 1000)
