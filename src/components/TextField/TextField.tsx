import React, { useRef, useState } from 'react';
import { useField, ErrorMessage } from 'formik';
import { CgDanger } from 'react-icons/cg';
import {
  AiFillCheckCircle,
  AiFillEye,
  AiFillEyeInvisible
} from 'react-icons/ai';
import './TextField.scss';

interface ITextField {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
}

const TextField = (props: ITextField) => {
  const [field, meta] = useField(props);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isHidden = () => {
    setIsPasswordOpen(!isPasswordOpen);
    if (inputRef.current) {
      !isPasswordOpen
        ? (inputRef.current.type = 'text')
        : (inputRef.current.type = 'password');
    }
  };
  return (
    <div className="form-control">
      {props.type === 'password' ? (
        !isPasswordOpen ? (
          <AiFillEye className="password__eye" onClick={isHidden} />
        ) : (
          <AiFillEyeInvisible className="password__eye" onClick={isHidden} />
        )
      ) : null}
      {props.label ? <label htmlFor={field.name}>{props.label}</label> : null}

      <input
        {...field}
        {...props}
        className={`${
          (meta.touched && meta.error && 'is-invalid') ||
          (meta.touched && !meta.error && 'is-valid')
        }`}
        autoComplete="off"
        ref={inputRef}
      />
      <ErrorMessage name={field.name} component={'small'} className="error" />
      {props.type !== 'password' ? (
        meta.error ? (
          <CgDanger
            className={`icon ${
              (meta.touched && meta.error && 'icon-invalid') ||
              (meta.touched && !meta.error && 'icon-valid')
            }`}
          />
        ) : (
          <AiFillCheckCircle
            className={`icon ${
              (meta.touched && meta.error && 'icon-invalid') ||
              (meta.touched && !meta.error && 'icon-valid')
            }`}
          />
        )
      ) : null}
    </div>
  );
};

export default TextField;
