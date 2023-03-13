import React from 'react';
import { render } from '@testing-library/react-native';
import Brand from './Brand';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('render correctly', () => {
  const component = (
    <Provider store={store}>
      <Brand />
    </Provider>
  );
  render(component);
  expect(component).toBeDefined();
  it('renders the logo text', () => {
    const { getByText } = render(component);
    expect(getByText('LOGO')).toBeDefined();
  });
  it('contains the testID brand-wrapper', () => {
    const { getByTestId } = render(component);
    expect(getByTestId('brand-wrapper')).toBeDefined();
  });
});
