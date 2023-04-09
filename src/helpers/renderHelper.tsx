import { Provider } from 'react-redux';
import { createReduxStore } from '../store/store';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../components/AppRouter';
import { ReactNode } from 'react';
import { render } from '@testing-library/react';

interface IOptions {
  route: string;
  initialState: object;
}

const renderHelper = (component: ReactNode, options?: IOptions) => {
  const store = createReduxStore(options?.initialState);
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[options?.route || '/']}>
        <AppRouter />
        {component}
      </MemoryRouter>
    </Provider>,
  );
};

export default renderHelper;
