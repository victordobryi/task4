import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { AiFillDelete, AiFillLock, AiFillUnlock } from 'react-icons/ai';
import UserService from '../../API/UserService';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { authSlice } from '../../store/reducers/auth';
import { isUser } from '../../store/reducers/auth/ActionCreator';

interface IToolbar {
  checkboxes: string[];
}

const Toolbar = ({ checkboxes }: IToolbar) => {
  const dispatch = useAppDispatch();
  const { deleteUsers, blockUsers, unblockUsers } = authSlice.actions;
  const { users } = useAppSelector((state) => state.auth);

  const changedUsers = users.filter(
    (user, id) => checkboxes.indexOf(String(id)) !== -1
  );

  const handleDeleteUsers = async () => {
    try {
      dispatch(isUser());
      changedUsers.forEach((user) => {
        UserService.deleteUser(user.id);
        dispatch(deleteUsers(user.id));
      });
    } catch (error) {
      throw new Error('Error');
    }
  };

  const handleBlockUsers = () => {
    try {
      dispatch(isUser());
      changedUsers.forEach(({ id, password, username }) => {
        const newUser = { id, password, username, isBlock: 1 };
        UserService.updateUser(newUser, id);
        dispatch(blockUsers(id));
      });
    } catch (error) {
      throw new Error('Error');
    }
  };

  const handleUnBlockUsers = () => {
    try {
      dispatch(isUser());
      changedUsers.forEach(({ id, password, username }) => {
        const newUser = { id, password, username, isBlock: 0 };
        UserService.updateUser(newUser, id);
        dispatch(unblockUsers(id));
      });
    } catch (error) {
      throw new Error('Error');
    }
  };

  return (
    <ButtonGroup size="sm">
      <Button>
        <AiFillLock onClick={handleBlockUsers} />
      </Button>
      <Button>
        <AiFillUnlock onClick={handleUnBlockUsers} />
      </Button>
      <Button onClick={handleDeleteUsers}>
        <AiFillDelete />
      </Button>
    </ButtonGroup>
  );
};
export default Toolbar;
