import React from 'react';
import styles from './Heart.module.scss';
import { addFavoritePath, removeFavoritePath, isFavorite } from '../utils/favoriteManager'
import { clickEvent } from '../../utils/analytics'
import FontIcon from '../FontIcons/FontIcon'

const Heart = ({ pathname }) => {
    const [favorite, setFavorite] = React.useState(isFavorite(pathname))

    const toggleFavorite = () => {
        clickEvent("Post", "Favorite", !favorite)

        if (!favorite) {
            addFavoritePath(pathname);
        } else {
            removeFavoritePath(pathname);
        }

        setFavorite(!favorite)
    }

    return (
        <FontIcon onClick={() => { toggleFavorite() }} className={`${styles.heart} ${favorite ? styles.favorite : ''}`} >{favorite ? <>&#xe87d;</> : <>&#xe87e;</>}</FontIcon>
    )
}

export default Heart;
