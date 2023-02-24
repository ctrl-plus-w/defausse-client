import { createRef } from 'react';

import type {
	ChangeEventHandler,
	FocusEventHandler,
	KeyboardEvent,
} from 'react';

import clsx from 'clsx';

interface IProps {
	name: string;
	label: string;

	value?: string;
	placeholder?: string;

	onChange?: ChangeEventHandler<HTMLInputElement>;
	onFocus?: FocusEventHandler<HTMLInputElement>;
	onBlur?: FocusEventHandler<HTMLInputElement>;

	blurOnEnter?: boolean;

	className?: string;
}

const Input = ({
	name,
	placeholder,
	label,
	value,
	onChange,
	onFocus,
	onBlur,
	className,
	blurOnEnter = true,
}: IProps) => {
	const inputRef = createRef<HTMLInputElement>();

	const _onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (blurOnEnter && inputRef.current && event.key === 'Enter')
			inputRef.current.blur();
	};

	return (
		<label htmlFor={name} className={clsx(['flex flex-col gap-4', className])}>
			<span className="font-semibold text-slate-900">{label}</span>
			<input
				id={name}
				name={name}
				className={clsx([
					'border border-slate-800 rounded-sm px-3 py-2 box-border',
					'focus:outline-none focus:border-pink-700 focus:ring focus:ring-pink-200',
					'hover:border-pink-700',
					'transition-colors duration-300',
					className,
				])}
				ref={inputRef}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				onKeyDown={_onKeyDown}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		</label>
	);
};

export default Input;
