import { useContext } from 'react';
import { DataContext } from './data-context';

export const globalData = {
  username: '',
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'VERIFY_OTP':
      return {
        ...state,
        username: action.payload,
      };
    case 'RESET':
      return globalData;
    default:
      return state;
  }
};

export const useData = () => useContext(DataContext);
