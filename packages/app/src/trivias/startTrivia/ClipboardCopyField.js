import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextInput from '@approbado/lib/components/TextInput'
import IconCopy from '@approbado/lib/icons/IconCopy'
import { useForm } from 'react-final-form'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: 'underline',
        color: theme.palette.info.main,
        cursor: 'pointer'
    },
    icon: {
        color: theme.palette.info.main,
        cursor: 'pointer'
    }
}));

async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
    } else {
        return document.execCommand('copy', true, text);
    }
}

const ClipboardCopyField = props => {
    const classes = useStyles();
    const [isCopied, setIsCopied] = React.useState(false);
    const form = useForm();

    const handleCopyClick = (e) => {
        const { values } = form.getState();
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(values.link)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <TextInput
            {...props}
            InputProps={{
                endAdornment: (
                    <Box marginRight='6px' display='flex'>
                        <Tooltip
                            title="¡Copiado!"
                            open={isCopied}
                            arrow
                            placement='right'
                        >
                            <IconButton>
                                <IconCopy
                                    className={classes.icon}
                                    onClick={handleCopyClick}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            }}
            onClick={handleCopyClick}
        />
    );
}

export default ClipboardCopyField
