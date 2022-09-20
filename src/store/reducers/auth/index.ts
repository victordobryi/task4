import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  username: string;
  password: string;
}

interface Auth {
  isAuth: boolean;
  user: IUser;
  isLoading: boolean;
  error: string;
}

const initialState: Auth = {
  isAuth: false,
  user: {} as IUser,
  isLoading: false,
  error: ''
};

export const authSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
      state.isLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

export default authSlice.reducer;
