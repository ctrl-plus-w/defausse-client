import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import type { AxiosResponse } from 'axios';

import Table from '@module/Table';

import TablePageSkeleton from '@skeleton/TablePageSkeleton';

import database from '@database/index';

import { truncate } from '@helper/string.helper';
import { renderDate } from '@helper/render.helper';

import { Quest } from '@type/models';

const Quests = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [quests, setQuest] = useState<Quest[]>([]);

	useEffect(() => {
		database.get<any, AxiosResponse<Quest[]>>('/quests').then(res => {
			setQuest(res.data);
		});

		setLoading(false);
	}, []);

	const handleRowClick = (quest: Quest) => {
		router.push('/quests/' + quest.id);
	};

	if (loading) return <TablePageSkeleton />;

	return (
		<div className="flex flex-col px-12 py-16">
			<h1 className="text-5xl font-medium text-gray-900 mb-4">Quêtes</h1>

			<p className="text-normal font-normal text-slate-700 w-1/2 mb-16">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
				accusamus, nisi doloribus odit facilis sequi assumenda at aliquam alias,
				et eaque, vitae blanditiis. Rerum, consectetur aliquid itaque est ad
				eos.
			</p>

			<Table
				columns={[
					{ label: 'ID', dataKey: 'id' },
					{
						label: 'Contenu',
						dataKey: 'content',
						render: str => (typeof str === 'string' ? truncate(str, 30) : str),
					},
					{
						label: 'Date de création',
						dataKey: 'createdAt',
						render: renderDate,
					},
				]}
				data={quests}
				onClick={handleRowClick}
			/>
		</div>
	);
};

export default Quests;
