import { Navigate } from 'react-router-dom';
import Users from '../../pages/Users';
import Error from '../../pages/NotFound';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Main from '../../pages/Main';

interface IRoutes {
  path: string;
  component: React.ReactNode;
}

enum RoutesName {
  LOGIN = '/login',
  USERS = '/users',
  SIGNUP = '/signup',
  MAIN = '/main'
}

export const publicRoutes: IRoutes[] = [
  {
    path: RoutesName.LOGIN,
    component: <Login />
  },
  {
    path: RoutesName.SIGNUP,
    component: <Signup />
  },
  {
    path: RoutesName.MAIN,
    component: <Main />
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
    component: <Login />
  },
  {
    path: RoutesName.SIGNUP,
    component: <Signup />
  },
  {
    path: RoutesName.USERS,
    component: <Users />
  },
  {
    path: RoutesName.MAIN,
    component: <Main />
  },
  {
    path: '/',
    component: <Navigate to="/main" />
  },
  {
    path: '*',
    component: <Error />
  }
];
