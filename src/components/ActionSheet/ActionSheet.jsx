import React from 'react';
import ReactDOM from 'react-dom';
import styles from './ActionSheet.module.scss';

const ActionSheet = ({ children, onClose }) => {
    const [mounted, setMounted] = React.useState(false)
    
    React.useEffect(() => {
        setMounted(true);
    }, [])

    return ReactDOM.createPortal(
        <div className={styles.actionsheet} onClick={() => onClose()}>
            <div className={`${styles.container} ${mounted ? styles.containermounted : ''}`}>
            </div>
                <div className={`${styles.will} ${mounted ? styles.willmounted : ''}`}>
                    {children}
                </div>
        </div>
        , document.body)
}

export default ActionSheet;