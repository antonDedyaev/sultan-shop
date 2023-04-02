import { ICartItem } from '../../models/ICartItem';
import { ISingleItem } from '../../models/ISingleItem';
import items from '../../utils/database';
import { AppDispatch } from '../store';
import { itemAddedToCart } from './cartSlice';
import { itemsLoaded, itemsLoadingFailed } from './itemsSlice';

export const loadItems = () => (dispatch: AppDispatch) => {
    try {
        const parsed: ISingleItem[] = JSON.parse(localStorage.getItem('items')!);
        const storedItems = parsed.length === 0 ? items : parsed;
        localStorage.setItem('items', JSON.stringify(storedItems)) // *

        dispatch(itemsLoaded(storedItems));
    } catch (e: any) {
        dispatch(itemsLoadingFailed(e.message));
    }
}

export const onAddToCartClick = (item: ISingleItem | ICartItem, dispatch: AppDispatch, amount?: number) => {
    const setValue = amount ? amount : 1
    const itemToCart = {...item, addedAmount: setValue };
    dispatch(itemAddedToCart(itemToCart));
}
