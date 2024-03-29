/**
 * Return whether the object is empty or not
 * @param obj The object to check
 * @returns A boolean
 */
export const isEmptyObj = (obj: object): boolean => {
	return Object.keys(obj).length === 0;
};
