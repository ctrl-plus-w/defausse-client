import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import type { ChangeEvent, FocusEvent } from 'react';
import type { AxiosResponse } from 'axios';

import clsx from 'clsx';

import LocationDisplay from '@element/LocationDisplay';
import InvisibleInput from '@element/InvisibleInput';

import database from '@database/index';

import { selectScript, updateScript } from '@slice/scriptSlice';
import { addNotification } from '@slice/notificationsSlice';

import { isEmptyStr } from '@helper/string.helper';

import { NotificationStatus } from '@type/notifications';
import { Location } from '@type/models';

interface IProps {
	locations: Location[];
	playerIntervalId: number;

	className?: string;
}

const LocationsDisplay = ({
	locations,
	playerIntervalId,
	className,
}: IProps) => {
	const dispatch = useDispatch();
	const script = useSelector(selectScript);

	const [newLocation, setNewLocation] = useState('');

	const onChangeNewLocation = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		setNewLocation(value);
	};

	const onBlurNewLocation = async (_event: FocusEvent<HTMLInputElement>) => {
		if (isEmptyStr(newLocation) || !script) return;

		try {
			await database.post<any, AxiosResponse<Location>>(
				'/locations',
				{ name: newLocation },
				{ params: { playerIntervalId: playerIntervalId } }
			);

			const { data: _script } = await database.get(`/scripts/${script.id}`);

			dispatch(updateScript(_script));
		} catch (err) {
			dispatch(
				addNotification({
					name: 'Une erreure est survenue',
					description: "La location n'as pas été créée.",
					status: NotificationStatus.ERROR,
				})
			);
		} finally {
			setNewLocation('');
		}
	};

	return (
		<ul className={clsx(['flex flex-col mt-1 divide-y', className])}>
			{locations.map(location => (
				<LocationDisplay location={location} key={location.id} />
			))}

			<li className="pl-3 py-2">
				<InvisibleInput
					value={newLocation}
					onChange={onChangeNewLocation}
					onBlur={onBlurNewLocation}
					placeholder="Ajouter une location"
					className={clsx([
						'px-2 border border-transparent bg-transparent rounded-sm',
						'hover:border-pink-700 hover:bg-white focus:bg-white focus:border-pink-700 focus:ring-2 focus:ring-pink-200',
					])}
					autoWidth
				/>
			</li>
		</ul>
	);
};

export default LocationsDisplay;
