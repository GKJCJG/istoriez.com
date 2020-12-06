import React from 'react'
import styles from './LinkTitle.module.scss'
import StateLink from '../StateLink';
import FontIcon from '../FontIcons/FontIcon';

const LinkTitle = ({ href = undefined, title, style, className, headerComponent = 'h2' }) => {
    const Header = headerComponent;
    
    if (href) {
        return (
            <StateLink className={className} to={href} prefetch={false}>
                <div style={style} className={styles.title}>
                    <Header className={styles.header}>
                        {title}
                    </Header>
                    <FontIcon className={styles.forwardarrow}>&#xe5c8;</FontIcon>
                </div>
            </StateLink>
        );
    }

    return (
        <div className={styles.title}>
            <Header className={styles.header} style={style}>
                {title}
            </Header>
        </div>
    );
};

export default LinkTitle;