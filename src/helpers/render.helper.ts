import { ReactNode } from 'react';

export const renderDate = (date: Date): ReactNode | string => {
  return date.toLocaleString();
};
