import React from 'react'
import SvgIcon from "@material-ui/core/SvgIcon";

export default function Select(props) {
    return(
        <SvgIcon {...props}>
            <circle cx="12" cy="12" r="10.5" stroke="#206FCA" stroke-width="3"/>
            <circle cx="12" cy="12" r="7" fill="#206FCA"/>
        </SvgIcon>
    )
}

