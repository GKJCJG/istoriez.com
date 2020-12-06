import React from 'react';
import cn from 'classnames';

const FontIcon = ({ children, className, ...props }) => {
    return (
        <i {...props} className={cn('material-icons', className)}>
            {children}
        </i>
    );
}

export default FontIcon;