// redux/slices/resortsSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebase';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  resortsList: [], // Default empty array
  selectedResort: null, // Default value for selected resort
};

const persistConfig = {
  key: 'resorts',
  storage,
  whitelist: ['selectedResort'], // Ensure only selectedResort is persisted
};

export const resortsSlice = createSlice({
  name: 'resorts',
  initialState,
  reducers: {
    setResorts: (state, action) => {
      state.resortsList = action.payload;
    },
    setSelectedResort: (state, action) => {
      state.selectedResort = action.payload;
    },
  },
});

export const fetchResorts = () => async (dispatch) => {
  try {
    const resortsSnapshot = await db.collection('resorts').get();
    const resortsData = resortsSnapshot.docs.map((doc) => doc.data());
    dispatch(setResorts(resortsData));
  } catch (error) {
    console.error('Error fetching resorts:', error);
  }
};

export const { setResorts, setSelectedResort } = resortsSlice.actions;

export const selectResorts = (state) => state?.resorts?.resortsList;
export const selectSelectedResort = (state) => state?.resorts?.selectedResort;

export default persistReducer(persistConfig, resortsSlice.reducer);
