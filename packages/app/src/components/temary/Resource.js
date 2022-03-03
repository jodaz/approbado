import * as React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { makeStyles } from '@material-ui/core'
import { ReactComponent as PDFIcon } from '@approbado/lib/icons/PDF.svg'
import configs from '@approbado/lib/configs'
import Link from '@material-ui/core/Link'
import { ReactComponent as DownloadIcon } from '@approbado/lib/icons/download.svg'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(() => ({
    root: {
        margin: '0 1rem 1rem 0',
        background: 'transparent',
        width: '100%',
        height: 'max-content',
        border: 'none'
    },
    content: {
        padding: '8px 16px'
    },
    action: {
        alignSelf: 'unset'
    }
}))

export default function Resource({ id, title, size, key, file }) {
    const classes = useStyles();
    const [provider] = useFileProvider(fileProvider);

    const handleDownload = React.useCallback(async () => {
        try {
            await provider({
                resource: 'files/download',
                type: 'getOne',
                payload: {
                    name: `${title}`,
                    ext: 'pdf',
                    record: id
                }
            });
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [provider, id]);

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
                action={
                    <IconButton onClick={handleDownload}>
                        <DownloadIcon />
                    </IconButton>
                }
                classes={{ action: classes.action }}
            />
        </Card>
    )
}
