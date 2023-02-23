import { useRouter } from 'next/router';

import type { ReactNode } from 'react';

import Link from 'next/link';
import clsx from 'clsx';

import menu from '@config/menu';

interface IProps {
	children?: ReactNode;
}

const Layout = ({ children }: IProps) => {
	const router = useRouter();

	return (
		<div className="flex flex-row w-screen min-h-screen">
			<nav className="h-screen text-slate-800 flex flex-col p-8 border-r border-slate-200 bg-gray-200">
				<ul className="flex flex-col gap-2 pt-24">
					{menu.map(({ href, label, icon }) => (
						<li key={href}>
							<Link
								href={href}
								className={clsx([
									'flex gap-2 items-center pl-4 pr-12 py-2 rounded',
									'hover:bg-pink-400 hover:text-pink-800 hover:bg-opacity-50 transition-all duration-300',
									router.asPath.startsWith(href) && 'text-pink-800 font-medium',
								])}
							>
								{icon}
								{label}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<div className="w-full h-screen overflow-y-scroll bg-white">
				{children}
			</div>
		</div>
	);
};

export default Layout;
