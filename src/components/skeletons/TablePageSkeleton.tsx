import clsx from 'clsx';

import { TableSkeleton } from '@module/Table';

import { ButtonSkeleton } from '@element/Button';

import TextSkeleton from '@skeleton/Text';
import HeadingSkeleton from '@skeleton/Heading';

interface IProps {
	className?: string;
}

const TablePageSkeleton = ({ className }: IProps) => {
	return (
		<div className={clsx(['flex flex-col px-12 py-16', className])}>
			<div className="flex items-center gap-4 mb-4">
				<HeadingSkeleton />
				<ButtonSkeleton />
			</div>

			<TextSkeleton className="h-24 w-1/2 mb-16" />

			<TableSkeleton columns={3} rows={5} />
		</div>
	);
};

export default TablePageSkeleton;
