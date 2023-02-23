import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { PayloadAction } from '@reduxjs/toolkit';

import { INotification } from '@type/notifications';

import { AppState } from '@redux/index';

export interface NotificationsState {
	lastId: number;

	notifications: INotification[];
}

const initialState: NotificationsState = {
	notifications: [],
	lastId: 0,
};

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,

	reducers: {
		addNotification: (
			state,
			action: PayloadAction<Omit<INotification, 'id'>>
		) => {
			state.notifications.push({
				...action.payload,
				id: state.lastId++,
			});
		},

		removeNotification: (state, action: PayloadAction<number>) => {
			state.notifications = state.notifications.filter(
				notification => notification.id !== action.payload
			);
		},
	},

	// Special reducer for hydrating the state. Special case for next-redux-wrapper
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.auth,
			};
		},
	},
});

export const { addNotification, removeNotification } =
	notificationsSlice.actions;

export const selectNotifications = (state: AppState) =>
	state.notifications.notifications;

export default notificationsSlice.reducer;
