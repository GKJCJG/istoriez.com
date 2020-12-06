import React from 'react';
import styles from './AdSense.module.scss';

const AdSense = ({...props}) => {
    React.useEffect(() => {
        if (window) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }, []);

    return (
        <div className={`${styles.adsense}`} {...props}>
            <ins className={`adsbygoogle ${styles.ins}`}
                data-ad-client='ca-pub-3285614524562770'
                data-ad-slot={'6150640184'}
                data-ad-format={'auto'}
                data-full-width-responsive='true'/>
        </div>
    );
}

export default AdSense;