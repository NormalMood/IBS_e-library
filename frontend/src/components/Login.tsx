import React, { FC } from 'react';
import classes from '../style/Login.module.css';
import LoginPageInput from './UI/LoginPageInput/LoginPageInput';
import CustomButton from './UI/CustomButton/CustomButton';

const Login: FC = () => {
    return (
        <section className={classes.Login}>
            <div className={classes.background}>
                <img src='/img/ibs_library_background.png' className={classes.backgroundImg} />
                <div className={classes.backgroundContentContainer}>
                    <span className={classes.backgroundImgText}>Библиотека</span>
                    <img src='/img/ibs_logo.png' className={classes.backgroundLogo} />
                    <img src='/img/book_shelf.png' className={classes.backgroundIcon} />
                </div>
                <div className={classes.inputAndButtonContainer}>
                    <LoginPageInput type={'email'} placeholder={'E-mail'} />
                    <LoginPageInput placeholder={'Пароль'} />
                    <CustomButton text={'Войти'} />
                </div>
            </div>
            <p className={classes.greetingText}>
                &emsp;<b>Добро пожаловать в электронную библиотеку IBS!</b> <br/>
                &emsp;Вы можете посмотреть все книги в разделе "Каталог". Можно взять понравившиеся книги на один месяц, если они в наличии.
                Имеется возможность продлить взятые книги один раз на две недели. После возврата можно взять ту же книгу, если никто ее не читает.
                Также у Вас есть возможность оставлять рецензии, которые будут видны другим сотрудникам. При желании рецензии можно удалить. 
                Если хотите отдать в библиотеку свою книгу, то необходимо заполнить информацию о ней в разделе "Новая книга". <br />
                &emsp;Приятного чтения!
            </p>

        </section>
    )
}

export default Login;