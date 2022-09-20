import { Navigate } from 'react-router-dom';
import UsersPage from '../../pages/UsersPage';
import ErrorPage from '../../pages/NotFound';
import MainPage from '../../pages/LoginPage';

interface IRoutes {
  path: string;
  component: React.ReactNode;
}

enum RoutesName {
  LOGIN = '/main',
  USERS = '/users'
}

export const publicRoutes: IRoutes[] = [
  {
    path: RoutesName.LOGIN,
    component: <MainPage />
  },
  {
    path: '/',
    component: <Navigate to="/main" />
  },
  {
    path: '*',
    component: <Navigate to="/main" />
  }
];

export const privateRoutes: IRoutes[] = [
  {
    path: RoutesName.LOGIN,
    component: <MainPage />
  },
  {
    path: RoutesName.USERS,
    component: <UsersPage />
  },
  {
    path: '/',
    component: <Navigate to="/main" />
  },
  {
    path: '*',
    component: <ErrorPage />
  }
];
