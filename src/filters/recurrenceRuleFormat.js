/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { translate as t, translatePlural as n, getDayNames, getMonthNames } from '@nextcloud/l10n'
import moment from '@nextcloud/moment'

/**
 * Formats a recurrence-rule
 *
 * @param {object} recurrenceRule The recurrence-rule to format
 * @param {string} locale The locale to format it into
 * @return {string}
 */
export default (recurrenceRule, locale) => {
	if (recurrenceRule.frequency === 'NONE') {
		return t('calendar', 'Does not repeat')
	}

	let freqPart = ''
	if (recurrenceRule.interval === 1) {
		switch (recurrenceRule.frequency) {
		case 'DAILY':
			freqPart = t('calendar', 'Daily')
			break

		case 'WEEKLY':
			freqPart = t('calendar', 'Weekly')
			break

		case 'MONTHLY':
			freqPart = t('calendar', 'Monthly')
			break

		case 'YEARLY':
			freqPart = t('calendar', 'Yearly')
			break
		}
	} else {
		switch (recurrenceRule.frequency) {
		case 'DAILY':
			freqPart = n('calendar', 'Every %n day', 'Every %n days', recurrenceRule.interval)
			break

		case 'WEEKLY':
			freqPart = n('calendar', 'Every %n week', 'Every %n weeks', recurrenceRule.interval)
			break

		case 'MONTHLY':
			freqPart = n('calendar', 'Every %n month', 'Every %n months', recurrenceRule.interval)
			break

		case 'YEARLY':
			freqPart = n('calendar', 'Every %n year', 'Every %n years', recurrenceRule.interval)
			break
		}
	}

	let limitPart = ''
	if (recurrenceRule.frequency === 'WEEKLY' && recurrenceRule.byDay.length !== 0) {
		const formattedDays = getTranslatedByDaySet(recurrenceRule.byDay)

		limitPart = n('calendar', 'on {weekday}', 'on {weekdays}', recurrenceRule.byDay.length, {
			weekday: formattedDays,
			weekdays: formattedDays,
		})
	} else if (recurrenceRule.frequency === 'MONTHLY') {
		if (recurrenceRule.byMonthDay.length !== 0) {
			const dayOfMonthList = recurrenceRule.byMonthDay.join(', ')

			limitPart = n('calendar', 'on day {dayOfMonthList}', 'on days {dayOfMonthList}', recurrenceRule.byMonthDay.length, {
				dayOfMonthList,
			})
		} else {
			const ordinalNumber = getTranslatedOrdinalNumber(recurrenceRule.bySetPosition)
			const byDaySet = getTranslatedByDaySet(recurrenceRule.byDay)

			limitPart = t('calendar', 'on the {ordinalNumber} {byDaySet}', {
				ordinalNumber,
				byDaySet,
			})
		}
	} else if (recurrenceRule.frequency === 'YEARLY') {
		const monthNames = getTranslatedMonths(recurrenceRule.byMonth)

		if (recurrenceRule.byMonthDay.length !== 0) {
			const dayOfMonthList = recurrenceRule.byMonthDay.join(', ')

			limitPart = t('calendar', 'in {monthNames} on the {dayOfMonthList}', {
				monthNames,
				dayOfMonthList,
			})
		} else {
			const ordinalNumber = getTranslatedOrdinalNumber(recurrenceRule.bySetPosition)
			const byDaySet = getTranslatedByDaySet(recurrenceRule.byDay)

			limitPart = t('calendar', 'in {monthNames} on the {ordinalNumber} {byDaySet}', {
				monthNames,
				ordinalNumber,
				byDaySet,
			})
		}
	}

	let endPart = ''
	if (recurrenceRule.until !== null) {
		const untilDate = moment(recurrenceRule.until).locale(locale).format('L')

		endPart = t('calendar', 'until {untilDate}', {
			untilDate,
		})
	} else if (recurrenceRule.count !== null) {
		endPart = n('calendar', '%n time', '%n times', recurrenceRule.count)
	}

	return [
		freqPart,
		limitPart,
		endPart,
	].join(' ').replace(/\s{2,}/g, ' ').trim()
}

/**
 * Gets the byDay list as formatted list of translated weekdays
 *
 * @param {string[]} byDayList The by-day-list to get formatted
 * @return {string}
 */
function getTranslatedByDaySet(byDayList) {
	const byDayNames = []
	const allByDayNames = getDayNames()

	// TODO: This should be sorted by first day of week
	// TODO: This should summarise:
	//  - SA, SU to weekend
	//  - MO, TU, WE, TH, FR to weekday
	//  - MO, TU, WE, TH, FR, SA, SU to day

	if (byDayList.includes('MO')) {
		byDayNames.push(allByDayNames[1])
	}
	if (byDayList.includes('TU')) {
		byDayNames.push(allByDayNames[2])
	}
	if (byDayList.includes('WE')) {
		byDayNames.push(allByDayNames[3])
	}
	if (byDayList.includes('TH')) {
		byDayNames.push(allByDayNames[4])
	}
	if (byDayList.includes('FR')) {
		byDayNames.push(allByDayNames[5])
	}
	if (byDayList.includes('SA')) {
		byDayNames.push(allByDayNames[6])
	}
	if (byDayList.includes('SU')) {
		byDayNames.push(allByDayNames[0])
	}

	return byDayNames.join(', ')
}

/**
 * Gets the byMonth list as formatted list of translated month-names
 *
 *
 * @param {string[]} byMonthList The by-month list to get formatted
 * @return {string}
 */
function getTranslatedMonths(byMonthList) {
	const sortedByMonth = byMonthList.slice().map((n) => parseInt(n, 10))
	sortedByMonth.sort((a, b) => a - b)

	const monthNames = []
	const allMonthNames = getMonthNames()

	for (const month of sortedByMonth) {
		monthNames.push(allMonthNames[month - 1])
	}

	return monthNames.join(', ')
}

/**
 * Gets the translated ordinal number for by-set-position
 *
 * @param {number} bySetPositionNum The by-set-position number to get the translation of
 * @return {string}
 */
export function getTranslatedOrdinalNumber(bySetPositionNum) {
	switch (bySetPositionNum) {
	case 1:
		return t('calendar', 'first')

	case 2:
		// TRANSLATORS This refers to the second item in a series, not to the unit of time
		return t('calendar', 'second')

	case 3:
		return t('calendar', 'third')

	case 4:
		return t('calendar', 'fourth')

	case 5:
		return t('calendar', 'fifth')

	case -2:
		return t('calendar', 'second to last')

	case -1:
		return t('calendar', 'last')

	default:
		return ''
	}
}
