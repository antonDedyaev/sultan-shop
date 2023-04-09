import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../components/AppRouter';
import { ReactNode } from 'react';

export const renderWithRouter = (component: ReactNode, initialRoute = '/') => {
  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <AppRouter />
      {component}
    </MemoryRouter>
  );
};
