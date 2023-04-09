import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './reducers/cartSlice';
import itemsReducer from './reducers/itemsSlice';

export const createReduxStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      items: itemsReducer,
      cart: cartSliceReducer,
    },
    preloadedState: initialState,
  });
};

const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>;
// export type AppStore = ReturnType<typeof store>
export type AppDispatch = typeof store.dispatch;
