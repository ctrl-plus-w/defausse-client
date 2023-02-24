import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import type { AxiosResponse } from 'axios';
import type { GetServerSidePropsContext } from 'next';

import Head from 'next/head';

import database from '@database/index';

import RoleCombinationsDisplay from '@module/RoleCombinationsDisplay';

import Breadcrumb from '@element/Breadcrumb';

import { addNotification } from '@slice/notificationsSlice';

import { NotificationStatus } from '@type/notifications';
import { Location } from '@type/models';

const Location = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const [location, setLocation] = useState<Location | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!loading) return;

		database
			.get<any, AxiosResponse<Location>>(
				`/locations/${router.query.locationId}`
			)
			.then(res => {
				setLocation(res.data);
				setLoading(false);
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
						name: 'Erreur GET /location',
						description,
						status: NotificationStatus.ERROR,
					})
				);

				router.push(`/scripts/${router.query.scriptId}`);
			});
	}, [loading]);

	const refreshLocation = () => {
		setLoading(true);
	};

	if (loading) return <>Loading...</>;

	return (
		<>
			<Head>
				<title>Édition d&apos;une location</title>
			</Head>

			<div className="flex flex-col h-full px-12 py-16">
				<Breadcrumb
					items={[
						{ label: 'Scénarios' },
						{
							label: `Scénario(ID: ${router.query.scriptId})`,
							href: `/scripts/${router.query.scriptId}`,
						},
						{
							label: `Location(ID: ${router.query.locationId})`,
							href: `/scripts/${router.query.scriptId}/locations/${router.query.locationId}`,
						},
					]}
				/>
				<h1 className="text-5xl font-medium text-gray-900 mb-4 mt-2">
					{location!.name}
				</h1>

				<p className="text-normal font-normal text-slate-700 w-1/2 mb-16">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
					accusamus, nisi doloribus odit facilis sequi assumenda at aliquam
					alias, et eaque, vitae blanditiis. Rerum, consectetur aliquid itaque
					est ad eos.
				</p>

				<label className="font-semibold text-slate-900 mb-4">
					Combinaisons de rôles
				</label>

				<RoleCombinationsDisplay
					roleCombinations={location?.roleCombinations || []}
					refreshLocation={refreshLocation}
					locationId={location!.id}
				/>
			</div>
		</>
	);
};

export async function getServerSideProps(_context: GetServerSidePropsContext) {
	return {
		props: {},
	};
}
export default Location;
