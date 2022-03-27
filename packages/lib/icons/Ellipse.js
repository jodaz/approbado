import React from 'react'
import SvgIcon from "@material-ui/core/SvgIcon";

export default function EllipseIconprops(props) {
    return (
        <SvgIcon {...props}>
            <circle cx="12" cy="12" r="10.5" stroke="current" stroke-width="3"/>
        </SvgIcon>
    )
}

