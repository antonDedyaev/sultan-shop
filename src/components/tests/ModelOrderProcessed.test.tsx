import { screen } from '@testing-library/react';
import CartPage from '../CartPage';
import userEvent from '@testing-library/user-event';
import renderHelper from '../../helpers/renderHelper';

describe('MODAL FOR SUCCESSFUL ORDER', () => {
  test('modal should not open if cart is empty', () => {
    renderHelper(<CartPage />);

    const orderButton = screen.getByRole('button');
    const modal = screen.getByTestId('modal-order');
    userEvent.click(orderButton);
    expect(modal).not.toHaveClass('active');
  });

  test('modal should open when cart is not empty', () => {
    renderHelper(<CartPage />);

    const orderButton = screen.getByRole('button');
    const modal = screen.getByTestId('modal-order');
    const addToCartButtons = screen.getAllByTestId('add-to-cart');
    userEvent.click(addToCartButtons[0]);
    userEvent.click(addToCartButtons[1]);
    userEvent.click(orderButton);
    expect(modal).toHaveClass('active');
  });
});
