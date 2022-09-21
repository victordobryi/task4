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

export const userLogin =
  (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setLoading(true));
      setTimeout(async () => {
        const response = await UserService.getUsers();
        const mockUser = response.data.find(
          (user) => user.username === username && user.password === password
        );
        if (mockUser) {
          localStorage.setItem('auth', 'true');
          localStorage.setItem('username', mockUser.username);
          dispatch(authSlice.actions.setUser(mockUser));
          dispatch(authSlice.actions.setUsers(response.data));
          dispatch(authSlice.actions.setAuth(true));
        } else {
          dispatch(authSlice.actions.setError('Юзер не найден!'));
        }
        dispatch(authSlice.actions.setLoading(false));
      }, 2000);
    } catch (e) {
      if (e instanceof Error) {
        dispatch(authSlice.actions.setError(e.message));
      }
    }
  };

export const userLogout = () => async (dispatch: AppDispatch) => {
  localStorage.removeItem('auth');
  localStorage.removeItem('username');
  dispatch(authSlice.actions.setUser({} as IUser));
  dispatch(authSlice.actions.setAuth(false));
};
