import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import type { AxiosResponse } from 'axios';

import Table from '@module/Table';

import database from '@database/index';

import { Script } from '@type/models';

const Scripts = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [scripts, setScripts] = useState<Script[]>([]);

  useEffect(() => {
    if (loading) {
      database.get<any, AxiosResponse<Script[]>>('/scripts').then((res) => {
        setScripts(res.data);
      });

      setLoading(false);
    }
  }, []);

  const handleRowClick = (script: Script) => {
    router.push('/scripts/' + script.id);
  };

  return (
    <div className='flex flex-col px-12 py-16'>
      <h1 className='text-5xl font-medium text-gray-900 mb-4'>Scénarios</h1>

      <p className='text-normal font-normal text-slate-700 w-1/2 mb-16'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere accusamus, nisi doloribus odit facilis sequi assumenda at aliquam alias, et
        eaque, vitae blanditiis. Rerum, consectetur aliquid itaque est ad eos.
      </p>

      <Table
        columns={[
          { label: 'ID', dataKey: 'id' },
          { label: 'Contenu', dataKey: 'content' },
          { label: 'Date de création', dataKey: 'createdAt' },
        ]}
        data={scripts}
        onClick={handleRowClick}
      />
    </div>
  );
};

export default Scripts;
