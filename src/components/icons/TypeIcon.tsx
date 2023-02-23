interface IProps {
	className?: string;
}

const TypeIcon = (props: IProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
		{...props}
	>
		<path d="M4 7V4h16v3M9 20h6M12 4v16" />
	</svg>
);

export default TypeIcon;
