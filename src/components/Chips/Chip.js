import React from 'react';
import FontIcon from '../FontIcons/FontIcon';
import StateLink from '../StateLink';
import styles from './Chip.module.scss'
import cn from 'classnames'

const Chip = ({ label, className, onClick, active, link, closeLink, agetab, style }) => {
    if (active) {
        return (
            <button
                type="button"
                className={cn(styles.chip, className)}
                onClick={onClick}
                style={{ background: "#2196f3", color: "white", border: "1px solid #2196f3", ...style }}
            >
                <StateLink to={link}>
                    <span className={styles.text} style={{ color: "white", display: "block", padding: "2px 0" }}>
                        {label}
                    </span>
                </StateLink>
                <StateLink to={closeLink} state={agetab ? { agetab: true } : {}} replace>
                    <FontIcon className={styles.close}>&#xe5cd;</FontIcon>
                </StateLink>
            </button>
        );
    }

    return (
        <StateLink to={link}>
            <button type="button" className={cn(styles.chip, className)} onClick={onClick}>
                <span className={styles.text}>
                    {label}
                </span>
            </button>
        </StateLink>
    );
}

export default Chip