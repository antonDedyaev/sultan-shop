import { screen } from '@testing-library/react';
import AdminList from '../admin/AdminList';
import userEvent from '@testing-library/user-event';
import renderHelper from '../../helpers/renderHelper';

describe('ADMINISTER CARDS', () => {
  test('open add card form', () => {
    renderHelper(<AdminList />);

    const addButton = screen.getByTestId('add-new-card');
    userEvent.click(addButton);
    expect(screen.getByTestId('edit-card')).toBeInTheDocument();
  });

  test('remove card', () => {
    renderHelper(<AdminList />);

    const itemsBeforeRemoval = screen.getAllByTestId('admin-card');
    const removeButtons = screen.getAllByTestId('remove-card');
    userEvent.click(removeButtons[0]);
    const itemsAfterRemoval = screen.getAllByTestId('admin-card');
    const resultAfterRemoval = itemsBeforeRemoval.length - 1;
    expect(itemsAfterRemoval.length).toEqual(resultAfterRemoval);
  });
});
