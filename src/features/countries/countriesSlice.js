import { createSlice } from '@reduxjs/toolkit';

const { reducer, actions } = createSlice({
  name: 'countries',
  initialState: {
    country: null,
    globalData: {}
  },
  reducers: {
    changeCountry(state, { payload }) {
      return {
        country: payload.country,
        globalData: payload.data
      }
    }
  }
});

export const { changeCountry } = actions;

export default reducer;