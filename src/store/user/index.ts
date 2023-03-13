import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: { isActive: false, userInfo: {} } as UserState,
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

export type User = {
  email: string;
  password: string;
  name: string;
  username: string;
  address: string;
  city: string;
  country: string;
  postcode: number;
};
export type UserState = {
  userInfo: User;
  isActive: boolean;
};
type UserPayload = {
  payload: Partial<UserState>;
};
