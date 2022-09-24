import React from 'react';
import { Spinner } from 'react-bootstrap';
import FormComponent from '../../components/Form/Form';
import { useAppSelector } from '../../redux-hooks';

const Signup = () => {
  const { isLoading } = useAppSelector((state) => state.auth);

  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <FormComponent type="signup" />
    </div>
  );
};

export default Signup;
