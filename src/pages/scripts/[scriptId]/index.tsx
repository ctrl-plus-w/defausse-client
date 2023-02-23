import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';

import type { GetServerSidePropsContext } from 'next';
import type { AxiosResponse } from 'axios';

import PlayerIntervalsDisplay from '@module/PlayerIntervalsDisplay';

import Breadcrumb from '@element/Breadcrumb';
import TextArea from '@element/TextArea';

import database from '@database/index';

import { selectScript, selectScriptIsLoading, setScript, updateScript } from '@slice/scriptSlice';
import { addNotification } from '@slice/notificationsSlice';

import { NotificationStatus } from '@type/notifications';
import { Script } from '@type/models';

const Script = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const script = useSelector(selectScript);
  const loading = useSelector(selectScriptIsLoading);

  const [content, setContent] = useState('');

  useEffect(() => {
    if (loading) {
      database
        .get<any, AxiosResponse<Script>>('/scripts/' + router.query.scriptId)
        .then((res) => {
          const _script = res.data;

          setContent(_script.content);
          dispatch(setScript(_script));
        })
        .catch((err) => {
          let description = 'Une erreure inconnue est survenue.';

          if (err instanceof AxiosError) {
            if (err.response) {
              description = err.response.data.error;
            } else {
              description = err.message;
            }
          }

          dispatch(
            addNotification({
              name: 'Erreur GET /scripts',
              description,
              status: NotificationStatus.ERROR,
            })
          );

          router.push('/scripts');
        });
    }
  }, []);

  const onTextAreaBlur = async () => {
    if (!script || content === script.content) return;

    try {
      await database.put<any, AxiosResponse<Script>>(`/scripts/${script.id}`, {
        content,
      });

      const { data: _script } = await database.get(`/scripts/${script.id}`);

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

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className='flex flex-col h-full px-12 py-16'>
      <Breadcrumb items={[{ label: 'Scénarios' }, { label: `Scénario(ID: ${script!.id.toString()})` }]} />
      <h1 className='text-5xl font-medium text-gray-900 mb-4 mt-2'>Édition</h1>

      <p className='text-normal font-normal text-slate-700 w-1/2 mb-16'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere accusamus, nisi doloribus odit facilis sequi assumenda at aliquam alias, et
        eaque, vitae blanditiis. Rerum, consectetur aliquid itaque est ad eos.
      </p>

      <div className='flex gap-8 w-full h-full'>
        <div className='flex flex-col flex-1 gap-4 justify-between items-end'>
          <TextArea
            name='script-content'
            label='Contenu du script'
            onBlur={onTextAreaBlur}
            className='w-full'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          />
        </div>

        <PlayerIntervalsDisplay />
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  };
}

export default Script;
