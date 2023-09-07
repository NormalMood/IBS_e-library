import React, { FC, useContext, useState } from 'react';
import classes from '../style/Login.module.css';
import LoginPageInput from './UI/LoginPageInput/LoginPageInput';
import CustomButton from './UI/CustomButton/CustomButton';
import { loginServer } from '../service/AuthService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AdditionalHeaderContext } from '../context/AdditionalHeaderContext';

const Login: FC = () => {
    const [username, setUsername] = useState<string>('ymvenediktov@ibs.ru')
    const navigate = useNavigate()
    const [password, setPassword] = useState<string>('user1')
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const submit = async () => {
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
        await loginServer(setIsAuthCallback)
    }
    const setIsAuthCallback = (value: boolean) => {
        setIsAuth(value)
        if (value)
            navigate('/my_books')
    }
    return (
        <section className={classes.Login}>
            <div className={classes.background}>
                <div className={classes.backgroundContentWrapper}>
                    <div className={classes.inputAndButtonWrapper}>
                        <div className={classes.inputAndButtonContainer}>
                            <div className={classes.backgroundContentContainer}>
                                <span className={classes.backgroundImgText}>Библиотека</span>
                                <img src='/img/ibs_logo.png' className={classes.backgroundLogo} />
                                <img src='/img/book_shelf.png' className={classes.backgroundIcon} />
                            </div>
                            <LoginPageInput type={'email'} placeholder={'E-mail'} value={username} setCredential={setUsername} />
                            <LoginPageInput placeholder={'Пароль'} value={password} setCredential={setPassword} />
                            <CustomButton text={'Войти'} styles={classes.customButtonLoginPage} onClick={async () => await submit()} />
                        </div>
                    </div>
                    <div className={classes.greetingTextContainer}>
                        <p className={classes.greetingText}>
                            &emsp;<b>Добро пожаловать в электронную библиотеку IBS!</b> <br /> 
                            &emsp;Смотрите книги в "Каталоге", берите их и оставляйте рецензии. <br />
                            &emsp;Чтобы добавить в библиотеку свою книгу, зайдите в раздел "Новая книга". <br /> 
                            &emsp;<b>Приятного чтения!</b>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;