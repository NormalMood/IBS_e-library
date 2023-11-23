import { FC, useEffect, useState } from 'react';
import styles from './MessagePopup.module.css';
import { IMessageCodeResponse } from '../../../@types/IMessageCodeResponse';
import { BAD_REQUEST_RESPONSE_CODE, NETWORK_CONNECT_TIMEOUT_ERROR_RESPONSE_CODE } from '../../../api/axiosInstance';

const MessagePopup: FC<IMessageCodeResponse> = ({message, code}) => {
    const [isVisible, setIsVisible] = useState(true)
    const [isTimeout, setIsTimeout] = useState(false)
    let messagePopupDelay: NodeJS.Timeout;
    const MESSAGE_POPUP_DELAY_TIME = 5000
    const MESSAGE_POPUP_CLOSING_TIME = 200
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
        if (!isTimeout && code >= BAD_REQUEST_RESPONSE_CODE && code <= NETWORK_CONNECT_TIMEOUT_ERROR_RESPONSE_CODE)
            return [styles.messagePopup, styles.messagePopupError].join(' ')
        else if (!isTimeout)
            return [styles.messagePopup, styles.messagePopupOk].join(' ')
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
                        {message}
                    </span>
                    <img src='/img/close.png' className={styles.closePopupImg} onClick={() => closeMessagePopupManuallyHandler()} />
                </div>
            }
        </>
    )
}

export default MessagePopup;