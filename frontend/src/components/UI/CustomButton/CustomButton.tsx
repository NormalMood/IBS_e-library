import React, { FC } from 'react';
import { ButtonTypeEnum } from '../../../@types/ButtonTypeEnum';
import classes from './CustomButton.module.css';

interface CustomButtonProps {
    text: string;
    styles?: React.HTMLAttributes<any>;
    disabled?: boolean;
    type?: ButtonTypeEnum;
    onClick: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({text, styles = null, disabled = false, type = ButtonTypeEnum.PRIMARY, onClick}) => {
    return (
        <>
            {type === ButtonTypeEnum.PRIMARY && 
                <button
                className={[classes.customButton, styles].join(' ')}
                disabled={disabled}
                onClick={onClick}
                >
                    {text}
                </button>
            }
            {type === ButtonTypeEnum.SECONDARY && 
                <button
                className={[classes.customButton, classes.customButtonSecondary, styles].join(' ')}
                disabled={disabled}
                onClick={onClick}
                >
                    {text}
                </button>
            }
        </>
    )
}

export default CustomButton;