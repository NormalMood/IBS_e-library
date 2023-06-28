import React, { FC } from 'react';
import styles from './Navbar.module.css';

const Navbar: FC = () => {
    return (
        <nav className={styles.navBackground}>
            <div className={styles.navContainer}>
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
                <div className={styles.employeeLinksContainer}>
                    <a href='#' className={styles.navLink}>
                        <img src='/img/all_books.png' className={styles.navLinkImg} />
                        <span>Каталог</span>
                    </a>
                    <a href='#' className={styles.navLink}>
                        <img src='/img/my_books.png' className={styles.navLinkImg} />
                        <span>Мои книги</span>
                    </a>
                    <a href='#' className={styles.navLink}>
                        <img src='/img/add_books.png' className={styles.navLinkImg} />
                        <span>Новая книга</span>
                    </a>
                    {/* <a href='#' className={styles.navLink}>
                        <img src='/img/admin_panel.png' className={styles.navLinkImg} />
                        <span>Админка</span>
                    </a> */}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;