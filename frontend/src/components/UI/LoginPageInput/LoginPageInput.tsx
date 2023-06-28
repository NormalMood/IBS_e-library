import React, { FC } from 'react';
import classes from './LoginPageInput.module.css';

interface LoginPageInputProps {
    type?: 'text' | 'email';
    placeholder: string;
}

const LoginPageInput: FC<LoginPageInputProps> = ({type = 'text', placeholder}) => {
  return (
    <input type={type}placeholder={placeholder} className={classes.input} />
  );
}

export default LoginPageInput;
