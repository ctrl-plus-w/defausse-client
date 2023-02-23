interface IProps {
	className?: string;
}

const WarningIcon = ({ className }: IProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			className={className}
			viewBox="0 0 24 24"
		>
			<path d="M7.86 2L16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2z"></path>
			<path d="M12 8L12 12"></path>
			<path d="M12 16L12.01 16"></path>
		</svg>
	);
};

export default WarningIcon;
