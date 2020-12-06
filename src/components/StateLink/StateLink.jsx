import React from 'react';
import { Link, withPrefix } from 'gatsby';
import { Link as ReachLink } from '@reach/router'

const StateLink = ({ to, children, disabled, state, prefetch = true, ...props }) => {
    if (disabled) {
        return (
            <a {...props}>
                {children}
            </a>
        )
    }

    if (!prefetch) {
        return (
            <ReachLink {...props} to={withPrefix(to)} state={{ iStoriez: true, ...state }}>
                {children}
            </ReachLink>
        )
    }

    return (
        <Link {...props} to={to} state={{ iStoriez: true, ...state }}>
            {children}
        </Link>
    );
};

export default StateLink;
