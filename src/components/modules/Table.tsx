import type { ReactNode } from 'react';

import clsx from 'clsx';

type ColumnDefinition<T, K extends keyof T> = {
	label: string;
	dataKey: K;
	render?: (object: T[K]) => ReactNode;
};

interface IProps<T, K extends keyof T> {
	className?: string;

	columns: ColumnDefinition<T, K>[];
	data: T[];

	onClick?: (row: T) => void;
}

const Table = <T, K extends keyof T>({
	columns,
	data,
	onClick,
	className,
}: IProps<T, K>) => {
	return (
		<table
			className={clsx([
				'table-auto overflow-hidden rounded-sm border border-slate-200 border-separate border-spacing-0',
				className,
			])}
		>
			<thead>
				<tr>
					{columns.map(({ label }, index) => (
						<th
							key={label + index}
							className="text-left font-medium bg-gray-200 px-4 py-2"
						>
							{label}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, index) => (
					<tr
						key={index}
						className="group hover:bg-pink-200 transition-all duration-300 cursor-pointer"
						onClick={() => onClick && onClick(row)}
					>
						{columns.map(({ label, dataKey, render }, index) => (
							<td
								key={label + index}
								className="text-slate-700 group-hover:text-pink-800 transition-all duration-300 px-4 py-2"
							>
								{render ? render(row[dataKey]) : (row[dataKey] as ReactNode)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
