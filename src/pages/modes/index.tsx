import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import type { AxiosResponse } from 'axios';

import Table from '@module/Table';

import ModeCreationModal from '@modal/ModeCreationModal';

import TablePageSkeleton from '@skeleton/TablePageSkeleton';

import database from '@database/index';

import { renderDate } from '@helper/render.helper';
import { truncate } from '@helper/string.helper';

import { Mode } from '@type/models';
import Button from '@element/Button';
import PlusIcon from '@icon/PlusIcon';

const Modes = () => {
	const router = useRouter();

	const [modalOpen, setModalOpen] = useState(false);

	const [loading, setLoading] = useState(true);
	const [modes, setModes] = useState<Mode[]>([]);

	useEffect(() => {
		if (!loading) return;

		database.get<any, AxiosResponse<Mode[]>>('/modes').then(res => {
			setModes(res.data);
		});

		setLoading(false);
	}, [loading]);

	const handleRowClick = (mode: Mode) => {
		router.push('/modes/' + mode.id);
	};

	const refreshModes = () => {
		setLoading(true);
	};

	if (loading) return <TablePageSkeleton />;

	return (
		<>
			<ModeCreationModal
				open={modalOpen}
				setOpen={setModalOpen}
				refreshModes={refreshModes}
			/>

			<div className="flex flex-col px-12 py-16">
				<div className="flex items-center gap-4 mb-4">
					<h1 className="text-5xl font-medium text-gray-900">Modes</h1>
					<Button className="flex gap-2" onClick={() => setModalOpen(true)}>
						<PlusIcon className="-ml-2" /> Ajouter un mode
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
						{ label: 'Nom', dataKey: 'name' },
						{
							label: 'Résumé',
							dataKey: 'summary',
							render: str =>
								typeof str === 'string' ? truncate(str, 30) : str,
						},
						{
							label: 'Date de création',
							dataKey: 'createdAt',
							render: renderDate,
						},
					]}
					data={modes}
					onClick={handleRowClick}
				/>
			</div>
		</>
	);
};

export default Modes;
