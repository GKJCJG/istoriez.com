import React from 'react';
import { strings, slugs } from '../../utils/localization';
import styles from './Footer.module.scss'
import StateLink from '../StateLink/StateLink'
import logo from '../../assets/images/istoriez.png'
import FontIcon from '../FontIcons/FontIcon'

const Footer = ({ audioplaying }) => {
    return (
        <footer className={styles.footer} style={audioplaying ? { marginBottom: "107px" } : {}}>
            <div className={styles.icons}>
                <StateLink to='/' className={styles.logo}>
                    <div>
                        <img src={logo} alt="Logo" />
                    </div>
                </StateLink>
                <a href={slugs.facebook}>
                    <FontIcon>&#xf234;</FontIcon>
                </a>
            </div>
            <div className={styles.text}>
                <span>© iStoriez 2019-2020.</span>
                <span style={{ whiteSpace: "nowrap" }}> {strings.stories} {strings.online}.</span>
            </div>
        </footer>
    );
}

export default Footer;