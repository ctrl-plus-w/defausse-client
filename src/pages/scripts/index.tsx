import { useEffect, useState } from 'react';

import type { AxiosResponse } from 'axios';

import Tag from '@element/Tag';

import database from '@database/index';

import { Script } from '@type/models';
import Table from '@module/Table';
import { renderDate } from '@helper/render.helper';

const Scripts = () => {
  const [loading, setLoading] = useState(true);
  const [scripts, setScripts] = useState<Script[]>([]);

  useEffect(() => {
    if (loading) {
      database.get<any, AxiosResponse<Script[]>>('/scripts').then((res) => {
        setScripts(
          res.data.map(({ createdAt, updatedAt, ...fields }) => ({
            ...fields,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
          }))
        );
      });

      setLoading(false);
    }
  }, [loading]);

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
          { label: 'Date de création', dataKey: 'createdAt', render: (d) => d?.toLocaleString() },
        ]}
        data={scripts}
      />
    </div>
  );
};

export default Scripts;
