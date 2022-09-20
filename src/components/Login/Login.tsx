import React, { useState, useRef } from 'react';
import { BsGoogle } from 'react-icons/bs';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import './login.scss';
import { Link } from 'react-router-dom';

interface ILogin {
  type: 'login' | 'signup';
}

const Login = ({ type }: ILogin) => {
  const [isPassword, setIsPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isHidden = () => {
    setIsPassword(!isPassword);
    if (inputRef.current) {
      isPassword
        ? (inputRef.current.type = 'text')
        : (inputRef.current.type = 'password');
    }
  };
  return (
    <div className="login">
      <div className="login__content">
        <h2>{type === 'login' ? 'Login' : 'Signup'}</h2>
        <form className="login__form">
          <input type="text" placeholder="Email" />
          <div className="password">
            <label htmlFor="password">
              {isPassword ? (
                <AiFillEye className="password__eye" onClick={isHidden} />
              ) : (
                <AiFillEyeInvisible
                  className="password__eye"
                  onClick={isHidden}
                />
              )}
            </label>
            <input
              ref={inputRef}
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <button className="login__submit">
            {type === 'login' ? 'Login' : 'Signup'}
          </button>
          <div className="separator">
            <hr />
            <span>OR</span>
            <hr />
          </div>
          <button className="login__google">
            <BsGoogle />
            {type === 'login' ? 'Login with Google' : 'Signup with Google'}
          </button>
          {type === 'login' ? (
            <>
              <span className="login__subtitle">Forgot your password?</span>
              <hr />
              <div className="login__register">
                <span className="login__subtitle">
                  Don&apos;t have an account?
                </span>
                <button>
                  <Link to="/signup">Register</Link>{' '}
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
