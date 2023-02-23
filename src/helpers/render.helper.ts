import { ReactNode } from 'react';

/**
 * Render a date
 * @param date The date to render
 * @returns A string
 */
export const renderDate = (date: string | number): ReactNode | string => {
	return typeof date === 'string' ? new Date(date).toLocaleString() : date;
};
