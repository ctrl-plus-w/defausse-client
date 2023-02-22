import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import type { ChangeEvent } from 'react';
import type { AxiosResponse } from 'axios';

import clsx from 'clsx';

import InvisibleInput from '@element/InvisibleInput';

import database from '@database/index';

import { selectScript, updateScript } from '@slice/scriptSlice';
import { addNotification } from '@slice/notificationsSlice';

import { NotificationStatus } from '@type/notifications';
import { Location } from '@type/models';
import Link from 'next/link';

interface IProps {
  location: Location;

  className?: string;
}

const LocationDisplay = ({ location, className }: IProps) => {
  const dispatch = useDispatch();

  const script = useSelector(selectScript);

  const [name, setName] = useState(location.name);
  const [_name, _setName] = useState(name);

  const handleClick = () => {};

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleBlur = async () => {
    if (name === location.name) return;

    if (name === '') {
      setName(_name);
      return;
    }

    _setName(name);

    try {
      await database.put<any, AxiosResponse<Location>>(`/locations/${location.id}`, { name });

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

  return (
    <li className={clsx(['cursor-pointer hover:bg-gray-50', className])} onClick={handleClick}>
      <Link className='block pl-4 py-2' href={`/scripts/${script!.id}/playerIntervals/${location.playerIntervalId}/locations/${location.id}`}>
        <InvisibleInput
          className={clsx([
            'px-2 border border-transparent bg-transparent rounded-sm',
            'hover:border-pink-700 hover:bg-white focus:bg-white focus:border-pink-700 focus:ring-2 focus:ring-pink-200',
          ])}
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={location.name}
          autoWidth
        />
      </Link>
    </li>
  );
};

export default LocationDisplay;
