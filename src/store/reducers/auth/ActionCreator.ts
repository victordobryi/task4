import { authSlice, IUser } from '.';
import UserService from '../../../API/UserService';
import { AppDispatch } from '../../store';

export const getUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.setLoading(true));
    const users = (await UserService.getUsers()).data;
    if (users) {
      dispatch(authSlice.actions.setUsers(users));
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  } finally {
    dispatch(authSlice.actions.setLoading(false));
  }
};

export const isUser = () => async (dispatch: AppDispatch) => {
  const id = localStorage.getItem('id');
  if (id) {
    try {
      const user = (await UserService.getUser(id)).data;
      if (user && !user.isBlock) {
        null;
      } else {
        dispatch(userLogout());
      }
    } catch (error) {
      dispatch(userLogout());
    }
  } else {
    null;
  }
};

export const userLogin =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setLoading(true));
      const response = await UserService.getUsers();
      const mockUser = response.data.find(
        (user) => user.username === username && user.password === password
      );
      if (mockUser && !mockUser.isBlock) {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('id', String(mockUser.id));
        dispatch(authSlice.actions.setUser(mockUser));
        dispatch(authSlice.actions.setUsers(response.data));
        dispatch(authSlice.actions.setAuth(true));
      } else if (mockUser?.isBlock) {
        dispatch(authSlice.actions.setError('Юзер заблокирован!'));
      } else {
        dispatch(authSlice.actions.setError('Юзер не найден!'));
      }
      dispatch(authSlice.actions.setLoading(false));
    } catch (e) {
      if (e instanceof Error) {
        dispatch(authSlice.actions.setError(e.message));
      }
    }
  };

export const userLogout = () => async (dispatch: AppDispatch) => {
  localStorage.removeItem('auth');
  localStorage.removeItem('id');
  dispatch(authSlice.actions.setUser({} as IUser));
  dispatch(authSlice.actions.setAuth(false));
  dispatch(authSlice.actions.setError(''));
};
