import React from 'react';
import { strings } from '../../utils/localization';
import styles from './Languages.module.scss'

const Contact = () => {
    const avoidJsRoutes = (value, lang) => {
        if (typeof window !== "undefined") {
            if (lang === 'en') {
                document.cookie = "nf_lang=en; path=/; expires=Tue, 19 Jan 2038 03:14:07 UTC;";
                document.cookie = "nf_country=us; path=/; expires=Tue, 19 Jan 2038 03:14:07 UTC;";
            }

            if (lang === 'sv') {
                document.cookie = "nf_lang=sv; path=/; expires=Tue, 19 Jan 2038 03:14:07 UTC;";
                document.cookie = "nf_country=se; path=/; expires=Tue, 19 Jan 2038 03:14:07 UTC;";
            }

            window.location.href = value;
        }
    }

    return (
        <ul className={styles.list}>
            <li>
                <button onClick={() => avoidJsRoutes("https://pwa.istoriez.com/", "en")}>
                    <div className="md-ink-container">
                    </div>
                    {strings.english}
                </button>
            </li>
            <li>
                <button onClick={() => avoidJsRoutes("https://pwa.istoriez.com/sv/", "sv")}>
                    <div className="md-ink-container">
                    </div>
                    {strings.swedish}
                </button>
            </li>
        </ul>
    );
}

export default Contact;
