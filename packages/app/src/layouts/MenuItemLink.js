import React, {
    forwardRef,
    cloneElement,
    useCallback
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setSidebarVisibility } from 'ra-core';
import {
    MenuItem,
    ListItemIcon,
    Tooltip,
    useMediaQuery
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const NavLinkRef = forwardRef((props, ref) => (
    <NavLink innerRef={ref} {...props} />
));

const useStyles = makeStyles(
    theme => ({
        root: {
            color: theme.palette.primary.light,
        },
        active: {
            color: theme.palette.secondary.main,
        },
        icon: {
            minWidth: theme.spacing(5),
            fill: '#B7B7B7'
        },
    }),
    { name: 'RaMenuItemLink' }
);

const MenuItemLink = forwardRef((props, ref) => {
    const {
        classes: classesOverride,
        className,
        primaryText,
        leftIcon,
        onClick,
        sidebarIsOpen,
        tooltipProps,
        ...rest
    } = props;
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const open = useSelector((state) => state.admin.ui.sidebarOpen);
    const handleMenuTap = useCallback(
        e => {
            if (isSmall) {
                dispatch(setSidebarVisibility(false));
            }
            onClick && onClick(e);
        },
        [dispatch, isSmall, onClick]
    );

    const renderMenuItem = () => {
        return (
            <MenuItem
                className={classnames(classes.root, className)}
                activeClassName={classes.active}
                component={NavLinkRef}
                ref={ref}
                tabIndex={0}
                {...rest}
                onClick={handleMenuTap}
            >
                {leftIcon && (
                    <ListItemIcon className={classes.icon}>
                        {cloneElement(leftIcon, {
                            titleAccess: primaryText,
                        })}
                    </ListItemIcon>
                )}
                {primaryText}
            </MenuItem>
        );
    };

    return open ? (
        renderMenuItem()
    ) : (
        <Tooltip title={primaryText} placement="right" {...tooltipProps}>
            {renderMenuItem()}
        </Tooltip>
    );
});

MenuItemLink.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    leftIcon: PropTypes.element,
    onClick: PropTypes.func,
    primaryText: PropTypes.node,
    staticContext: PropTypes.object,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    sidebarIsOpen: PropTypes.bool,
};

export default MenuItemLink;
