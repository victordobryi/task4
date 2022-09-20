import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Auth {
  isAuth: boolean;
}

const initialState: Auth = {
  isAuth: false
};

export const authSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    changeIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    }
  }
});

export default authSlice.reducer;
