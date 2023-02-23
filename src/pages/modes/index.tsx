import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import type { AxiosResponse } from 'axios';

import Table from '@module/Table';

import database from '@database/index';

import { Mode } from '@type/models';
import { truncate } from '@helper/string.helper';
import { renderDate } from '@helper/render.helper';

const Modes = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [modes, setModes] = useState<Mode[]>([]);

  useEffect(() => {
    if (loading) {
      database.get<any, AxiosResponse<Mode[]>>('/modes').then((res) => {
        setModes(res.data);
      });

      setLoading(false);
    }
  }, []);

  const handleRowClick = (mode: Mode) => {
    router.push('/modes/' + mode.id);
  };

  return (
    <div className='flex flex-col px-12 py-16'>
      <h1 className='text-5xl font-medium text-gray-900 mb-4'>Modes</h1>

      <p className='text-normal font-normal text-slate-700 w-1/2 mb-16'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere accusamus, nisi doloribus odit facilis sequi assumenda at aliquam alias, et
        eaque, vitae blanditiis. Rerum, consectetur aliquid itaque est ad eos.
      </p>

      <Table
        columns={[
          { label: 'ID', dataKey: 'id' },
          { label: 'Nom', dataKey: 'name' },
          { label: 'Résumé', dataKey: 'summary', render: (str) => (typeof str === 'string' ? truncate(str, 30) : str) },
          { label: 'Date de création', dataKey: 'createdAt', render: renderDate },
        ]}
        data={modes}
        onClick={handleRowClick}
      />
    </div>
  );
};

export default Modes;
