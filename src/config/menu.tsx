import type { ReactNode } from 'react';

import TypeIcon from '@icon/TypeIcon';
import FlagIcon from '@icon/FlagIcon';
import BoxIcon from '@icon/BoxIcon';

export interface IMenuItem {
  href: string;
  label: string;
  icon: ReactNode;
}

const menu: IMenuItem[] = [
  {
    href: '/scripts',
    label: 'Scénarios',
    icon: <TypeIcon />,
  },
  {
    href: '/modes',
    label: 'Modes',
    icon: <BoxIcon />,
  },
  {
    href: '/quests',
    label: 'Quêtes',
    icon: <FlagIcon />,
  },
];

export default menu;
