import React from 'react';
import { render } from '@testing-library/react-native';
import { ProductItem } from './ProductItem';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('ProductItem component', () => {
  const item = {
    title: 'Sample product',
    description: 'This is a sample product',
    image: 'image.png',
    price: '$50',
  };
  const component = (
    <Provider store={store}>
      <ProductItem item={item} />
    </Provider>
  );
  it('renders correctly', () => {
    const { getByText } = render(component);
    expect(getByText('Sample product')).toBeDefined();
    expect(getByText('This is a sample product')).toBeDefined();
    expect(getByText('$50')).toBeDefined();
  });
});
