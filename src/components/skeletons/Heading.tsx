import clsx from 'clsx';

interface IProps {
	type?: 1;

	className?: string;
}

const HeadingSkeleton = ({ type = 1, className }: IProps) => {
	return (
		<div
			className={clsx([
				'bg-gradient-to-bl from-slate-300 to-slate-600 rounded',
				type === 1 && 'h-12 w-64',
				className,
			])}
		></div>
	);
};

export default HeadingSkeleton;
