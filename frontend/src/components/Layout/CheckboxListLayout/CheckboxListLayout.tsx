import { FC, useState } from 'react';
import styles from '../../../style/ListLayout.module.css';
import CustomCheckbox from '../../UI/CustomCheckbox/CustomCheckbox';

interface ICheckboxListLayoutProps {
    header: string;
    content: string[];
    isCheckedAll: boolean;
    isChecked : boolean[];
    onSelectAllHandler: (value: boolean, rowIndex: number) => void;
    onCheckboxChangeHandler: (value: boolean, rowIndex: number) => void;
}

const CheckboxListLayout: FC<ICheckboxListLayoutProps> = ({header, content, isCheckedAll, isChecked, onSelectAllHandler, onCheckboxChangeHandler}) => {
    const [isListClosed, setIsListClosed] = useState(true);
    const [isShowAllClicked, setIsShowAllClicked] = useState(false)
    
    const getListToggleStyle = () => {
        if (isListClosed) {
            return [styles.listToggleMovable, styles.listToggleMovableClosed].join(' ')
        }
        return styles.listToggleMovable
    }
    const getListLayoutContentStyle = () => {
        if (isListClosed)
            return styles.listLayoutContentHidden
        return styles.listLayoutContent
    }
    const getShowAllRefStyle = () => {
        if (isShowAllClicked)
            return styles.showHiddenRowsRefHidden
        return styles.showHiddenRowsRef
    }
    const getHiddenRowsVisibilityStyle = () => {
        if (!isShowAllClicked)
            return styles.rowHidden
        return null
    }
    return (
        <article className={styles.listLayoutContainer}>
            <div className={styles.listLayoutHeader}>
                {header}
                <div className={styles.toggleWrapper} onClick={() => setIsListClosed(!isListClosed)}>
                    <hr className={styles.listToggleStill} />
                    <span className={getListToggleStyle()} />
                </div>
            </div>
            <div className={getListLayoutContentStyle()}>
                <span className={styles.listContentRow}>
                    <CustomCheckbox isChecked={isCheckedAll} onChangeHandler={onSelectAllHandler} />
                        <span>
                            Все
                        </span>
                    {content.map((item, index) => 
                        {
                            if (index < 4)
                                return <>
                                    <CustomCheckbox 
                                        isChecked={isChecked[index]} 
                                        tableRowIndex={index}
                                        onChangeHandler={onCheckboxChangeHandler} />
                                    <span>
                                        {item}
                                    </span>
                                </>
                            return <>
                                <CustomCheckbox 
                                    isChecked={isChecked[index]} 
                                    tableRowIndex={index}
                                    onChangeHandler={onCheckboxChangeHandler} 
                                    additionalStyles={getHiddenRowsVisibilityStyle()}
                                />
                                <span className={getHiddenRowsVisibilityStyle()}>
                                    {item}
                                </span>
                            </>
                        }
                    )}
                    {content.length > 4 &&
                        <a 
                            className={getShowAllRefStyle()}
                            onClick={() => setIsShowAllClicked(true)}
                        >
                            Показать все
                        </a>
                    }
                </span>
            </div>
        </article>
    )
}

export default CheckboxListLayout;