import { useDispatch } from 'react-redux';
import { useState } from 'react';

import type { AxiosResponse } from 'axios';

import clsx from 'clsx';

import RoleEditionModal from '@modal/RoleEditionModal';

import InvisibleInput from '@element/InvisibleInput';
import Tag from '@element/Tag';

import database from '@database/index';

import { isEmptyStr } from '@helper/string.helper';

import { addNotification } from '@slice/notificationsSlice';

import { NotificationStatus } from '@type/notifications';
import { Role, RoleCombination } from '@type/models';

interface IProps {
	roleCombination: RoleCombination;

	refreshLocation: VoidFunction;

	className?: string;
}

const RoleCombinationDisplay = ({
	refreshLocation,
	roleCombination,
	className,
}: IProps) => {
	const dispatch = useDispatch();

	const [newRoleName, setNewRoleName] = useState('');

	const [editingRole, setEditingRole] = useState<Role>();
	const [modalOpen, setModalOpen] = useState(false);

	const onBlurNewRoleName = async () => {
		if (isEmptyStr(newRoleName) || !roleCombination) return;

		try {
			await database.post<any, AxiosResponse<Role>>(
				'/roles',
				{ name: newRoleName, gender: 1, unique: false, required: false },
				{ params: { roleCombinationId: roleCombination.id } }
			);
		} catch (err) {
			dispatch(
				addNotification({
					name: 'Une erreure est survenue',
					description: "Le rôle n'as pas pu être créé.",
					status: NotificationStatus.ERROR,
				})
			);
		} finally {
			refreshLocation();
		}
	};

	return (
		<>
			<RoleEditionModal
				role={editingRole}
				refreshLocation={refreshLocation}
				open={modalOpen}
				setOpen={setModalOpen}
			/>

			<div
				className={clsx([
					'flex flex-wrap items-start gap-4 max-w-md rounded border border-slate-500 p-4',
					className,
				])}
			>
				{roleCombination.roles.map((role, _index) => (
					<Tag
						key={_index}
						className="cursor-pointer"
						onClick={() => {
							setEditingRole(role);
							setModalOpen(true);
						}}
					>
						{role.name}
					</Tag>
				))}

				<Tag>
					<InvisibleInput
						placeholder="Ajouter un rôle"
						className="text-xs bg-transparent placeholder:text-pink-500"
						value={newRoleName}
						onChange={e => setNewRoleName(e.target.value)}
						onBlur={onBlurNewRoleName}
						autoWidthFactor={7}
						autoWidth
					/>
				</Tag>
			</div>
		</>
	);
};

export default RoleCombinationDisplay;
