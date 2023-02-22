import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { PayloadAction } from '@reduxjs/toolkit';

import { Script } from '@type/models';

import { AppState } from '@redux/index';

export interface ScriptState {
  script?: Script;
  loading: boolean;
}

const initialState: ScriptState = {
  loading: true,
};

export const scriptSlice = createSlice({
  name: 'script',
  initialState,

  reducers: {
    setScript: (state, action: PayloadAction<Script>) => {
      state.script = action.payload;
      state.loading = false;
    },

    updateScript: (state, action: PayloadAction<Script>) => {
      state.script = action.payload;
    },

    resetScript: (state) => {
      state.script = undefined;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
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

export const { resetScript, updateScript, setScript, setLoading } = scriptSlice.actions;

export const selectScript = (state: AppState) => state.script.script;
export const selectScriptIsLoading = (state: AppState) => state.script.loading;

export default scriptSlice.reducer;
