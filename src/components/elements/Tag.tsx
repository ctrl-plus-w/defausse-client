import type { MouseEventHandler, ReactNode } from 'react';

import clsx from 'clsx';

interface IProps {
	className?: string;
	children?: ReactNode;

	onClick?: MouseEventHandler<HTMLSpanElement>;
}

const Tag = ({ className, children, onClick }: IProps) => {
	return (
		<span
			onClick={onClick}
			className={clsx([
				'px-2 py-1 text-xs font-medium bg-pink-200 text-pink-800 rounded-sm border border-pink-300 ',
				'group-hover:bg-pink-300 group-hover:text-pink-900 group-hover:border-pink-400 transition-all duration-300',
				className,
			])}
		>
			{children}
		</span>
	);
};

export default Tag;
