import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import type { AxiosResponse } from 'axios';

import Table from '@module/Table';

import TablePageSkeleton from '@skeleton/TablePageSkeleton';

import database from '@database/index';

import { truncate } from '@helper/string.helper';
import { renderDate } from '@helper/render.helper';

import { Quest } from '@type/models';
import Button from '@element/Button';
import PlusIcon from '@icon/PlusIcon';
import QuestCreationModal from '@modal/QuestCreationModal';

const Quests = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [quests, setQuest] = useState<Quest[]>([]);

	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		if (!loading) return;

		database.get<any, AxiosResponse<Quest[]>>('/quests').then(res => {
			setQuest(res.data);
		});

		setLoading(false);
	}, [loading]);

	const refreshQuests = () => {
		setLoading(true);
	};

	const handleRowClick = (quest: Quest) => {
		router.push('/quests/' + quest.id);
	};

	if (loading) return <TablePageSkeleton />;

	return (
		<>
			<QuestCreationModal
				open={modalOpen}
				setOpen={setModalOpen}
				refreshQuests={refreshQuests}
			/>

			<div className="flex flex-col px-12 py-16">
				<div className="flex items-center gap-4 mb-4">
					<h1 className="text-5xl font-medium text-gray-900">Quêtes</h1>
					<Button className="flex gap-2" onClick={() => setModalOpen(true)}>
						<PlusIcon className="-ml-2" /> Ajouter une quête
					</Button>
				</div>

				<p className="text-normal font-normal text-slate-700 w-1/2 mb-16">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
					accusamus, nisi doloribus odit facilis sequi assumenda at aliquam
					alias, et eaque, vitae blanditiis. Rerum, consectetur aliquid itaque
					est ad eos.
				</p>

				<Table
					columns={[
						{ label: 'ID', dataKey: 'id' },
						{
							label: 'Contenu',
							dataKey: 'content',
							render: str =>
								typeof str === 'string' ? truncate(str, 30) : str,
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
		</>
	);
};

export default Quests;
