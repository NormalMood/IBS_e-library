import { FC, useContext, useState } from 'react';
import classes from '../style/Login.module.css';
import LoginPageInput from './UI/LoginPageInput/LoginPageInput';
import CustomButton from './UI/CustomButton/CustomButton';
import { loginServer } from '../service/AuthService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: FC = () => {
    const [username, setUsername] = useState<string>('ymvenediktov@ibs.ru')
    const navigate = useNavigate()
    const [password, setPassword] = useState<string>('user1')
    const { setIsAuth} = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const submit = async () => {
        setIsLoading(true)
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
        await loginServer(setIsAuthCallback)
            .then(response => setIsLoading(false))
    }
    const setIsAuthCallback = async (isAuth: boolean) => {
        setIsAuth(isAuth)
        if (isAuth) 
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
                            {isLoading ?
                                <CustomButton text={'Войти'} styles={[classes.customButtonLoginPage, classes.customButtonLoadingLoginPage].join(' ')} onClick={() => {}} disabled={true} />
                                :
                                <CustomButton text={'Войти'} styles={classes.customButtonLoginPage} onClick={async () => await submit()} />
                            }
                        </div>
                    </div>
                    <div className={classes.greetingTextContainer}>
                        <p className={classes.greetingText}>
                            <b>Добро пожаловать в электронную библиотеку IBS!</b> <br /> <br />
                            Смотрите книги в "Каталоге", берите их и оставляйте рецензии. <br />
                            Чтобы добавить в библиотеку свою книгу, зайдите в раздел "Новая книга".
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;