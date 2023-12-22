import { isPlainObject } from 'typechecker'

/** Trim nested keys which values are nullish, empty strings, or zero-length arrays, sets, maps, and plain objects */
export function trimEmptyKeys(obj: any) {
	if (!isPlainObject(obj)) return obj
	for (const [key, value] of Object.entries(obj)) {
		if (
			value == null ||
			value === '' ||
			(Array.isArray(value) && value.length === 0) ||
			(value instanceof Set && value.size === 0) ||
			(value instanceof Map && value.size === 0)
		) {
			delete obj[key]
		} else if (isPlainObject(value)) {
			if (Object.keys(trimEmptyKeys(obj[key])).length === 0) delete obj[key]
		}
	}
	return obj
}
export default trimEmptyKeys

/** Trim nested keys which values are nullish and zero-length plain objects */
export function trimNullishKeys(obj: any) {
	if (!isPlainObject(obj)) return obj
	for (const [key, value] of Object.entries(obj)) {
		if (value == null) {
			delete obj[key]
		} else if (isPlainObject(value)) {
			if (Object.keys(trimNullishKeys(obj[key])).length === 0) delete obj[key]
		}
	}
	return obj
}

/** Trim nested keys which values are falsely and zero-length plain objects */
export function trimFalseyKeys(obj: any) {
	if (!isPlainObject(obj)) return obj
	for (const [key, value] of Object.entries(obj)) {
		if (!value) {
			delete obj[key]
		} else if (isPlainObject(value)) {
			if (Object.keys(trimFalseyKeys(obj[key])).length === 0) delete obj[key]
		}
	}
	return obj
}
