import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { AiFillDelete, AiFillLock, AiFillUnlock } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { authSlice } from '../../store/reducers/auth';

interface IToolbar {
  checkboxes: string[];
}

const Toolbar = ({ checkboxes }: IToolbar) => {
  const dispath = useAppDispatch();
  const { deleteUsers, blockUsers, unblockUsers } = authSlice.actions;
  const { users } = useAppSelector((state) => state.auth);
  const changedUsers = users.filter(
    (user, id) => checkboxes.indexOf(String(id)) !== -1
  );

  const handleDeleteUsers = () => {
    changedUsers.forEach((user) => dispath(deleteUsers(user.id)));
  };

  const handleBlockUsers = () => {
    changedUsers.forEach((user) => dispath(blockUsers(user.id)));
  };

  const handleUnBlockUsers = () => {
    changedUsers.forEach((user) => dispath(unblockUsers(user.id)));
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
