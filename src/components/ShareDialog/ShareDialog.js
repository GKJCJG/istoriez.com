import React from 'react'
import styles from './ShareDialog.module.scss';
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { slugs } from '../../utils/localization';
import FontIcon from '../FontIcons/FontIcon'
import { strings } from '../../utils/localization'
import ActionSheet from '../ActionSheet/ActionSheet';

const ShareDialog = () => {
    const [show, setShow] = React.useState(false);

    const url = typeof window !== 'undefined' ? window.location.href : 'https://www.istoriez.com'

    return (
        <>
            <FontIcon className={styles.shareicon} onClick={() => setShow(true)} >&#xe80d;</FontIcon>
            {show &&
                <ActionSheet onClose={() => setShow(false)}>
                    <ul className={`${styles.actionlist}`}>
                        <li>
                            <OutboundLink href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank">
                                <span className={styles.facebook}></span>
                                <div>Facebook</div>
                            </OutboundLink>
                        </li>
                        <li>
                            <OutboundLink href={`https://twitter.com/home?status=${url}`} target="_blank">
                                <span className={styles.twitter}></span>
                                <div>Twitter</div>
                            </OutboundLink>
                        </li>
                        <li>
                            <OutboundLink href={`${slugs.shareMailTo}${url}`} target="_blank">
                                <span className={styles.mail}></span>
                                <div>{strings.mail}</div>
                            </OutboundLink>
                        </li>
                    </ul>
                </ActionSheet>
            }
        </>
    );
}

export default ShareDialog;