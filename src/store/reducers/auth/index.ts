import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  username: string;
  email: string;
  password: string;
  isBlock?: number;
  createDate: string;
  lastLogin: string;
  id: number;
}

export interface IUserNoId {
  username: string;
  password: string;
  createDate: string;
  email: string;
}

interface Auth {
  isAuth: boolean;
  user: IUser;
  users: IUser[];
  isLoading: boolean;
  error: string;
}

const initialState: Auth = {
  isAuth: false,
  user: {} as IUser,
  users: [],
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
    setUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
    deleteUsers(state, action: PayloadAction<number>) {
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload)
      };
    },
    blockUsers(state, action: PayloadAction<number>) {
      state.users.map((user) =>
        user.id === action.payload ? (user.isBlock = 1) : null
      );
    },
    unblockUsers(state, action: PayloadAction<number>) {
      state.users.map((user) =>
        user.id === action.payload ? (user.isBlock = 0) : null
      );
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

export default authSlice.reducer;
