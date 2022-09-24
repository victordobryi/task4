import React, { useEffect, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import UserService from '../../API/UserService';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { authSlice } from '../../store/reducers/auth';
import { isUser } from '../../store/reducers/auth/ActionCreator';
import Toolbar from '../Toolbar/Toolbar';

const Users = () => {
  const { users, isLoading } = useAppSelector((state) => state.auth);
  const [all, setAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const { setUsers } = authSlice.actions;

  useEffect(() => {
    setCheckboxes([]);
    setAll(false);
  }, [users]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await UserService.getUsers();
        dispatch(setUsers(response.data));
      } catch (error) {
        throw new Error('Err');
      }
    };
    fetchAllUsers();

    dispatch(isUser());
  }, []);

  useEffect(() => {
    all
      ? setCheckboxes(
          [...Array(users.length)].map((item, id) => (item = String(id)))
        )
      : setCheckboxes([]);
  }, [all]);

  useEffect(() => {
    dispatch(isUser());
  }, [checkboxes]);

  const changeCheckboxes = (id: string) => {
    setCheckboxes(
      checkboxes.includes(id)
        ? checkboxes.filter((el) => el !== id)
        : [...checkboxes, id]
    );
  };

  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <div className="d-flex flex-column ">
      <Toolbar checkboxes={checkboxes} />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th style={{ fontSize: 14 }}>
              select all
              <br />
              /deselect
              <Form.Check
                type="checkbox"
                id="all"
                checked={all}
                onChange={() => setAll(!all)}
              />
            </th>
            <th>#</th>
            <th>name</th>
            <th>email</th>
            <th>created date</th>
            <th>last login</th>
            <th>status</th>
          </tr>
        </thead>
        {users?.map(
          ({ username, createDate, email, lastLogin, isBlock }, id) => (
            <tbody key={id}>
              <tr>
                <td>
                  <Form.Check
                    type="checkbox"
                    id={`${id}`}
                    checked={checkboxes.includes(`${id}`)}
                    onChange={(event) => changeCheckboxes(event.target.id)}
                  />
                </td>
                <td>{id + 1}</td>
                <td>{username}</td>
                <td>{email}</td>
                <td>{createDate}</td>
                <td>{lastLogin}</td>
                <td>{isBlock ? 'blocked' : 'not blocked'}</td>
              </tr>
            </tbody>
          )
        )}
      </Table>
    </div>
  );
};

export default Users;
