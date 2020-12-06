import React from 'react'
import ActionSheet from '../ActionSheet/ActionSheet'
import kebabCase from 'lodash/kebabCase';
import styles from './Selector.module.scss'
import FontIcon from '../FontIcons/FontIcon'
import { clickEvent } from '../../utils/analytics'
import StateLink from '../StateLink';

const Selector = ({ title, group, pathname, ...props }) => {
    const [more, setMore] = React.useState(false)

    return (
        <>
            <div className={styles.selector} onClick={() => setMore(true)} {...props}>
                {title} <FontIcon style={{ verticalAlign: "sub" }}>&#xe5c5;</FontIcon>
            </div>
            {more &&
                <ActionSheet onClose={() => setMore(false)}>
                    <div className={styles.actionsheet}>
                        <ul >
                            {group.map((item) => (
                                <StateLink replace key={item.fieldValue} to={pathname && pathname.includes(`${kebabCase(item.fieldValue)}/`) ? '/' : `/${kebabCase(item.fieldValue)}/`} state={{ agetab: true }}>
                                    <li onClick={() => clickEvent("SelectorClick", item.fieldValue, true)}>{item.fieldValue}</li>
                                </StateLink>
                            ))}
                        </ul>
                    </div>
                </ActionSheet>
            }
        </>
    )
}

export default Selector;