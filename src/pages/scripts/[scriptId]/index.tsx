import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import type { GetServerSidePropsContext } from 'next';
import type { AxiosResponse } from 'axios';
import type { ChangeEvent } from 'react';

import Head from 'next/head';

import PlayerIntervalsDisplay from '@module/PlayerIntervalsDisplay';

import Breadcrumb from '@element/Breadcrumb';
import TextArea from '@element/TextArea';
import Checkbox from '@element/Checkbox';

import database from '@database/index';

import {
	selectScript,
	selectScriptIsLoading,
	setLoading,
	setScript,
	updateScript,
} from '@slice/scriptSlice';
import { addNotification } from '@slice/notificationsSlice';

import { NotificationStatus } from '@type/notifications';
import { Mode, Script } from '@type/models';

const Script = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const script = useSelector(selectScript);
	const loading = useSelector(selectScriptIsLoading);

	const [modes, setModes] = useState<Mode[]>([]);
	const [modesLoading, setModesLoading] = useState(true);

	const [content, setContent] = useState('');

	useEffect(() => {
		dispatch(setLoading(true));

		database.get<any, AxiosResponse<Mode[]>>('/modes').then(res => {
			setModes(res.data);
			setModesLoading(false);
		});

		database
			.get<any, AxiosResponse<Script>>('/scripts/' + router.query.scriptId)
			.then(res => {
				const _script = res.data;

				setContent(_script.content);
				dispatch(setScript(_script));
			})
			.catch(err => {
				let description = 'Une erreure inconnue est survenue.';

				if (err instanceof AxiosError) {
					if (err.response) {
						description = err.response.data.error;
					} else {
						description = err.message;
					}
				}

				dispatch(
					addNotification({
						name: 'Erreur GET /scripts',
						description,
						status: NotificationStatus.ERROR,
					})
				);

				router.push('/scripts');
			});
	}, []);

	const onTextAreaBlur = async () => {
		if (!script || content === script.content) return;

		try {
			await database.put<any, AxiosResponse<Script>>(`/scripts/${script.id}`, {
				content,
			});

			const { data: _script } = await database.get(`/scripts/${script.id}`);

			dispatch(updateScript(_script));
		} catch (err) {
			dispatch(
				addNotification({
					name: 'Une erreure est survenue',
					description: "La modification n'as pas été appliquée.",
					status: NotificationStatus.ERROR,
				})
			);
		}
	};

	const onChangeMode =
		(mode: Mode) => async (event: ChangeEvent<HTMLInputElement>) => {
			if (!script) return;

			try {
				console.log(mode, event.target.checked);
				if (event.target.checked) {
					await database.post<any, AxiosResponse<Script>>(
						`/scripts/${script.id}/modes`,
						{ modeId: mode.id }
					);
				} else {
					await database.delete<any, AxiosResponse<Script>>(
						`/scripts/${script.id}/modes/${mode.id}`
					);
				}

				const { data: _script } = await database.get(`/scripts/${script.id}`);

				dispatch(updateScript(_script));
			} catch (err) {
				dispatch(
					addNotification({
						name: 'Une erreure est survenue',
						description: "Lae mode de jeu n'as pas été modifié",
						status: NotificationStatus.ERROR,
					})
				);
			}
		};

	if (loading || modesLoading) {
		return <div className="flex flex-col px-12 py-16"></div>;
	}

	return (
		<>
			<Head>
				<title>Édition d&apos;un scénario</title>
			</Head>

			<div className="flex flex-col px-12 py-16">
				<Breadcrumb
					items={[
						{ label: 'Scénarios' },
						{ label: `Scénario(ID: ${script!.id.toString()})` },
					]}
				/>
				<h1 className="text-5xl font-medium text-gray-900 mb-4 mt-2">
					Édition
				</h1>

				<p className="text-normal font-normal text-slate-700 w-2/3 mb-16">
					Sur cette page, vous pouvez modifier les informations relatives à un
					scénario. Vous avez sur la gauche de la page un champs dans lequel
					vous pouvez rentrer le contenu du scénario en lui-même (il
					s&apos;enregistre tout seul lorsque vous quitter le champs).
					D&apos;une autre part, sur la droite de l&apos;interface, vous pouvez
					modifier les locations où se passent les scénarios en fonction du
					nombre de joueurs. (Ici aussi, cela s&apos;enregistre tout seul)
				</p>

				<div className="flex flex-col gap-8 w-full h-full ">
					<TextArea
						name="script-content"
						label="Contenu du script"
						onBlur={onTextAreaBlur}
						className="w-full"
						value={content}
						onChange={e => setContent(e.target.value)}
						rows={5}
					/>

					<div className="flex flex-col gap-4">
						<span className="font-semibold text-slate-900">Modes</span>

						<div className="flex flex-col">
							{modes.map((mode, index) => (
								<Checkbox
									name={mode.name}
									label={mode.name}
									key={index}
									checked={script!.modes.some(_mode => _mode.id === mode.id)}
									onChange={onChangeMode(mode)}
								/>
							))}
						</div>
					</div>

					<PlayerIntervalsDisplay />
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps(_context: GetServerSidePropsContext) {
	return {
		props: {},
	};
}

export default Script;
