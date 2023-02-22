import clsx from 'clsx';
import { ChangeEventHandler } from 'react';

interface IProps {
  name: string;
  label: string;

  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;

  rows?: number;

  className?: string;
}

const TextArea = ({ name, label, rows, value, onChange, className }: IProps) => {
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
      ></textarea>
    </label>
  );
};

export default TextArea;
