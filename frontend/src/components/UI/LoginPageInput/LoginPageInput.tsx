import React, { FC } from 'react';
import classes from './LoginPageInput.module.css';

interface LoginPageInputProps {
    type?: 'text' | 'email' | 'password';
    placeholder: string;
    value: string;
    setCredential: (credential: React.SetStateAction<string>) => void;
    additionalStyles: string;
    onKeyUpHandler: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const LoginPageInput: FC<LoginPageInputProps> = ({type = 'text', placeholder, value, setCredential, additionalStyles, onKeyUpHandler}) => {
  return (
    <input 
      type={type}
      placeholder={placeholder} 
      value={value}
      onChange={(e) => setCredential(e.target.value)}
      className={[classes.input, additionalStyles].join(' ')}
      onKeyUp={onKeyUpHandler}
     />
  );
}

export default LoginPageInput;
