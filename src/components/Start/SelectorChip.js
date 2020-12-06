import React from 'react';
import styles from './SelectorChip.module.scss';
import Chip from '../Chips/Chip';
import kebabCase from 'lodash/kebabCase';
import { clickEvent } from '../../utils/analytics'

const SelectorChip = ({ suffix, group, linkstate = null, pathname, ...props }) => {    
    if (!group || group.length === 0) {
        return null;
    }

    const item = group.find(item => pathname && pathname.includes(`${kebabCase(item.fieldValue)}/`))

    if (!item) {
        return null;
    }

    return (
        <div className={`${styles.selectorchip} ${styles.center}`} {...props}>
            <Chip active={true} link={`/${kebabCase(item.fieldValue)}${suffix}`} closeLink={'/'} onClick={() => clickEvent("ChipClick", item.fieldValue, true)} className={styles.chip} label={item.fieldValue} agetab={true}/>
        </div>
    );
}

export default SelectorChip;