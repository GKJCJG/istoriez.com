import React from 'react';
import StateLink from '../StateLink';
import LinkTitle from '../LinkTitle';
import { strings, slugs } from '../../utils/localization';
import styles from './Menu.module.scss'
import FontIcon from '../FontIcons/FontIcon'

const Row = ({ to, icon, text }) => {
    return (
        <li>
            <StateLink to={to} className={styles.listitem}>
                <div className={styles.iconcontainer}>
                    <FontIcon>{icon}</FontIcon>
                </div>
                {text}
            </StateLink>
        </li>
    );
}

const Menu = () => {
    return (
        <div className={styles.menu}>
            <LinkTitle headerComponent="h1" title={strings.menu} />
            <ul>
                <Row to={slugs.all} icon="book" text={strings.allBedtimeStories} />
                <Row to={slugs.categories} icon="category" text={strings.allCategories} />
                <Row to={slugs.authors} icon="create" text={strings.allAuthors} />
                <Row to={slugs.ages} icon="category" text={strings.allAges} />
                <Row to={slugs.narrators} icon="record_voice_over" text={strings.allNarrators} />
                <Row to={slugs.audioStories} icon="headset" text={strings.allAudioStories} />
                <Row to={slugs.languages} icon="language" text={strings.selectLanguage} />
                <Row to={slugs.settings} icon="settings" text={strings.settings} />
                <hr />
                <Row to={slugs.about} icon="help" text={strings.aboutIstoriez} />
                {!process.env.GATSBY_PWA &&
                    <Row to={slugs.blog} icon="article" text={strings.blog} />
                }
                <Row to={slugs.privacyPolicy} icon="info" text={strings.privacyPolicy} />
                <Row to={slugs.copyright} icon="copyright" text={strings.copyright} />
                <Row to={slugs.feedback} icon="feedback" text={strings.sendFeedback} />
                {!process.env.GATSBY_PWA &&
                    <Row to={slugs.donate} icon="attach_money" text={strings.donate} />
                }
                <hr />
                {!process.env.GATSBY_PWA &&
                    <>
                        <a href={`https://play.google.com/store/apps/details?id=com.istoriez.twa`} target="_blank">
                            {process.env.GATSBY_SITE_LANG === "en" ?
                                <img className={styles.android} alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' alt="Download on Google Play badge." />
                                :
                                <img className={styles.android} alt='Ladda ned på Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/sv_badge_web_generic.png' alt="Ladda ner på Google Play badge." />
                            }
                        </a>
                    </>
                }
            </ul>
        </div>
    );
};

export default Menu;