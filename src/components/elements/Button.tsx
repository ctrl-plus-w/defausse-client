import clsx from 'clsx';
import type { MouseEventHandler, ReactNode } from 'react';

interface IProps {
  type?: 'primary' | 'outline';
  size?: 'small' | 'normal' | 'large';

  disabled?: boolean;

  htmlType?: 'submit' | 'reset' | 'button';

  onClick?: MouseEventHandler<HTMLButtonElement>;

  className?: string;

  children?: ReactNode;
}

const Button = ({ size = 'normal', type = 'primary', disabled, htmlType, onClick, className, children }: IProps) => {
  const isPrimary = type === 'primary';
  const isOutline = type === 'outline';

  const isSmall = size === 'small';
  const isNormal = size === 'normal';
  const isLarge = size === 'large';

  return (
    <button
      type={htmlType}
      className={clsx([
        'font-medium rounded border-2',

        isSmall && 'text-sm py-2 px-4',
        isNormal && 'py-2.5 px-6',
        isLarge && 'text-lg py-3 px-7',

        isPrimary &&
          (!disabled
            ? 'bg-pink-700 text-white border-transparent hover:bg-pink-600 hover:ring hover:ring-pink-200'
            : 'bg-pink-300 text-white border-transparent '),

        isOutline &&
          (!disabled
            ? 'bg-white text-pink-700 border-pink-700 hover:bg-pink-700 hover:text-white hover:ring hover:ring-pink-200'
            : 'bg-white text-pink-300 border-pink-300 '),

        disabled && 'cursor-not-allowed',

        'transition-all duration-300',
        className,
      ])}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
