/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../../models/ICartItem';

interface ICart {
  addedItems: ICartItem[];
  totalInCart: number;
  totalSum: number;
}

const addedItems: ICartItem[] = JSON.parse(localStorage.getItem('cartItems')!);
const totalInCart: number = JSON.parse(localStorage.getItem('totalInCart')!);
const totalSum: number = JSON.parse(localStorage.getItem('totalSum')!);

const initialState: ICart = {
  addedItems: addedItems || [],
  totalInCart: totalInCart || 0,
  totalSum: totalSum || 0,
};

const cartSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    itemAddedToCart(state, action: PayloadAction<ICartItem>) {
      const { id, price, addedAmount } = action.payload;
      const matchedItemIndex = state.addedItems.findIndex(
        (item) => item.id === id,
      );
      if (matchedItemIndex === -1) {
        state.addedItems.push(action.payload);
      } else {
        state.addedItems[matchedItemIndex].addedAmount += addedAmount;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.addedItems));
      state.totalSum += price * addedAmount;
      localStorage.setItem('totalSum', JSON.stringify(state.totalSum));
      state.totalInCart += addedAmount;
      localStorage.setItem('totalInCart', JSON.stringify(state.totalInCart));
    },
    itemDeletedFromCart(state, action: PayloadAction<ICartItem[]>) {
      state.addedItems = action.payload;
      localStorage.setItem('cartItems', JSON.stringify(state.addedItems));
      const itemsInCart = action.payload.reduce(
        (acc, item) => acc + item.addedAmount,
        0,
      );
      state.totalInCart = itemsInCart;
      localStorage.setItem('totalInCart', JSON.stringify(state.totalInCart));
      state.totalSum = state.addedItems.reduce(
        (acc, currEl) => acc + currEl.price,
        0,
      );
      localStorage.setItem('totalSum', JSON.stringify(state.totalSum));
    },
    itemAmountSubtracted(state, action: PayloadAction<number>) {
      state.addedItems.forEach((item) => {
        if (item.id === action.payload) {
          item.addedAmount--;
          state.totalInCart--;
          localStorage.setItem(
            'totalInCart',
            JSON.stringify(state.totalInCart),
          );
        }
      });
      localStorage.setItem('cartItems', JSON.stringify(state.addedItems));
    },
    itemAmountAdded(state, action: PayloadAction<number>) {
      state.addedItems.forEach((item) => {
        if (item.id === action.payload) {
          item.addedAmount++;
          state.totalInCart++;
          localStorage.setItem(
            'totalInCart',
            JSON.stringify(state.totalInCart),
          );
        }
      });
      localStorage.setItem('cartItems', JSON.stringify(state.addedItems));
    },
    totalSumCounted(state, action: PayloadAction<number>) {
      state.totalSum = action.payload;
      localStorage.setItem('totalSum', JSON.stringify(state.totalSum));
    },
  },
});

export const {
  itemAddedToCart,
  itemDeletedFromCart,
  itemAmountSubtracted,
  itemAmountAdded,
  totalSumCounted,
} = cartSlice.actions;

export default cartSlice.reducer;
