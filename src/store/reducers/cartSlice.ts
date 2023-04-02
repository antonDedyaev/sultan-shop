import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../../models/ICartItem';

interface ICart {
    addedItems: ICartItem[];
    totalInCart: number;
    totalSum: number;
}

const initialState: ICart = {
    addedItems: [],
    totalInCart: 0,
    totalSum: 0,
}

const cartSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        itemAddedToCart(state, action: PayloadAction<ICartItem>) {
            const { id, price, addedAmount } = action.payload;
            const matchedItemIndex = state.addedItems.findIndex((item) => item.id === id);
            if (matchedItemIndex === -1) {
                state.addedItems.push(action.payload);
            } else {
                state.addedItems[matchedItemIndex].addedAmount += addedAmount;
            }
            state.totalSum += price * addedAmount;
            state.totalInCart += addedAmount;
        },
        itemDeletedFromCart(state, action: PayloadAction<ICartItem[]>) {
            state.addedItems = action.payload;
            state.totalInCart = state.addedItems.length;
        },
        itemAmountSubtracted(state, action: PayloadAction<number>) {
            state.addedItems.forEach((item) => {
                if (item.id === action.payload) {
                    item.addedAmount--;
                    state.totalInCart--;
                }
            })
        },
        itemAmountAdded(state, action: PayloadAction<number>) {
            state.addedItems.forEach((item) => {
                if (item.id === action.payload) {
                    item.addedAmount++;
                    state.totalInCart++;
                }
            })
        },
        totalSumCounted(state, action: PayloadAction<number>) {
            state.totalSum = action.payload;
        }
    },
})

export const { itemAddedToCart, itemDeletedFromCart, itemAmountSubtracted, itemAmountAdded, totalSumCounted } = cartSlice.actions;

export default cartSlice.reducer;