import React from 'react';
import FontIcon from '../FontIcons/FontIcon'
import { isStar, getStar, addStarPath } from '../utils/starManager';
import { clickEvent } from '../../utils/analytics';
import { strings } from '../../utils/localization'
import styles from './Stars.module.scss'

const Results = ({ count }) => {
    return [...Array(count).keys()].map((e, i) => <FontIcon className={styles.resultstar} key={i}>&#xe838;</FontIcon>)
}

const Stars = ({ path }) => {
    const [vote, setVote] = React.useState(getStar(path) ? getStar(path).value : 0);
    const [is, setIs] = React.useState(isStar(path))
    const [hoveredStars, setHoveredStars] = React.useState(0);

    const onClick = (value) => {
        addStarPath(path, value)
        clickEvent("Star", path, value)
        setIs(true);
        setVote(value);
    }

    const HoverStar = ({index}) => {
        return <FontIcon className={`${styles.votingstar} ${hoveredStars >= index ? styles.hover : ''}`} onMouseOver={() => setHoveredStars(index)} onMouseOut={() => setHoveredStars(0)} onClick={() => onClick(index)}>&#xe838;</FontIcon>
    }

    return (
        <div className={styles.votingcontainer}>
            <div className={styles.yourgrade}>{strings.yourGrade}</div>
            {is ?
                <Results count={vote} />
                :
                <>
                    <HoverStar index={1}/>
                    <HoverStar index={2}/>
                    <HoverStar index={3}/>
                    <HoverStar index={4}/>
                    <HoverStar index={5}/>
                </>
            }
        </div>
    )
}

export default Stars;