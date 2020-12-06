import React from 'react'
import styles from './Button.module.scss'

const Button = ({children, style, onClick}) => {
    return (
        <div onClick={onClick} style={style} className={styles.button}>{children}</div>
    );
}

export default Button;