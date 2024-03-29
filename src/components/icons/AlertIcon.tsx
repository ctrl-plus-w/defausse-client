interface IProps {
	className?: string;
}

const AlertIcon = ({ className }: IProps) => {
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
			viewBox="0 0 24 24"
			className={className}
		>
			<circle cx="12" cy="12" r="10"></circle>
			<path d="M12 8L12 12"></path>
			<path d="M12 16L12.01 16"></path>
		</svg>
	);
};

export default AlertIcon;
