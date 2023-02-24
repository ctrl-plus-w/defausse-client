import clsx from 'clsx';

import type { ChangeEventHandler } from 'react';

interface IProps {
	name: string;
	label: string;

	checked?: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;

	className?: string;
}

const Checkbox = ({ name, label, checked, onChange, className }: IProps) => {
	return (
		<label
			className={clsx([
				'group flex items-center gap-2 cursor-pointer selection:appearance-none',
				className,
			])}
		>
			<input
				type="checkbox"
				name={name}
				className="hidden"
				onChange={onChange}
				checked={checked}
			/>

			<div
				className={clsx([
					'flex justify-center items-center w-4 h-4 rounded border',
					'bg-pink-200 border-pink-500',
					'group-hover:ring group-hover:ring-pink-100 transition-colors duration-300',
				])}
			>
				<div
					className={clsx([
						'w-2 h-2 rounded-sm transition-colors duration-100',
						checked && 'bg-pink-400',
					])}
				></div>
			</div>

			<span>{label}</span>
		</label>
	);
};

export default Checkbox;
