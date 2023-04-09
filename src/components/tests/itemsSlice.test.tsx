import MainCatalogue from '../MainCatalogue';
import reducer, {
  itemEdited,
  itemsFiltered,
  itemsLoaded,
} from '../../store/reducers/itemsSlice';
import { initialItems, loadedItems } from '../../helpers/testSamples';
import renderHelper from '../../helpers/renderHelper';

describe('ITEMS STATE', () => {
  const initialState = {
    items: initialItems,
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

  test('load items', () => {
    renderHelper(<MainCatalogue />, {
      route: '/',
      initialState: {
        items: initialState,
      },
    });

    expect(reducer(initialState, itemsLoaded(loadedItems))).toEqual({
      ...initialState,
      items: loadedItems,
    });
  });

  test('filter items', () => {
    renderHelper(<MainCatalogue />, {
      route: '/',
      initialState: {
        items: initialState,
      },
    });

    expect(reducer(initialState, itemsFiltered([initialItems[2]]))).toEqual({
      ...initialState,
      filteredItems: [initialItems[2]],
    });
  });

  describe('EDIT CARDS', () => {
    test('edit existing item', () => {
      const updatedItem = Object.assign({}, initialItems[0]);
      updatedItem.name = 'Набор кремов для лица';
      updatedItem.price = 1500;

      const clone = initialItems.slice();
      clone[0] = updatedItem;

      expect(reducer(initialState, itemEdited(updatedItem))).toEqual({
        ...initialState,
        items: clone,
      });
    });

    test('add new item', () => {
      const createdItem = Object.assign({}, initialItems[1]);
      createdItem.id = 22;

      expect(reducer(initialState, itemEdited(createdItem))).toEqual({
        ...initialState,
        items: [...initialItems, createdItem],
      });
    });
  });
});
