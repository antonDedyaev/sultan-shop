import { screen } from '@testing-library/react';
import Filters from '../Filters';
import userEvent from '@testing-library/user-event';
import renderHelper from '../../helpers/renderHelper';

test('filter by manufacturer', () => {
  renderHelper(<Filters />);

  const checkboxes = screen.getAllByRole('checkbox');
  userEvent.click(checkboxes[1]);
  const checkedValue = checkboxes[1].id;
  expect(checkboxes[1]).toBeChecked();

  const filtered = screen.getAllByRole('manufacturer');
  filtered.forEach((item) => expect(item.textContent).toEqual(checkedValue));
});
