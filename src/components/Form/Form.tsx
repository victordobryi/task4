import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextField from '../TextField/TextField';
import { Link } from 'react-router-dom';
import './Form.scss';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { isUser, userLogin } from '../../store/reducers/auth/ActionCreator';
import UserService from '../../API/UserService';
import { getCurrentDate } from '../../utils/getCurrentTime';

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

  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(isUser());
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        username: ''
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        const user = {
          username: values.username,
          email: values.email,
          password: values.password,
          createDate: getCurrentDate(),
          lastLogin: getCurrentDate()
        };
        try {
          type === 'signup'
            ? UserService.addUser(user)
                .then((data) => {
                  dispatch(userLogin(values.email, values.password));
                })
                .catch((err) => console.log('Ошибка тут'))
            : dispatch(userLogin(values.email, values.password));
        } catch (error) {
          throw new Error('Err');
        }
      }}
    >
      {(formik) => {
        return (
          <div className="login">
            <div className="login__error">{error}</div>
            <div className="login__content">
              <h2>{type === 'login' ? 'Login' : 'Signup'}</h2>
              <Form className="login__form">
                <TextField
                  label=""
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                {type !== 'login' ? (
                  <TextField
                    label=""
                    name="username"
                    type="text"
                    placeholder="Username"
                  />
                ) : null}
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
                {type === 'login' ? (
                  <>
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
