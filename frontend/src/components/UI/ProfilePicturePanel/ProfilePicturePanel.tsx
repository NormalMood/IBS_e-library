import React, { FC } from 'react';
import styles from './ProfilePicturePanel.module.css';

const ProfilePicturePanel: FC = () => {
    return (
        <article className={styles.panel}>
            <div className={styles.panelRow}></div>
            <div className={styles.panelRow}></div>
        </article>
    )
}

export default ProfilePicturePanel;