import { useDispatch } from 'react-redux';

import type { AxiosResponse } from 'axios';

import clsx from 'clsx';

import RoleCombinationDisplay from '@module/RoleCombinationDisplay';

import PlusIcon from '@icon/PlusIcon';

import database from '@database/index';

import { addNotification } from '@slice/notificationsSlice';

import { NotificationStatus } from '@type/notifications';
import { RoleCombination } from '@type/models';

interface IProps {
	roleCombinations: RoleCombination[];
	locationId: number;

	refreshLocation: VoidFunction;

	className?: string;
}

const RoleCombinationsDisplay = ({
	roleCombinations,
	refreshLocation,
	className,
	locationId,
}: IProps) => {
	const dispatch = useDispatch();

	const onCreateRoleCombination = async () => {
		try {
			await database.post<any, AxiosResponse<RoleCombination>>(
				'/roleCombinations',
				null,
				{ params: { locationId: locationId } }
			);
		} catch (err) {
			dispatch(
				addNotification({
					name: 'Une erreure est survenue',
					description: "La combinaison de rôle n'as pas pu être créée.",
					status: NotificationStatus.ERROR,
				})
			);
		} finally {
			refreshLocation();
		}
	};

	return (
		<div className={clsx(['flex gap-8', className])}>
			{(roleCombinations || []).map((roleCombination, index) => (
				<RoleCombinationDisplay
					{...{ roleCombination, refreshLocation }}
					key={index}
				/>
			))}

			<button
				className={clsx([
					'flex flex-col gap-2 justify-center items-center w-64 h-24',
					'rounded border border-dashed border-slate-500 cursor-pointer',
					'hover:bg-gray-50 hover:border-slate-700 transition-all duration-300',
				])}
				onClick={onCreateRoleCombination}
			>
				<p className="text-sm text-slate-700">Ajouter une combinaison</p>
				<PlusIcon className="stroke-slate-700 w-8" />
			</button>
		</div>
	);
};

export default RoleCombinationsDisplay;
