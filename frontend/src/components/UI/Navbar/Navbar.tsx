import { FC, useContext, useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { logoutServer } from '../../../service/AuthService';
import { AuthContext } from '../../../context/AuthContext';
import useWindowWidth from '../../../hooks/useWindowWidth';
import EmployeeService from '../../../service/EmployeeService';
import { RolesEnum } from '../../../@types/RolesEnum';
import { PositionsMap } from '../../../map/PositionsMap';
import useEmployeeDataStore from '../../../store/useEmployeeDataStore';

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
    const setIsAuthCallback = (isAuth: boolean) => {
        setIsAuth(isAuth)
    }

    const isWidthLess = useWindowWidth(768)

    useEffect(() => {
        if (isBurgerOpened && isWidthLess)
            document.documentElement.style.overflow = 'hidden'
        else
            document.documentElement.removeAttribute('style')
    }, [isBurgerOpened, isWidthLess])

    const employeeFullName = useEmployeeDataStore(state => state.fullName)
    const setFullName = useEmployeeDataStore(state => state.setFullName)

    const employeePosition = useEmployeeDataStore(state => state.position)
    const setPosition = useEmployeeDataStore(state => state.setPosition)

    const isAdmin = useEmployeeDataStore(state => state.isAdmin)
    const setIsAdmin = useEmployeeDataStore(state => state.setIsAdmin)

    useEffect(() => {
        const setUserData = async () => {
            const userData = await EmployeeService.getUserData()
            setFullName(userData.fullName)
            setPosition(userData.position)
            setIsAdmin(userData.isAdmin)
        }
        setUserData()
    }, [])
    
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
                                        <span className={styles.employeesName}>{employeeFullName}</span>
                                        <span className={styles.employeesPosition}>{employeePosition}</span>
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
                                        <span>Корзина</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to='/new_book' 
                                        className={styles.navLink}
                                    >
                                        <img src='/img/add_books.png' className={styles.navLinkImg} />
                                        <span>Новая</span>
                                    </Link>
                                </li>
                                {isAdmin && 
                                    <li>
                                        <Link 
                                            to='/admin_panel' 
                                            className={styles.navLink}
                                            onClick={e => {}}
                                        >
                                            <img src='/img/admin_panel.png' className={styles.navLinkImg} />
                                            <span>Админка</span>
                                        </Link>
                                    </li>
                                }
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