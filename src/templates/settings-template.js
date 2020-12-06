import React from 'react';
import Page from '../components/Page';
import LinkTitle from '../components/LinkTitle'
import { strings } from '../utils/localization';
import { isUppercase, toggleUppercase } from '../utils/text'
import { isDarkTheme, toggleDarkTheme } from '../utils/theme'
import styles from './settings-template.module.scss'
import Switch from '../components/SelectionControls/Switch';

const SettingsTemplate = () => {
    return (
        <Page pageTitle={strings.settings} description={strings.subtitle}>
            <LinkTitle headerComponent="h1" title={strings.settings} />
            <Switch
                className={styles.switchone}
                id="switch-dark"
                label={strings.darkTheme}
                defaultChecked={isDarkTheme()}
                onChange={() => { toggleDarkTheme() }}
            />
            <Switch
                className={styles.switchtwo}
                id="switch-uppercase"
                label={strings.uppercase}
                defaultChecked={isUppercase()}
                onChange={() => { toggleUppercase() }}
            />
        </Page>
    );
};

export default SettingsTemplate;
