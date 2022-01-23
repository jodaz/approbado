import * as React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { makeStyles } from '@material-ui/core'
import { ReactComponent as PDFIcon } from '@approbado/lib/icons/PDF.svg'
import configs from '@approbado/lib/configs'
import Link from '@material-ui/core/Link'
import { ReactComponent as DownloadIcon } from '@approbado/lib/icons/download.svg'

const useStyles = makeStyles(() => ({
    root: {
        margin: '0 1rem 1rem 0',
        borderRadius: '6px !important',
        background: '#F9F9F9',
        width: '100%',
        height: 'max-content',
        '&:hover': {
            boxShadow: "4px 4px 90px 0px #00000014"
        },
    },
    content: {
        padding: '8px 16px'
    },
    action: {
        alignSelf: 'unset'
    }
}))

export default function Resource({ title, size, key, file }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} key={key}>
            <CardHeader
                avatar={<PDFIcon />}
                title={
                    <Link
                        href={`${configs.SOURCE}/${file}`}
                        underline="hover"
                        target="_blank"
                        color="primary"
                    >
                        {title}
                    </Link>
                }
                subheader={size}
                className={classes.content}
                action={<DownloadIcon />}
                classes={{ action: classes.action }}
            />
        </Card>
    )
}
