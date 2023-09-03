import { FC, useEffect, useState } from 'react';
import styles from './MessagePopup.module.css';

const MessagePopup: FC = () => {
    const [isVisible, setIsVisible] = useState(true)
    const [isTimeout, setIsTimeout] = useState(false)
    let messagePopupDelay: NodeJS.Timeout;
    const MESSAGE_POPUP_DELAY_TIME = 5000
    const MESSAGE_POPUP_CLOSING_TIME = 300
    useEffect(() => {
        messagePopupDelay = setTimeout(() => {
            setIsTimeout(true)
        }, MESSAGE_POPUP_DELAY_TIME)
        return () => clearTimeout(messagePopupDelay)
    }, [])
    useEffect(() => {
        if (isTimeout) {
            const delay = setTimeout(() => {
                setIsVisible(false)
            }, MESSAGE_POPUP_CLOSING_TIME)
            return () => clearTimeout(delay)
        }
    }, [isTimeout])
    const getMessagePopupStyle = () => {
        if (!isTimeout)
            return [styles.messagePopup, styles.messagePopupError].join(' ')
        return styles.messagePopupHidden
    }
    const closeMessagePopupManuallyHandler = () => {
        clearTimeout(messagePopupDelay)
        setIsTimeout(true)
    }
    return (
        <>
            {isVisible &&
                <div className={getMessagePopupStyle()}>
                    <span>
                        Response from server dsfasf sdfasdfasdfasf
                    </span>
                    <img src='/img/close.png' className={styles.closePopupImg} onClick={() => closeMessagePopupManuallyHandler()} />
                </div>
            }
        </>
    )
}

export default MessagePopup;