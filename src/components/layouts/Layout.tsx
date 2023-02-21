import Link from 'next/link';
import type { ReactNode } from 'react';

import menu from '@config/menu';
import clsx from 'clsx';

interface IProps {
  children?: ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <div className='flex flex-row w-screen h-screen'>
      <nav className='h-screen text-slate-800 flex flex-col p-8 border-r border-slate-200 bg-gray-200'>
        <ul className='flex flex-col gap-2 pt-24'>
          {menu.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={clsx([
                  'flex gap-2 items-center pl-4 pr-12 py-2 rounded',
                  'hover:bg-pink-400 hover:text-pink-800 hover:bg-opacity-50 transition-all duration-300',
                ])}
              >
                {icon}
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className='w-full h-full overflow-y-scroll bg-white'>{children}</div>
    </div>
  );
};

export default Layout;
