import React from 'react';
import styles from './AgeTabs.module.scss';
import kebabCase from 'lodash/kebabCase';
import { clickEvent } from '../../utils/analytics';
import { strings } from '../../utils/localization';
import { withPrefix } from 'gatsby';
import { Link as ReachLink } from '@reach/router'

const Tab = ({ value, active, to }) => {
    const [clickingTab, setClickingTab] = React.useState(active && typeof window !== 'undefined')

    React.useEffect(() => {
        setClickingTab(false);
    }, [active])

    return (
        <ReachLink
            state={{
                agetab: true
            }}
            to={to}
            className={clickingTab ? styles.clickingtab : ''}
        >
            <div
                onMouseDown={() => setClickingTab(!active)}
                onMouseMove={() => setClickingTab(false)}
                onTouchStart={() => setClickingTab(!active)}
                onTouchMove={() => setClickingTab(false)}
                onClick={() => clickEvent("AgeClick", value, true)}
                className={`${styles.tab} ${active ? styles.activetab : ''}`}
            >
                {value}
            </div>
        </ReachLink>
    );
}

const AgeTabs = ({ ages, pathname, selection }) => {
    if (!ages || ages.length === 0) {
        return null;
    }

    const ageSelected =
        pathname.endsWith(`0-3/`) ||
        pathname.endsWith(`4-6/`) ||
        pathname.endsWith(`7-12/`);

    return (
        <div className={styles.agetabs}>
            <Tab
                to={selection ? withPrefix(`/${kebabCase(selection)}/`) : withPrefix('/')}
                value={strings.all}
                active={!ageSelected}
            />
            {ages.map((age) => (
                <Tab
                    key={age}
                    to={!ageSelected ? `${pathname}${kebabCase(age)}/` : `${pathname}../${kebabCase(age)}/`}
                    value={`${age} ${strings.years}`}
                    active={pathname.endsWith(`${kebabCase(age)}/`)}
                />
            ))}
        </div>
    );
}

export default AgeTabs;