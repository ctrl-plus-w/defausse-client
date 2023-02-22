import { createRef, useCallback, useEffect } from 'react';

import type { ChangeEventHandler, ChangeEvent, FocusEventHandler } from 'react';

import clsx from 'clsx';

interface IProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;

  textAlign?: 'center' | 'left' | 'right';

  placeholder?: string;

  className?: string;

  bottomBorder?: boolean;
  autoWidth?: boolean;
}

const InvisibleInput = ({ onChange, onFocus, onBlur, className, placeholder, value, autoWidth, bottomBorder, textAlign }: IProps) => {
  const isTextAlignedLeft = textAlign === 'left';
  const isTextAlignedRight = textAlign === 'right';
  const isTextAlignedCenter = textAlign === 'center';

  const inputRef = createRef<HTMLInputElement>();

  const resizeInput = useCallback(() => {
    const element = inputRef.current;
    if (!element) return;

    const length = element.value.length == 0 ? element.placeholder.length : element.value.length;

    const style = window.getComputedStyle(element);
    const paddingLeft = parseInt(style.getPropertyValue('padding-left').slice(0, -2));
    const paddingRight = parseInt(style.getPropertyValue('padding-right').slice(0, -2));

    if (!isNaN(paddingLeft) && !isNaN(paddingRight)) {
      element.style.width = (length + 1) * 8 + paddingLeft + paddingRight + 'px';
    } else {
      element.style.width = (length + 1) * 8 + 'px';
    }
  }, [inputRef]);

  useEffect(() => {
    if (autoWidth) resizeInput();
  }, [autoWidth, resizeInput]);

  const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (autoWidth) resizeInput();
    if (onChange) onChange(event);
  };

  return (
    <input
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={_onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      ref={inputRef}
      className={clsx([
        'w-8 appearance-none cursor-pointer',
        'focus:outline-none',
        'transition-colors duration-300',
        'placeholder:font-normal',
        isTextAlignedCenter && 'text-center',
        isTextAlignedLeft && 'text-left',
        isTextAlignedRight && 'text-right',
        bottomBorder && 'border-b border-black focus:border-pink-700',
        className,
      ])}
    />
  );
};

export default InvisibleInput;