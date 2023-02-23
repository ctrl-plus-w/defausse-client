import { useEffect } from 'react';

import Breadcrumb from '@element/Breadcrumb';

const Location = () => {
  useEffect(() => {}, []);

  return (
    <div className='flex flex-col h-full px-12 py-16'>
      <Breadcrumb
        items={[
          { label: 'Scénarios' },
          { label: `Scénario(ID: 1)`, href: `/scripts/1` },
          { label: `Location(ID: 1)`, href: `/scripts/1/locations/1` },
        ]}
      />
      <h1 className='text-5xl font-medium text-gray-900 mb-4 mt-2'>Nom de la location</h1>

      <p className='text-normal font-normal text-slate-700 w-1/2 mb-16'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere accusamus, nisi doloribus odit facilis sequi assumenda at aliquam alias, et
        eaque, vitae blanditiis. Rerum, consectetur aliquid itaque est ad eos.
      </p>
    </div>
  );
};

export default Location;
