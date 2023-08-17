/* eslint-disable functional/no-return-void */
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShow: false,
  type: null,
  extraData: null,
};

const modalSlice = createSlice({
  name: 'modalInfo',
  initialState,
  reducers: {
    isOpen(state, { payload }) {
      const { type, extraData } = payload;
      state.isShow = true;
      state.type = type;
      state.extraData = extraData;
    },
    isClose(state) {
      state.isShow = false;
      state.type = null;
      state.extraData = null;
    },
  },
});

export default modalSlice.reducer;
export const { isOpen, isClose } = modalSlice.actions;
