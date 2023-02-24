import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import type { FocusEvent } from 'react';
import type { AxiosResponse } from 'axios';
import type { GetServerSidePropsContext } from 'next';

import Head from 'next/head';

import Breadcrumb from '@element/Breadcrumb';
import TextArea from '@element/TextArea';

import database from '@database/index';

import { addNotification } from '@slice/notificationsSlice';

import { NotificationStatus } from '@type/notifications';
import { Quest } from '@type/models';

const Quest = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const [quest, setQuest] = useState<Quest | null>(null);
	const [content, setContent] = useState('');

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		database
			.get<any, AxiosResponse<Quest>>(`/quests/${router.query.questId}`)
			.then(res => {
				setContent(res.data.content);
				setLoading(false);
				setQuest(res.data);
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
						name: 'Erreur GET /quests',
						description,
						status: NotificationStatus.ERROR,
					})
				);

				router.push('/quests');
			});
	}, []);

	const onBlur = async (
		_event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (!quest) return;

		// If the content hasn't changed
		if (quest.content === content) return;

		try {
			const res = await database.put<any, AxiosResponse<Quest>>(
				`/quests/${quest.id}`,
				{ content }
			);

			setContent(res.data.content);

			setQuest(res.data);
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

	if (loading) return <>Loading...</>;

	return (
		<>
			<Head>
				<title>Édition d&apos;une quête</title>
			</Head>

			<div className="flex flex-col px-12 py-16">
				<Breadcrumb
					items={[
						{ label: 'Quêtes' },
						{ label: `Quête(ID: ${quest!.id.toString()})` },
					]}
				/>
				<h1 className="text-5xl font-medium text-gray-900 mb-4 mt-2">
					Édition de quête
				</h1>

				<p className="text-normal font-normal text-slate-700 w-1/2 mb-16">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
					accusamus, nisi doloribus odit facilis sequi assumenda at aliquam
					alias, et eaque, vitae blanditiis. Rerum, consectetur aliquid itaque
					est ad eos.
				</p>

				<form className="flex w-full gap-6">
					<TextArea
						name="content"
						label="Objectif"
						value={content}
						onChange={e => setContent(e.target.value)}
						onBlur={onBlur}
						className="flex-1"
						blurOnEnter={false}
					/>
				</form>
			</div>
		</>
	);
};

export async function getServerSideProps(_context: GetServerSidePropsContext) {
	return {
		props: {},
	};
}

export default Quest;
