import React, { useEffect, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { getUsers } from '../../store/reducers/auth/ActionCreator';
import Toolbar from '../Toolbar/Toolbar';

const Users = () => {
  const { users, isLoading } = useAppSelector((state) => state.auth);
  const [all, setAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    all
      ? setCheckboxes(
          [...Array(users.length)].map((item, id) => (item = String(id)))
        )
      : setCheckboxes([]);
  }, [all]);

  useEffect(() => {
    setCheckboxes([]);
    setAll(false);
  }, [users]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

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
            <th>User email</th>
          </tr>
        </thead>
        {users?.map(({ username }, id) => (
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
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default Users;
