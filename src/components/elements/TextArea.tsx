import clsx from 'clsx';
import { ChangeEventHandler, FocusEventHandler } from 'react';

interface IProps {
  name: string;
  label: string;

  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;

  rows?: number;

  className?: string;
}

const TextArea = ({ name, label, rows, value, onChange, onFocus, onBlur, className }: IProps) => {
  return (
    <label htmlFor={name} className={clsx(['flex flex-col gap-4', className])}>
      <span className='font-semibold text-slate-900'>{label}</span>
      <textarea
        name={name}
        className={clsx([
          'border border-slate-800 rounded-sm p-3 box-border',
          'focus:outline-none focus:border-pink-700 focus:ring focus:ring-pink-200',
          'hover:border-pink-700',
          'transition-colors duration-300',
          className,
        ])}
        rows={rows}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      ></textarea>
    </label>
  );
};

export default TextArea;
