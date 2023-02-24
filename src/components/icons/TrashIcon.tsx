interface IProps {
	className?: string;
}

function TrashIcon({ className }: IProps) {
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
			<path d="M3 6L5 6 21 6"></path>
			<path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
		</svg>
	);
}

export default TrashIcon;
