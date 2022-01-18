import * as React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'
import Resource from './Resource'

const useStyles = makeStyles(() => ({
    root: {
        margin: '0 1rem 1rem 0',
        borderRadius: '6px !important',
        background: '#F9F9F9',
        cursor: 'pointer !important',
        width: '100%',
        '&:hover': {
            boxShadow: "4px 4px 90px 0px #00000014"
        },
        transition: '1s',
    },
}))

const items = [
    {
        id: 1,
        name: 'Recurso 1',
        size: '22 k',
        file: 'public/uploads/1642131027851-reporte-contribuyentes.pdf'
    },
    {
        id: 2,
        name: 'Recurso 2',
        size: '22 k',
        file: 'public/uploads/1642131027851-reporte-contribuyentes.pdf'
    },
]

export default function ResourceList() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            {items.map((item, key) => (
                <Resource
                    key={key}
                    {...item}
                />
            ))}
        </Box>
    )
}
