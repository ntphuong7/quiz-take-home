import React from 'react';
import {
  render,
  fireEvent,
  act,
  waitFor,
  screen,
} from '@testing-library/react-native';
import Login from './Login';
import { USER_KEY } from '../../const';
import { storage } from '../../store';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { NavigationContainer } from '@react-navigation/native';

describe('Login component', () => {
  beforeEach(() => {
    storage.clearAll();
  });

  const component = (
    <Provider store={store}>
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    </Provider>
  );
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(component);
    expect(getByText('Login')).toBeOnTheScreen();
    expect(getByPlaceholderText('Email')).toBeOnTheScreen();
  });

  it('submits incorrectly', async () => {
    const { getByText, getByPlaceholderText } = render(component);
    storage.set(
      USER_KEY,
      JSON.stringify({
        email: 'user@example.com',
        password: 'password',
      }),
    );

    await act(() => {
      fireEvent.changeText(getByPlaceholderText(/email/i), 'user@example.com');
      fireEvent.changeText(getByPlaceholderText(/password/i), 'passworda');
      fireEvent.press(getByText(/login/i));
    });
    expect(getByText('Wrong email or password!')).toBeOnTheScreen();
  });

  // it('submits correctly', async () => {
  //   const { getByText, getByPlaceholderText } = render(component);
  //   storage.set(
  //     USER_KEY,
  //     JSON.stringify({
  //       email: 'user@example.com',
  //       password: 'password',
  //     }),
  //   );

  //   await act(() => {
  //     fireEvent.changeText(getByPlaceholderText(/email/i), 'user@example.com');
  //     fireEvent.changeText(getByPlaceholderText(/password/i), 'password');
  //     fireEvent.press(getByText(/login/i));
  //   });
  //   // await waitFor(() => {
  //   expect(screen.getByText('Login')).not.toBeOnTheScreen();
  //   // });
  //   // expect(getByText('Wrong email or password!')).toBeOnTheScreen();
  // });
});
