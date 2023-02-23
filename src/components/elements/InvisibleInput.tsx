import { createRef, useCallback, useEffect } from 'react';

import type {
	KeyboardEvent,
	MouseEventHandler,
	ChangeEventHandler,
	ChangeEvent,
	FocusEventHandler,
} from 'react';

import clsx from 'clsx';

interface IProps {
	value?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	onFocus?: FocusEventHandler<HTMLInputElement>;
	onBlur?: FocusEventHandler<HTMLInputElement>;
	onClick?: MouseEventHandler<HTMLInputElement>;

	textAlign?: 'center' | 'left' | 'right';

	placeholder?: string;

	className?: string;

	bottomBorder?: boolean;
	autoWidth?: boolean;
	blurOnEnter?: boolean;
	disabled?: boolean;
}

const InvisibleInput = ({
	onChange,
	onFocus,
	onBlur,
	onClick,

	className,

	value,
	placeholder,

	textAlign,

	autoWidth,
	bottomBorder,
	disabled,
	blurOnEnter = true,
}: IProps) => {
	const isTextAlignedLeft = textAlign === 'left';
	const isTextAlignedRight = textAlign === 'right';
	const isTextAlignedCenter = textAlign === 'center';

	const inputRef = createRef<HTMLInputElement>();

	const resizeInput = useCallback(() => {
		const element = inputRef.current;
		if (!element) return;

		const length =
			element.value.length == 0
				? element.placeholder.length
				: element.value.length;

		const style = window.getComputedStyle(element);
		const paddingLeft = parseInt(
			style.getPropertyValue('padding-left').slice(0, -2)
		);
		const paddingRight = parseInt(
			style.getPropertyValue('padding-right').slice(0, -2)
		);

		if (!isNaN(paddingLeft) && !isNaN(paddingRight)) {
			element.style.width =
				(length + 1) * 8 + paddingLeft + paddingRight + 'px';
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

	const _onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (blurOnEnter && inputRef.current && event.key === 'Enter')
			inputRef.current.blur();
	};

	return (
		<input
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={_onChange}
			onFocus={onFocus}
			onBlur={onBlur}
			onClick={onClick}
			onKeyDown={_onKeyDown}
			ref={inputRef}
			disabled={disabled}
			className={clsx([
				'w-8 appearance-none',
				'focus:outline-none',
				'transition-colors duration-300',
				'placeholder:font-normal',
				isTextAlignedCenter && 'text-center',
				isTextAlignedLeft && 'text-left',
				isTextAlignedRight && 'text-right',
				disabled && 'cursor-not-allowed',
				bottomBorder && 'border-b border-black focus:border-pink-700',
				className,
			])}
		/>
	);
};

export default InvisibleInput;
