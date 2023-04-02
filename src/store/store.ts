import { configureStore } from '@reduxjs/toolkit';
import cartSliceReducer from './reducers/cartSlice';
import itemsReducer from './reducers/itemsSlice';


const store = configureStore({
    reducer: {
        items: itemsReducer,
        cart: cartSliceReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
// export type AppStore = ReturnType<typeof store>
export type AppDispatch = typeof store.dispatch;

export default store;