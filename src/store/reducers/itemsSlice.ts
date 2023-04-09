import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISingleItem } from '../../models/ISingleItem';
import database from '../../utils/database.json';

interface ICareCategory {
  type: string;
  identifier: string;
}

interface IItemsState {
  items: ISingleItem[];
  filteredItems: ISingleItem[];
  typesOfCare: ICareCategory[];
  isLoading: boolean;
  error: string;
}

const initialState: IItemsState = {
  items: database.items,
  filteredItems: [],
  typesOfCare: [
    { type: 'Уход за телом', identifier: 'body-care' },
    { type: 'Уход за руками', identifier: 'hands-care' },
    { type: 'Уход за ногами', identifier: 'feet-care' },
    { type: 'Уход за лицом', identifier: 'face-care' },
    { type: 'Уход за волосами', identifier: 'hair-care' },
    { type: 'Средства для загара', identifier: 'tan-care' },
    { type: 'Средства для бритья', identifier: 'shave-care' },
    { type: 'Подарочные наборы', identifier: 'gift-sets' },
    { type: 'Гигиеническая продукция', identifier: 'hygiene-products' },
    { type: 'Гигиена полости рта', identifier: 'mouth-care' },
    { type: 'Бумажная продукция', identifier: 'paper-products' },
  ],
  isLoading: false,
  error: '',
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    itemsFetching(state) {
      state.isLoading = true;
    },
    itemsLoaded(state, action: PayloadAction<ISingleItem[]>) {
      state.isLoading = false;
      state.error = '';
      state.items = action.payload;
    },
    itemsLoadingFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    itemsFiltered(state, action: PayloadAction<ISingleItem[]>) {
      state.filteredItems = action.payload;
    },
    itemEdited(state, action: PayloadAction<ISingleItem>) {
      const { id } = action.payload;
      const matchedIndex = state.items.findIndex((item) => item.id === id);
      matchedIndex < 0
        ? state.items.push(action.payload)
        : (state.items[matchedIndex] = action.payload);
    },
  },
});

export const {
  itemsFetching,
  itemsLoaded,
  itemsLoadingFailed,
  itemsFiltered,
  itemEdited,
} = itemsSlice.actions;

export default itemsSlice.reducer;
