import clsx from 'clsx';

interface IProps {
	className?: string;
}

const TextSkeleton = ({ className }: IProps) => {
	return (
		<div
			className={clsx([
				'bg-gradient-to-tl from-slate-200 to-slate-400 rounded',
				className,
			])}
		></div>
	);
};

export default TextSkeleton;
