import { useSelector } from 'react-redux';

import Notification from '@element/Notification';

import { selectNotifications } from '@slice/notificationsSlice';

const Notifications = () => {
  const notifications = useSelector(selectNotifications);

  return (
    <div className='flex flex-col w-80 gap-3 fixed right-12 top-8'>
      {notifications.map((props, index) => (
        <Notification {...props} key={index} />
      ))}
    </div>
  );
};

export default Notifications;
