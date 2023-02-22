import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import type { Dispatch, SetStateAction, ChangeEvent, FocusEvent } from 'react';
import type { AxiosResponse } from 'axios';

import clsx from 'clsx';

import InvisibleInput from '@element/InvisibleInput';

import database from '@database/index';

import { selectScript, updateScript } from '@slice/scriptSlice';
import { addNotification } from '@slice/notificationsSlice';

import { isEmptyStr, isNum } from '@helper/string.helper';
import { isEmptyObj } from '@helper/object.helper';

import { NotificationStatus } from '@type/notifications';
import { PlayerInterval } from '@type/models';

import config from '@config/index';
import LocationDisplay from '@element/LocationDisplay';

interface IProps {
  playerInterval: PlayerInterval;
}

const PlayerIntervalDisplay = ({ playerInterval }: IProps) => {
  const dispatch = useDispatch();

  const script = useSelector(selectScript);

  // `hasInterval` is used to change the opacity of the second field in case min and max are equals
  const [hasInterval, setHasInterval] = useState(playerInterval.min != playerInterval.max);

  // Store the values of the min and max properties of the player interval
  const [min, setMin] = useState(playerInterval.min.toString());
  const [max, setMax] = useState(playerInterval.max.toString());

  const [_min, _setMin] = useState(min);
  const [_max, _setMax] = useState(max);

  const updateValue = (func: Dispatch<SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if ((value !== '' && !isNum(value)) || parseInt(value) > config.MAX_INTERVAL_VALUE) return;

    func(value);
  };

  const focusMaxValue = (_event: FocusEvent<HTMLInputElement>) => {
    if (!hasInterval) setHasInterval(true);
  };

  const updateDatabaseValues = async () => {
    const requestBody: { min?: number; max?: number } = {};

    if (isEmptyStr(min) || !isNum(min)) return;

    // Check if min < max (doesn't trigger if max='')
    if (parseInt(min) > parseInt(max)) return;

    // If `min` and `max` have changed
    if (parseInt(min) !== playerInterval.min && parseInt(max) !== playerInterval.max) {
      if (max === '') {
        // If max isn't defined
        requestBody.min = parseInt(min);
        requestBody.max = parseInt(min);
      } else {
        // If max is defined
        requestBody.min = parseInt(min);
        requestBody.max = parseInt(max);
      }
    }

    // If `min` have changed but not `max`
    if (parseInt(min) !== playerInterval.min && parseInt(max) === playerInterval.max) {
      if (max === '') {
        // If max isn't defined
        requestBody.min = parseInt(min);
        requestBody.max = parseInt(min);
      } else {
        // If max is defined
        requestBody.min = parseInt(min);
      }
    }

    // If `max` have changed but not `min`
    if (parseInt(min) === playerInterval.min && parseInt(max) !== playerInterval.max) {
      if (max === '' || playerInterval.min === playerInterval.max) {
        // If max isn't defined
        requestBody.max = parseInt(min);
      } else {
        // If max is defined
        requestBody.max = parseInt(max);
      }
    }

    if (isEmptyObj(requestBody)) return;

    try {
      await database.put<any, AxiosResponse<PlayerInterval>>(`/playerIntervals/${playerInterval.id}`, requestBody);

      const { data: _script } = await database.get(`/scripts/${script!.id}`);

      dispatch(updateScript(_script));
    } catch (err) {
      dispatch(
        addNotification({
          name: 'Une erreure est survenue',
          description: "La modification n'as pas été appliquée.",
          status: NotificationStatus.ERROR,
        })
      );
    }
  };

  const blurMaxValue = (_event: FocusEvent<HTMLInputElement>) => {
    updateDatabaseValues();

    const pMin = parseInt(min);
    const pMax = parseInt(max);

    if (isNaN(pMax) || pMin > pMax) {
      setMax(_max);
    } else {
      _setMax(max);
    }

    if (max === '' || max === min) setHasInterval(false);
  };

  const blurMinValue = () => {
    updateDatabaseValues();

    const pMin = parseInt(min);
    const pMax = parseInt(max);

    if (isNaN(pMin) || pMin > pMax || pMin < 0 || (pMin === pMax && pMax === 0)) {
      setMin(_min);
    } else {
      _setMin(min);
    }

    if (max === '' || max === min) setHasInterval(false);
  };

  return (
    <div className='flex flex-col'>
      <h2 className='text-lg'>
        Partie de{' '}
        <InvisibleInput
          className='px-1 text-pink-700 font-semibold'
          placeholder='0'
          textAlign='center'
          value={min}
          onChange={updateValue(setMin)}
          onBlur={blurMinValue}
          bottomBorder
          autoWidth
        />{' '}
        joueurs
        <span className={clsx(['transition-all duration-300', !hasInterval && 'opacity-30'])}>
          {' '}
          à{' '}
          <InvisibleInput
            className='px-1 text-pink-700 font-semibold'
            placeholder='-'
            textAlign='center'
            value={max === min ? '' : max}
            onChange={updateValue(setMax)}
            onFocus={focusMaxValue}
            onBlur={blurMaxValue}
            bottomBorder
            autoWidth
          />{' '}
          joueurs
        </span>
      </h2>

      <ul className='flex flex-col mt-4 divide-y'>
        {playerInterval.locations?.map((location, index) => (
          <LocationDisplay location={location} key={index} />
        ))}

        <li className='pl-6 py-2'>
          <InvisibleInput value='' placeholder='Ajouter une location' autoWidth />
        </li>
      </ul>
    </div>
  );
};

export default PlayerIntervalDisplay;
