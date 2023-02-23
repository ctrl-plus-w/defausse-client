import clsx from 'clsx';
import { ReactNode } from 'react';

interface BreadcrumbItem {
	label: string;
	href?: string;
}

interface IProps {
	className?: string;

	items: BreadcrumbItem[];
}

const Breadcrumb = ({ items, className }: IProps) => {
	const getItem = (
		{ href, label }: BreadcrumbItem,
		index: number
	): ReactNode => {
		if (index == 0) {
			return (
				<span key={index} className="text-slate-500">
					{label} &gt;{' '}
				</span>
			);
		}

		if (index == items.length - 1) {
			return <span key={index}>{label}</span>;
		}

		return (
			<a
				className="text-slate-500 hover:text-pink-700 transition-colors duration-300"
				key={index}
				href={href}
			>
				{label} &gt;{' '}
			</a>
		);
	};

	return (
		<p className={clsx(['text-sm font-medium', className])}>
			{items.map(getItem)}
		</p>
	);
};

export default Breadcrumb;
