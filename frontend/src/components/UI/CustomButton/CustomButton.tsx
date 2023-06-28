import React, { FC } from 'react';
import { ButtonTypeEnum } from '../../../@types/ButtonTypeEnum';
import classes from './CustomButton.module.css';

interface CustomButtonProps {
    text: string;
    disabled?: boolean;
    type?: ButtonTypeEnum;
}

const CustomButton: FC<CustomButtonProps> = ({text, disabled = false, type = ButtonTypeEnum.PRIMARY}) => {
    return (
        <button className={[classes.customButton, classes.customButtonLoginPage, ].join(' ')}>{text}</button>
    )
}

export default CustomButton;