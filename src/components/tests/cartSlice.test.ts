import reducer, {
  itemAddedToCart,
  itemDeletedFromCart,
} from '../../store/reducers/cartSlice';
import { itemsToAddToCart } from '../../helpers/testSamples';

describe('CART STATE', () => {
  const initialState = {
    addedItems: [],
    totalInCart: 0,
    totalSum: 0,
  };

  test('return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('handle item added to empty cart', () => {
    expect(reducer(initialState, itemAddedToCart(itemsToAddToCart[1]))).toEqual(
      {
        addedItems: [itemsToAddToCart[1]],
        totalInCart: 1,
        totalSum: 1379,
      },
    );
  });

  test('handle item deleted from cart', () => {
    const updatedCartContent = [itemsToAddToCart[0], itemsToAddToCart[1]];
    expect(
      reducer(
        { addedItems: itemsToAddToCart, totalInCart: 3, totalSum: 2437 },
        itemDeletedFromCart(updatedCartContent),
      ),
    ).toEqual({
      addedItems: updatedCartContent,
      totalInCart: 2,
      totalSum: 1978,
    });
  });
});
