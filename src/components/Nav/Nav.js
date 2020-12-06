import React from 'react';
import StateLink from '../StateLink/StateLink'
import cn from 'classnames';
import FontIcon from '../FontIcons/FontIcon';
import { navigate, withPrefix } from "gatsby";
import { strings, slugs } from '../../utils/localization';
import styles from './Nav.module.scss';
import { clickEvent } from '../../utils/analytics'
import logo from '../../assets/images/istoriez.png'
import { AgeTabContext } from './agetab-context';

const links = [
    {
        label: 'Start',
        icon: <FontIcon>&#xe88a;</FontIcon>,
        to: '/'
    },
    {
        label: strings.audioStories,
        icon: <FontIcon>&#xe310;</FontIcon>,
        to: slugs.audioStories
    },
    {
        label: strings.yourLibrary,
        icon: <FontIcon style={{ transform: "rotate(-90deg)" }}>&#xe1db;</FontIcon>,
        to: slugs.yourLibrary
    },
    {
        label: strings.menu,
        icon: <FontIcon>&#xe5d2;</FontIcon>,
        to: slugs.menu
    }
];

const TopNavItem = ({ link, index, activeIndex, onNavChange }) => {
    return (
        <div
            index={index}
            onClick={(e) => onNavChange(index, e)}
            className={cn(styles.topnavitem, { [styles.activetoptab]: activeIndex === index })}
        >
            {index === 4 && link.icon}
            <span>{link.label}</span>
        </div>
    )
}

const BottomNavItem = ({ link, index, activeIndex, onNavChange }) => {
    const [activeTab, setActiveTab] = React.useState(false)

    React.useEffect(() => {
        setActiveTab(false);
    }, [activeIndex])

    return (
        <div
            index={index}
            onClick={(e) => onNavChange(index, e)}
            onMouseDown={() => setActiveTab(activeIndex !== index)}
            onTouchStart={() => setActiveTab(activeIndex !== index)}
            onTouchMove={() => setActiveTab(false)}
            onMouseMove={() => setActiveTab(false)}
            className={cn(styles.bottomnavitem, { [styles.bottomnavitemactive]: activeIndex === index }, { [styles.activetab]: activeTab })}
        >
            {link.icon}
            {link.label}
        </div>
    )
}

const Nav = ({ location, dark, onSetDark }) => {
    const [theActiveIndex, setTheActiveIndex] = React.useState(location.pathname)

    React.useEffect(() => {
        setTheActiveIndex(location.pathname)
    }, [location])

    const ageTabContext = React.useContext(AgeTabContext);

    const getIndex = (location) => {
        if (location.pathname === withPrefix('/') || (location.state && location.state.agetab)) {
            return 0;
        }

        if (location.pathname === withPrefix(slugs.audioStories)) {
            return 1;
        }

        if (location.pathname === withPrefix(slugs.yourLibrary)) {
            return 2;
        }

        if (location.pathname === withPrefix(slugs.menu)) {
            return 3;
        }

        return -1;
    };

    const handleNavChange = (activeIndex) => {
        if (activeIndex === 4) {
            navigate(slugs.search)
            return;
        }

        if (activeIndex === 0) {
            const ageTabSlug = process.env.GATSBY_PATH_PREFIX ?
                ageTabContext.pathname.replace(process.env.GATSBY_PATH_PREFIX, '') :
                ageTabContext.pathname;

            navigate(ageTabSlug, { state: { agetab: true } })
        } else {
            navigate(links[activeIndex].to)
        }

        setTheActiveIndex(activeIndex)
        clickEvent("Navigation", links[activeIndex].label, true)
    };

    const index = getIndex(location);

    const activeIndex = index === -1 ? theActiveIndex : index;

    const searchLink = {
        label: strings.search,
        icon: <FontIcon>&#xe8b6;</FontIcon>,
        to: slugs.search
    }

    return (
        <>
            <div className={cn(styles.topnavigation, styles.topnav)}>
                <StateLink to='/' className={styles.logo}>
                    <img src={logo} alt="" />
                </StateLink>
                {[...links, searchLink].map((link, index) => (
                    <TopNavItem key={index} link={link} index={index} activeIndex={activeIndex} onNavChange={handleNavChange} />
                ))}
                <div className={styles.topnavitemwithouthover}>
                    <FontIcon className={styles.themeswitch} onClick={() => onSetDark()}>{dark ? <>&#xe430;</> : <>&#xef44;</>}</FontIcon>
                </div>
            </div>
            <div className={styles.bottomnav}>
                {links.map((link, index) => (
                    <BottomNavItem key={index} link={link} index={index} activeIndex={activeIndex} onNavChange={handleNavChange} />
                ))}
            </div>
        </>
    );
}

export default Nav;