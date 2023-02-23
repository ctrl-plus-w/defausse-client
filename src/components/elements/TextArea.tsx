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

	onChange?: ChangeEventHandler<HTMLTextAreaElement>;
	onFocus?: FocusEventHandler<HTMLTextAreaElement>;
	onBlur?: FocusEventHandler<HTMLTextAreaElement>;

	blurOnEnter?: boolean;

	rows?: number;

	className?: string;
}

const TextArea = ({
	name,
	label,
	rows,
	value,
	placeholder,
	onChange,
	onFocus,
	onBlur,
	className,
	blurOnEnter = true,
}: IProps) => {
	const textAreaRef = createRef<HTMLTextAreaElement>();

	const _onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (blurOnEnter && textAreaRef.current && event.key === 'Enter')
			textAreaRef.current.blur();
	};

	return (
		<label htmlFor={name} className={clsx(['flex flex-col gap-4', className])}>
			<span className="font-semibold text-slate-900">{label}</span>
			<textarea
				name={name}
				className={clsx([
					'border border-slate-800 rounded-sm p-3 box-border',
					'focus:outline-none focus:border-pink-700 focus:ring focus:ring-pink-200',
					'hover:border-pink-700',
					'transition-colors duration-300',
				])}
				ref={textAreaRef}
				rows={rows}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				onKeyDown={_onKeyDown}
				onFocus={onFocus}
				onBlur={onBlur}
			></textarea>
		</label>
	);
};

export default TextArea;
