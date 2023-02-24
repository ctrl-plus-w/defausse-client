interface IProps {
	className?: string;
}

function CheckIcon({ className }: IProps) {
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
			<path d="M20 6L9 17 4 12"></path>
		</svg>
	);
}

export default CheckIcon;
