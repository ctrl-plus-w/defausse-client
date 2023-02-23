import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import clsx from 'clsx';

import AlertIcon from '@icon/AlertIcon';

import { removeNotification } from '@slice/notificationsSlice';

import config from '@config/index';

import { INotification, NotificationStatus } from '@type/notifications';
import InfoIcon from '@icon/InfoIcon';
import WarningIcon from '@icon/WarningIcon';

interface IProps extends INotification {
	className?: string;
}

const Notification = ({ id, name, description, status, className }: IProps) => {
	const dispatch = useDispatch();

	const isError = status === NotificationStatus.ERROR;
	const isSuccess = status === NotificationStatus.SUCCESS;
	const isWarning = status === NotificationStatus.WARNING;
	const isInfo = status === NotificationStatus.INFO;

	useEffect(() => {
		const timeout = setTimeout(() => {
			dispatch(removeNotification(id));
		}, config.NOTIFICATION_DELAY);

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	const handleClick = () => {
		dispatch(removeNotification(id));
	};

	return (
		<div
			className={clsx([
				'w-full flex flex-col gap-1 border rounded p-4',
				'hover:opacity-75 transition-all duration-300 cursor-pointer',

				isError && 'border-red-400 bg-red-100 text-red-600',
				isSuccess && 'border-green-400 bg-green-100 text-green-600',
				isInfo && 'border-blue-400 bg-blue-100 text-blue-600',
				isWarning && 'border-orange-400 bg-orange-100 text-orange-600',

				className,
			])}
			onClick={handleClick}
		>
			<div className="flex items-center gap-2">
				{(isSuccess || isInfo) && <InfoIcon className="w-5 h-5" />}
				{isError && <AlertIcon className="w-5 h-5" />}
				{isWarning && <WarningIcon className="w-5 h-5" />}
				<p className="text-lg font-semibold">{name}</p>
			</div>

			<p className="text-base">{description}</p>
		</div>
	);
};

export default Notification;
