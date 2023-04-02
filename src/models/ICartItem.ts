import { ISingleItem } from './ISingleItem';

export interface ICartItem extends ISingleItem {
    addedAmount: number;
}