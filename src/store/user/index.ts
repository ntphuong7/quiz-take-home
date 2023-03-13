import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: { isActive: false } as UserState,
  reducers: {
    setUser: (state, { payload: { userInfo, isActive } }: UserPayload) => {
      if (typeof userInfo !== 'undefined') {
        state.userInfo = userInfo;
      }
      if (typeof isActive !== 'undefined') {
        state.isActive = isActive;
      }
    },
  },
});

export const { setUser } = slice.actions;

export default slice.reducer;

// type DarkProps<T> = {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   [K in keyof T]: K extends `${infer Prefix}_dark` ? K : never;
// }[keyof T];

// type PropsWithoutDark<T> = Omit<T, DarkProps<T>>;

export type User = {
  email: string;
  password: string;
  name: string;
  username: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
};
export type UserState = {
  userInfo: User;
  isActive: boolean;
};
type UserPayload = {
  payload: Partial<UserState>;
};
