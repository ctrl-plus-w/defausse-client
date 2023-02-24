import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import type { FormEvent } from 'react';

import clsx from 'clsx';

import Modal from '@layout/Modal';

import TextArea from '@element/TextArea';
import Button from '@element/Button';
import Input from '@element/Input';

import database from '@database/index';

import { addNotification } from '@slice/notificationsSlice';

import { isEmptyStr } from '@helper/string.helper';

import { NotificationStatus } from '@type/notifications';
import { Mode } from '@type/models';

interface IProps {
	open: boolean;
	setOpen: (open: boolean) => void;

	refreshModes: VoidFunction;

	className?: string;
}

const ModeCreationModal = ({
	open,
	setOpen,
	refreshModes,
	className,
}: IProps) => {
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [summary, setSummary] = useState('');
	const [description, setDescription] = useState('');

	const isFormValid = () => {
		if (isEmptyStr(name) || isEmptyStr(summary) || isEmptyStr(description))
			return false;

		return true;
	};

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (!isFormValid()) return;

		try {
			await database.post<any, AxiosResponse<Mode>>('/modes', {
				name,
				summary,
				description,
			});
		} catch (err) {
			dispatch(
				addNotification({
					name: 'Une erreure est survenue',
					description: "Le mode de jeux n'as pas pu être créé.",
					status: NotificationStatus.ERROR,
				})
			);
		} finally {
			setName('');
			setOpen(false);
			refreshModes();
		}
	};

	return (
		<Modal
			open={open}
			setOpen={setOpen}
			className={clsx(['w-[40rem]', className])}
		>
			<h2 className="text-3xl font-medium text-slate-900">Créer un mode</h2>
			<p className="text-normal font-normal text-slate-700 mt-3">
				Vous pouvez rentrer le nom, le résumé et la description du mode de jeu,
				vous pourrez les modifier par la suite.
			</p>

			<form onSubmit={onSubmit} className="flex flex-col gap-4 mt-8">
				<Input
					name="name"
					label="Nom"
					value={name}
					onChange={e => setName(e.target.value)}
					placeholder="Défausse"
				/>

				<TextArea
					name="summary"
					label="Résumé"
					value={summary}
					onChange={e => setSummary(e.target.value)}
					placeholder="Un jeux dans lequel vous échangez vos personnalitées..."
					rows={3}
				/>

				<TextArea
					name="description"
					label="Description"
					value={description}
					onChange={e => setDescription(e.target.value)}
					placeholder="Un jeux dans lequel vous échangez vos personnalitées..."
					rows={6}
				/>

				<div className="flex justify-between mt-8">
					<Button type="outline" onClick={() => setOpen(false)}>
						Annuler
					</Button>

					<Button htmlType="submit" disabled={!isFormValid()}>
						Créer le mode
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default ModeCreationModal;
