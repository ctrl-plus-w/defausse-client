import { useEffect, useState } from 'react';

const useKeySwitch = (key: string, defaultState = false) => {
	const [state, setState] = useState(defaultState);

	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (event.key === key) setState(s => !s);
		};

		window.addEventListener('keydown', listener);

		return () => window.removeEventListener('keydown', listener);
	}, []);

	return state;
};

export default useKeySwitch;
