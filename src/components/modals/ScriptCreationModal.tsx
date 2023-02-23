import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import type { FormEvent } from 'react';

import clsx from 'clsx';

import Modal from '@layout/Modal';

import TextArea from '@element/TextArea';
import Button from '@element/Button';

import database from '@database/index';

import { addNotification } from '@slice/notificationsSlice';

import { isEmptyStr } from '@helper/string.helper';

import { NotificationStatus } from '@type/notifications';
import { Script } from '@type/models';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;

  refreshScripts: Function;

  className?: string;
}

const ScriptCreationModal = ({ open, setOpen, refreshScripts, className }: IProps) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState('');

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await database.post<any, AxiosResponse<Script>>('/scripts', { content });
    } catch (err) {
      dispatch(
        addNotification({
          name: 'Une erreure est survenue',
          description: "Le scénario n'as pas pu être créé.",
          status: NotificationStatus.ERROR,
        })
      );
    } finally {
      setContent('');
      setOpen(false);
      refreshScripts();
    }
  };

  return (
    <Modal open={open} setOpen={setOpen} className={clsx(['w-[40rem]', className])}>
      <h2 className='text-3xl font-medium text-slate-900'>Créer un scénario</h2>
      <p className='text-normal font-normal text-slate-700 mt-3'>
        Vous ne pouvez rentrer que le contenu du scénario pour l&apos;instance, cependant vous pourrez modifier les autres propriétés plus tard.
      </p>

      <form onSubmit={onSubmit} className='mt-8'>
        <TextArea
          name='content'
          label='Contenu'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Vous êtes dans un centre aéré, un enfant vient de perdre sa mère ce matin, vous essayez de le réconforter...'
          rows={6}
        />

        <div className='flex justify-between mt-8'>
          <Button type='outline' onClick={() => setOpen(false)}>
            Annuler
          </Button>

          <Button htmlType='submit' disabled={isEmptyStr(content)}>
            Créer le scénario
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ScriptCreationModal;
