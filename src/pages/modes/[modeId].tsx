import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import type { ChangeEvent, Dispatch, FocusEvent, SetStateAction } from 'react';
import type { GetServerSidePropsContext } from 'next';
import type { AxiosResponse } from 'axios';

import Breadcrumb from '@element/Breadcrumb';
import TextArea from '@element/TextArea';
import Input from '@element/Input';

import database from '@database/index';

import { addNotification } from '@slice/notificationsSlice';

import { NotificationStatus } from '@type/notifications';
import { Mode } from '@type/models';

const Mode = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const [mode, setMode] = useState<Mode | null>(null);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [summary, setSummary] = useState('');

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		database
			.get<any, AxiosResponse<Mode>>(`/modes/${router.query.modeId}`)
			.then(res => {
				setName(res.data.name);
				setDescription(res.data.description);
				setSummary(res.data.summary);
				setLoading(false);
				setMode(res.data);
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
						name: 'Erreur GET /modes',
						description,
						status: NotificationStatus.ERROR,
					})
				);

				router.push('/modes');
			});
	}, []);

	const onChange = (func: Dispatch<SetStateAction<string>>) => {
		return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			func(event.target.value);
		};
	};

	const onBlur = async (
		_event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (!mode) return;

		// If any field has changed
		if (
			mode.description === description &&
			mode.name === name &&
			mode.summary === summary
		)
			return;

		try {
			const res = await database.put<any, AxiosResponse<Mode>>(
				`/modes/${mode.id}`,
				{ name, description, summary }
			);

			const {
				name: _name,
				description: _description,
				summary: _summary,
			} = res.data;

			if (description !== _description) setDescription(_description);
			if (summary !== _summary) setSummary(_summary);
			if (name !== _name) setName(_name);

			setMode(res.data);
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
		<div className="flex flex-col px-12 py-16">
			<Breadcrumb
				items={[
					{ label: 'Modes' },
					{ label: `Mode(ID: ${mode!.id.toString()})` },
				]}
			/>
			<h1 className="text-5xl font-medium text-gray-900 mb-4 mt-2">
				{mode!.name}
			</h1>

			<p className="text-normal font-normal text-slate-700 w-1/2 mb-16">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
				accusamus, nisi doloribus odit facilis sequi assumenda at aliquam alias,
				et eaque, vitae blanditiis. Rerum, consectetur aliquid itaque est ad
				eos.
			</p>

			<form className="flex w-full gap-6">
				<div className="flex flex-col flex-1 gap-6">
					<Input
						name="name"
						label="Nom"
						value={name}
						onChange={onChange(setName)}
						onBlur={onBlur}
					/>
					<TextArea
						name="summary"
						label="Résumé"
						value={summary}
						onChange={onChange(setSummary)}
						onBlur={onBlur}
						blurOnEnter={false}
						rows={5}
					/>
				</div>

				<TextArea
					name="description"
					label="Description"
					value={description}
					onChange={onChange(setDescription)}
					onBlur={onBlur}
					className="flex-1"
					blurOnEnter={false}
				/>
			</form>
		</div>
	);
};

export async function getServerSideProps(_context: GetServerSidePropsContext) {
	return {
		props: {},
	};
}

export default Mode;
