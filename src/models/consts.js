/**
 * SPDX-FileCopyrightText: 2020 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
const COMPONENT_NAME_EVENT = 'VEVENT'
const COMPONENT_NAME_JOURNAL = 'VJOURNAL'
const COMPONENT_NAME_VTODO = 'VTODO'

const ITIP_MESSAGE_ADD = 'ADD'
const ITIP_MESSAGE_CANCEL = 'CANCEL'
const ITIP_MESSAGE_COUNTER = 'COUNTER'
const ITIP_MESSAGE_DECLINECOUNTER = 'DECLINECOUNTER'
const ITIP_MESSAGE_PUBLISH = 'PUBLISH'
const ITIP_MESSAGE_REFRESH = 'REFRESH'
const ITIP_MESSAGE_REPLY = 'REPLY'
const ITIP_MESSAGE_REQUEST = 'REQUEST'

const PRINCIPAL_PREFIX_USER = 'principal:principals/users/'
const PRINCIPAL_PREFIX_GROUP = 'principal:principals/groups/'
const PRINCIPAL_PREFIX_CIRCLE = 'principal:principals/circles/'
const PRINCIPAL_PREFIX_CALENDAR_RESOURCE = 'principal:principals/calendar-resources/'
const PRINCIPAL_PREFIX_CALENDAR_ROOM = 'principal:principals/calendar-rooms/'

const CALDAV_BIRTHDAY_CALENDAR = 'contact_birthdays'
const CALDAV_PERSONAL_CALENDAR = 'personal'

const IMPORT_STAGE_DEFAULT = 'default'
const IMPORT_STAGE_IMPORTING = 'importing'
const IMPORT_STAGE_AWAITING_USER_SELECT = 'awaitingUserSelect'
const IMPORT_STAGE_PROCESSING = 'processing'

export {
	COMPONENT_NAME_EVENT,
	COMPONENT_NAME_JOURNAL,
	COMPONENT_NAME_VTODO,
	ITIP_MESSAGE_ADD,
	ITIP_MESSAGE_CANCEL,
	ITIP_MESSAGE_COUNTER,
	ITIP_MESSAGE_DECLINECOUNTER,
	ITIP_MESSAGE_PUBLISH,
	ITIP_MESSAGE_REFRESH,
	ITIP_MESSAGE_REPLY,
	ITIP_MESSAGE_REQUEST,
	PRINCIPAL_PREFIX_USER,
	PRINCIPAL_PREFIX_GROUP,
	PRINCIPAL_PREFIX_CIRCLE,
	PRINCIPAL_PREFIX_CALENDAR_RESOURCE,
	PRINCIPAL_PREFIX_CALENDAR_ROOM,
	CALDAV_BIRTHDAY_CALENDAR,
	CALDAV_PERSONAL_CALENDAR,
	IMPORT_STAGE_DEFAULT,
	IMPORT_STAGE_IMPORTING,
	IMPORT_STAGE_AWAITING_USER_SELECT,
	IMPORT_STAGE_PROCESSING,
}
