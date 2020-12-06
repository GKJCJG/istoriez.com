import React from 'react';
import styles from './ChipCarousel.module.scss';
import Chip from '../Chips/Chip';
import kebabCase from 'lodash/kebabCase';
import { clickEvent } from '../../utils/analytics'

const ChipCarousel = ({ group, suffix}) => {
    if (!group || group.length === 0) {
        return null;
    }

    return (
        <div className={styles.chiplist}>
            {group.map((item) => (
                <Chip key={item.fieldValue} link={`/${kebabCase(item.fieldValue)}${suffix || '/'}`} onClick={() => clickEvent("ChipClick", item.fieldValue, true)} className={styles.chip} label={item.fieldValue} />
            ))}
        </div>
    );
}

export default ChipCarousel;