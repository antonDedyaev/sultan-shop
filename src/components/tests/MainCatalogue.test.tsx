import { screen } from '@testing-library/react';
import MainCatalogue from '../MainCatalogue';
import userEvent from '@testing-library/user-event';
import renderHelper from '../../helpers/renderHelper';

test('redirect to item page', () => {
  renderHelper(<MainCatalogue />);

  const items = screen.getAllByTestId('item-link');
  userEvent.click(items[0]);
  expect(screen.getByTestId('item-details-page')).toBeInTheDocument();
});
