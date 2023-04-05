/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ICartItem } from '../../models/ICartItem';
import { ISingleItem } from '../../models/ISingleItem';
import database from '../../utils/database.json';
import { AppDispatch } from '../store';
import { itemAddedToCart } from './cartSlice';
import { itemsFiltered, itemsLoaded, itemsLoadingFailed } from './itemsSlice';

export const loadItems = () => (dispatch: AppDispatch) => {
  try {
    const parsed: ISingleItem[] = JSON.parse(localStorage.getItem('items')!);
    const storedItems = parsed.length === 0 ? database.items : parsed;
    localStorage.setItem('items', JSON.stringify(storedItems));

    dispatch(itemsLoaded(storedItems));
  } catch (err) {
    dispatch(itemsLoadingFailed((err as Error).message));
  }
};

export const filterByCategory = (
  { currentTarget }: React.MouseEvent<HTMLDivElement>,
  items: ISingleItem[],
  dispatch: AppDispatch,
) => {
  const id = currentTarget.dataset.id;
  const matched = document.querySelectorAll(`div[data-id=${id}]`);
  matched.forEach((item) => item.classList.toggle('activated'));
  const activeCareTypes = document.querySelectorAll('.activated');
  const uniqueCareTypes = new Set();
  activeCareTypes.forEach((type) => uniqueCareTypes.add(type.textContent));
  const filtered = items.filter(
    (item) =>
      item.care &&
      [...uniqueCareTypes].length !== 0 &&
      item.care.includes([...uniqueCareTypes].join('/')),
  );
  dispatch(itemsFiltered(filtered));
};

export const handleAddToCart = (
  item: ISingleItem | ICartItem,
  dispatch: AppDispatch,
  amount?: number,
) => {
  const setValue = amount ? amount : 1;
  const itemToCart = { ...item, addedAmount: setValue };
  dispatch(itemAddedToCart(itemToCart));
};
