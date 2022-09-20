import React from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '../TextField/TextField';
import { BsGoogle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import './Form.scss';
import { useAppDispatch } from '../../redux-hooks';
import { authSlice } from '../../store/reducers/auth';

interface ILogin {
  type: 'login' | 'signup';
}

const FormComponent = ({ type }: ILogin) => {
  const validate = Yup.object({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(1, 'Password must be at least 1 character')
      .required('Password is required'),
    confirmPassword:
      type !== 'login'
        ? Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Confirm password is required')
        : Yup.string()
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { changeIsAuth } = authSlice.actions;
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        dispatch(changeIsAuth(true));
        navigate('/users');
      }}
    >
      {(formik) => {
        return (
          <div className="login">
            <div className="login__content">
              <h2>{type === 'login' ? 'Login' : 'Signup'}</h2>
              <Form className="login__form">
                <TextField
                  label=""
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <TextField
                  label=""
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                {type !== 'login' ? (
                  <TextField
                    label=""
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirmed Password"
                  />
                ) : null}

                <div className="form__buttons">
                  <button type="submit" className="login__submit">
                    {type === 'login' ? 'Login' : 'Signup'}
                  </button>
                  <button type="reset" className="login__reset">
                    Reset
                  </button>
                </div>
                <div className="separator">
                  <hr />
                  <span>OR</span>
                  <hr />
                </div>
                <button className="login__google">
                  <BsGoogle />
                  {type === 'login'
                    ? 'Login with Google'
                    : 'Signup with Google'}
                </button>
                {type === 'login' ? (
                  <>
                    <span className="login__subtitle">
                      Forgot your password?
                    </span>
                    <hr />
                    <div className="login__register">
                      <span className="login__subtitle">
                        Don&apos;t have an account?
                      </span>
                      <button>
                        <Link to="/signup">Register</Link>
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default FormComponent;
