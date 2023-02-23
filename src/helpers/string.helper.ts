/**
 * Truncate the string
 * @param str The string to truncate
 * @param maxLength The max length of the final string
 * @returns A string
 */
export const truncate = (str: string, maxLength: number) => {
	if (str.length > maxLength) {
		return str.slice(0, maxLength - 3) + '...';
	}

	return str;
};

/**
 * Check if the string is a number
 * @param str The string to check
 * @returns A boolean
 */
export const isNum = (str: string): boolean => {
	return new RegExp('^[0-9]+$').test(str);
};

/**
 * Check if the string is empty
 * @param str The string to check
 * @returns A boolean
 */
export const isEmptyStr = (str: string): boolean => {
	return str === '';
};
