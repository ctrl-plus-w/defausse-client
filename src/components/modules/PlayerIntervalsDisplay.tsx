import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import type { ChangeEvent, FocusEvent } from 'react';
import type { AxiosResponse } from 'axios';

import clsx from 'clsx';

import PlayerIntervalDisplay from '@module/PlayerIntervalDisplay';

import InvisibleInput from '@element/InvisibleInput';

import database from '@database/index';

import { selectScript, updateScript } from '@slice/scriptSlice';
import { addNotification } from '@slice/notificationsSlice';

import { isEmptyStr, isNum } from '@helper/string.helper';

import { NotificationStatus } from '@type/notifications';
import { PlayerInterval } from '@type/models';

import config from '@config/index';

interface IProps {
  className?: string;
}

const sortPlayerIntervals = ({ min: pi1Min, max: pi1Max }: PlayerInterval, { min: pi2Min, max: pi2Max }: PlayerInterval) => {
  if (pi1Min === pi2Min) {
    return pi1Max > pi2Max ? 1 : -1;
  }

  return pi1Min > pi2Min ? 1 : -1;
};

const PlayerIntervalsDisplay = ({ className }: IProps) => {
  const dispatch = useDispatch();

  const script = useSelector(selectScript);

  const [min, setMin] = useState('');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setMin(value);
  };

  const onBlur = async (_event: FocusEvent<HTMLInputElement>) => {
    const pMin = parseInt(min);

    if (!script || isEmptyStr(min) || !isNum(min) || pMin > config.MAX_INTERVAL_VALUE) return;

    try {
      await database.post<any, AxiosResponse<PlayerInterval>>(`/playerIntervals`, { min: pMin, max: pMin }, { params: { scriptId: script.id } });

      const { data: _script } = await database.get(`/scripts/${script.id}`);

      dispatch(updateScript(_script));
    } catch (err) {
      dispatch(
        addNotification({
          name: 'Une erreure est survenue',
          description: "L'interval de joueurs n'as pas été créé.",
          status: NotificationStatus.ERROR,
        })
      );
    } finally {
      setMin('');
    }
  };

  return (
    <div className={clsx(['flex flex-col flex-1 gap-4 flex-1min-w-min', className])}>
      <span className='font-semibold text-slate-900'>Intervals de joueurs</span>

      <div className='flex flex-col gap-6'>
        {[...(script?.playerIntervals || [])].sort(sortPlayerIntervals).map((playerInterval) => (
          <PlayerIntervalDisplay playerInterval={playerInterval} key={playerInterval.id} />
        ))}

        <h2 className='text-lg'>
          Partie de{' '}
          <InvisibleInput
            className='px-1 text-pink-700 font-semibold'
            placeholder='0'
            textAlign='center'
            value={min}
            onChange={onChange}
            onBlur={onBlur}
            bottomBorder
            autoWidth
          />{' '}
          joueurs
          <span className='transition-all duration-300 opacity-30 cursor-not-allowed'>
            {' '}
            à <InvisibleInput className='px-1 text-pink-700 font-semibold' placeholder='-' textAlign='center' value='' bottomBorder disabled />{' '}
            joueurs
          </span>
        </h2>
      </div>
    </div>
  );
};

export default PlayerIntervalsDisplay;
