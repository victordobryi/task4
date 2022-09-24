import React, { useEffect } from 'react';
import { useAppDispatch } from '../../redux-hooks';
import { isUser } from '../../store/reducers/auth/ActionCreator';
import './style.scss';

const Main = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(isUser());
  });
  return <div className="main">Task4</div>;
};

export default Main;
