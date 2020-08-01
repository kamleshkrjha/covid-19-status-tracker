import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'states',
  initialState: {
    province: null,
    indianData: {}
  },
  reducers: {
    changeState(state, { payload }) {
      return {
        province: payload.province,
        indianData: payload.data
      }
    }
  }
});

export const { changeState } = actions;

export default reducer;