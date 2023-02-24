import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import type { FormEvent } from 'react';

import clsx from 'clsx';

import Modal from '@layout/Modal';

import TextArea from '@element/TextArea';
import Button from '@element/Button';

import database from '@database/index';

import { addNotification } from '@slice/notificationsSlice';

import { isEmptyStr } from '@helper/string.helper';

import { NotificationStatus } from '@type/notifications';
import { Quest } from '@type/models';

interface IProps {
	open: boolean;
	setOpen: (open: boolean) => void;

	refreshQuests: VoidFunction;

	className?: string;
}

const QuestCreationModal = ({
	open,
	setOpen,
	refreshQuests,
	className,
}: IProps) => {
	const dispatch = useDispatch();

	const [content, setContent] = useState('');

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			await database.post<any, AxiosResponse<Quest>>('/quests', { content });
		} catch (err) {
			dispatch(
				addNotification({
					name: 'Une erreure est survenue',
					description: "La quête n'as pas pu être créée.",
					status: NotificationStatus.ERROR,
				})
			);
		} finally {
			setContent('');
			setOpen(false);
			refreshQuests();
		}
	};

	return (
		<Modal
			open={open}
			setOpen={setOpen}
			className={clsx(['w-[40rem]', className])}
		>
			<h2 className="text-3xl font-medium text-slate-900">Créer une quête</h2>
			<p className="text-normal font-normal text-slate-700 mt-3">
				Vous pouvez rentrer le contenu de la quête, aucun n&apos;autre champs
				n&apos;est nécessaire.
			</p>

			<form onSubmit={onSubmit} className="mt-8">
				<TextArea
					name="content"
					label="Contenu"
					value={content}
					onChange={e => setContent(e.target.value)}
					placeholder="Vous devez faire dire le mot moutarde à quelqu'un..."
					rows={6}
				/>

				<div className="flex justify-between mt-8">
					<Button type="outline" onClick={() => setOpen(false)}>
						Annuler
					</Button>

					<Button htmlType="submit" disabled={isEmptyStr(content)}>
						Créer la quête
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default QuestCreationModal;
