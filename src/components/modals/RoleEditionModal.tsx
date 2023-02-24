import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import type { ChangeEvent, FormEvent } from 'react';
import type { AxiosResponse } from 'axios';

import clsx from 'clsx';

import Modal from '@layout/Modal';

import Checkbox from '@element/Checkbox';
import Button from '@element/Button';
import Input from '@element/Input';
import Radio from '@element/Radio';

import TrashIcon from '@icon/TrashIcon';

import database from '@database/index';

import { addNotification } from '@slice/notificationsSlice';

import { isEmptyStr } from '@helper/string.helper';

import { NotificationStatus } from '@type/notifications';
import { Role } from '@type/models';

interface IProps {
	open: boolean;
	setOpen: (open: boolean) => void;

	refreshLocation: VoidFunction;

	role?: Role;

	className?: string;
}

const RoleEditionModal = ({
	open,
	setOpen,
	refreshLocation,
	role,
	className,
}: IProps) => {
	const dispatch = useDispatch();

	const [name, setName] = useState<string>();
	const [unique, setUnique] = useState<boolean>();
	const [required, setRequired] = useState<boolean>();
	const [gender, setGender] = useState<number>();

	useEffect(() => {
		if (!role) return;

		setName(role.name);
		setUnique(role.unique);
		setRequired(role.required);
		setGender(role.gender);
	}, [role, open]);

	const onChangeName = (event: ChangeEvent<HTMLInputElement>) =>
		setName(event.target.value);

	const isFormValid = () => {
		if (!role || !name || !gender) return false;

		if (isEmptyStr(name)) return false;

		if (
			name === role.name &&
			unique === role.unique &&
			required === role.required &&
			gender === role.gender
		)
			return false;

		if (!gender || ![1, 2].includes(gender)) return false;

		return true;
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (!role || !isFormValid()) return;

		try {
			await database.put<any, AxiosResponse<Role>>(`/roles/${role.id}`, {
				name,
				unique,
				required,
				gender,
			});
		} catch (err) {
			dispatch(
				addNotification({
					name: 'Une erreure est survenue',
					description: "Le rôle n'as pas été modifié.",
					status: NotificationStatus.ERROR,
				})
			);
		} finally {
			setOpen(false);
			refreshLocation();
		}
	};

	const handleDelete = async () => {
		if (!role) return;

		try {
			await database.delete<any, AxiosResponse<Role>>(`/roles/${role.id}`);
		} catch (err) {
			dispatch(
				addNotification({
					name: 'Une erreure est survenue',
					description: "Le rôle n'as pas été supprimé.",
					status: NotificationStatus.ERROR,
				})
			);
		} finally {
			setOpen(false);
			refreshLocation();
		}
	};

	return (
		<Modal {...{ open, setOpen }} className={clsx(['w-[40rem]', className])}>
			<div className="flex items-center justify-between">
				<h2 className="text-3xl font-medium text-slate-900">
					Modifier un rôle
				</h2>

				<button onClick={handleDelete}>
					<TrashIcon className="w-6 h-6 hover:stroke-pink-700 transition-colors duration-300" />
				</button>
			</div>
			<p className="text-normal font-normal text-slate-700 mt-3">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quibusdam
				temporibus necessitatibus suscipit iusto fugiat ab earum cum quasi.
			</p>

			<form className="flex flex-col gap-8 mt-8" onSubmit={handleSubmit}>
				<Input name="name" label="Nom" value={name} onChange={onChangeName} />

				<div className="flex w-full gap-8">
					<div className="w-1/2 flex flex-col items-start gap-4">
						<span className="font-semibold text-slate-900">Paramètres</span>

						<div className="flex flex-col gap-2">
							<Checkbox
								name="unique"
								label="Unique"
								checked={unique}
								onChange={e => setUnique(!!e.target.checked)}
							/>

							<Checkbox
								name="required"
								label="Requis"
								checked={required}
								onChange={e => setRequired(!!e.target.checked)}
							/>
						</div>
					</div>

					<Radio
						fields={[
							{ name: 'Homme', key: '1' },
							{ name: 'Femme', key: '2' },
						]}
						label="Genre"
						name="gender"
						value={gender?.toString()}
						onChange={e => setGender(e.target.value === 'Homme' ? 1 : 2)}
						className="w-1/2"
					/>
				</div>

				<div className="flex justify-between w-full mt-8">
					<Button type="outline" onClick={() => setOpen(false)}>
						Annuler
					</Button>

					<Button htmlType="submit" disabled={!isFormValid()}>
						Modifier le rôle
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default RoleEditionModal;
