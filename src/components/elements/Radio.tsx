import clsx from 'clsx';

import type { ChangeEventHandler } from 'react';

interface IProps {
	name: string;
	label: string;

	value?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;

	fields: { name: string; key: string }[];

	className?: string;
}

const Radio = ({ label, name, onChange, fields, value, className }: IProps) => {
	return (
		<div className={clsx(['flex flex-col gap-4', className])}>
			<span className="font-semibold text-slate-900">{label}</span>

			<div className="flex flex-col gap-2">
				{fields.map(({ name: _name, key }, index) => (
					<label
						key={index}
						className="flex items-center gap-2 cursor-pointer selection:appearance-none"
					>
						<input
							type="radio"
							name={name}
							value={_name}
							onChange={onChange}
							className="hidden"
						/>

						<div className="flex justify-center items-center w-4 h-4 rounded-full border border-pink-700 bg-pink-200">
							<div
								className={clsx([
									'w-2 h-2 rounded-full',
									key === value && 'bg-pink-400',
								])}
							></div>
						</div>

						<span>{_name}</span>
					</label>
				))}
			</div>
		</div>
	);
};

export default Radio;
