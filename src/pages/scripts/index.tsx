import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import type { AxiosResponse } from 'axios';

import Table from '@module/Table';

import ScriptCreationModal from '@modal/ScriptCreationModal';

import Button from '@element/Button';

import PlusIcon from '@icon/PlusIcon';

import database from '@database/index';

import { truncate } from '@helper/string.helper';

import { Script } from '@type/models';

const Scripts = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(true);
	const [scripts, setScripts] = useState<Script[]>([]);

	const [modalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		database.get<any, AxiosResponse<Script[]>>('/scripts').then(res => {
			setScripts(res.data);
		});

		setLoading(false);
	}, [loading]);

	const refreshScripts = () => {
		setLoading(true);
	};

	const handleRowClick = (script: Script) => {
		router.push('/scripts/' + script.id);
	};

	if (loading) return <>Loading...</>;

	return (
		<>
			<ScriptCreationModal
				open={modalOpen}
				setOpen={setModalOpen}
				refreshScripts={refreshScripts}
			/>

			<div className="flex flex-col px-12 py-16">
				<div className="flex items-center gap-4 mb-4">
					<h1 className="text-5xl font-medium text-gray-900">Scénarios</h1>
					<Button className="flex gap-2" onClick={() => setModalOpen(true)}>
						<PlusIcon className="-ml-2" /> Ajouter un scénario
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
								typeof str === 'string' ? truncate(str, 50) : str,
						},
						{ label: 'Date de création', dataKey: 'createdAt' },
					]}
					data={scripts}
					onClick={handleRowClick}
				/>
			</div>
		</>
	);
};

export default Scripts;
