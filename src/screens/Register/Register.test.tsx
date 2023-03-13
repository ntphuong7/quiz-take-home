import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Register from './Register';
import { storage } from '../../store';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { NavigationContainer } from '@react-navigation/native';

describe('Register component', () => {
  beforeEach(() => {
    storage.clearAll();
  });

  const component = (
    <Provider store={store}>
      <NavigationContainer>
        <Register />
      </NavigationContainer>
    </Provider>
  );
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(component);
    expect(getByText('Sign Up')).toBeOnTheScreen();
    expect(getByPlaceholderText('Email')).toBeOnTheScreen();
  });

  it('submits incorrectly', async () => {
    const { getByText, getByPlaceholderText } = render(component);
    await act(() => {
      fireEvent.changeText(getByPlaceholderText(/email/i), 'user@example.com');
      fireEvent.changeText(
        getByPlaceholderText(/confirm password/i),
        'passworda',
      );
      fireEvent.press(getByText(/Next/i));
    });
    expect(getByText('name is a required field')).toBeOnTheScreen();
  });

  it('submits incorrectly because of wrong confirm password', async () => {
    const { getByText, getByPlaceholderText } = render(component);

    await act(() => {
      fireEvent.changeText(getByPlaceholderText(/email/i), 'user@example.com');
      fireEvent.changeText(getByPlaceholderText('Password'), 'password');
      fireEvent.changeText(
        getByPlaceholderText(/confirm password/i),
        'passworda',
      );
      fireEvent.press(getByText(/Next/i));
    });
    expect(getByText('Your passwords do not match.')).toBeOnTheScreen();
  });
});
