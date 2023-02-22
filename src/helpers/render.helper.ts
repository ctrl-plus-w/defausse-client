import { ReactNode } from 'react';

/**
 * Render a date
 * @param date The date to render
 * @returns A string
 */
export const renderDate = (date: Date): ReactNode | string => {
  return date.toLocaleString();
};
