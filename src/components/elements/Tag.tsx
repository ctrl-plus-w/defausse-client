import type { ReactNode } from 'react';

import clsx from 'clsx';

interface IProps {
	className?: string;
	children?: ReactNode;
}

const Tag = ({ className, children }: IProps) => {
	return (
		<span
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
