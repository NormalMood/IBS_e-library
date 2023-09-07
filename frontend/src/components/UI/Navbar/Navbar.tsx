import React, { FC, useContext, useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { logoutServer } from '../../../service/AuthService';
import { AuthContext } from '../../../context/AuthContext';
import { AdditionalHeaderContext } from '../../../context/AdditionalHeaderContext';
import Toolbar from '../../Layout/Toolbar/Toolbar';

const Navbar: FC = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [isBurgerOpened, setIsBurgerOpened] = useState(false)
    const getBurgerStyle = () => {
        if (isBurgerOpened)
            return [styles.headerBurger, styles.headerBurgerOpened].join(' ')
        return styles.headerBurger
    }
    const getMenuStyle = () => {
        if (isBurgerOpened)
            return [styles.navMenu, styles.navMenuOpened].join(' ')
        return styles.navMenu
    }
    const logout = async () => {
        await logoutServer(setIsAuthCallback)
    }
    const setIsAuthCallback = (value: boolean) => {
        setIsAuth(value)
    }
    return (
        <header className="header">
            <nav className="navContainer">
                <div className={styles.headerContainer}>
                    <div className={styles.headerBody}>
                        <div className={styles.profileInfoContainer}>
                            <img 
                                src='https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/2800/Eddie-Morra.Limitless.webp'
                                className={styles.profileImage}
                            />
                            <div className={styles.employeesInfoContainer}>
                                        <span className={styles.employeesName}>Венедиктов Юрий Михайлович</span>
                                        <span className={styles.employeesPosition}>frontend - разработчик</span>
                            </div>
                        </div>
                        <div 
                            className={getBurgerStyle()}
                            onClick={() => setIsBurgerOpened(!isBurgerOpened)}
                        >
                            <span></span>
                        </div>
                        <nav className={getMenuStyle()}>
                            <ul className={styles.navList}>
                                <li>
                                    <Link 
                                        to='/catalog' 
                                        className={styles.navLink}
                                    >
                                        <img src='/img/all_books.png' className={styles.navLinkImg} />
                                        <span>Каталог</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to='/my_books' 
                                        className={styles.navLink}
                                    >
                                        <img src='/img/my_books.png' className={styles.navLinkImg} />
                                        <span>Мои книги</span>
                                    </Link>
                                </li>
                                <li>
                                     {/* <Link 
                                        to='/new_book' 
                                        className={styles.navLink}
                                    >
                                        <img src='/img/add_books.png' className={styles.navLinkImg} />
                                        <span>Новая книга</span>
                                    </Link>  */}
                                    <Link 
                                        to='/admin_panel' 
                                        className={styles.navLink}
                                        onClick={e => {}}
                                    >
                                        <img src='/img/admin_panel.png' className={styles.navLinkImg} />
                                        <span>Админка</span>
                                    </Link>
                                </li>
                                <li> 
                                    <Link to='/login' className={styles.navLink} onClick={async () => await logout()}>
                                        <img src='/img/logout.png' className={styles.navLinkImg} />
                                        <span>Выйти</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;