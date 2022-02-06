import * as React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles, fade } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import clsx from 'clsx';
import ResourceList from './ResourceList'
import SubthemeList from './SubthemeList'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%'
    },
    content: {
        marginTop: '2rem'
    },
    button: {
        marginRight: '1rem',
        transition: '0.3s',
        fontSize: '0.9rem'
    },
    selectedButton: {
        color: theme.palette.background.default,
        backgroundColor: theme.palette.info.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.info.main, 0.9)
        }
    }
}))

export default function Temary(props) {
    const [selected, setSelected] = React.useState('Temas');
    const classes = useStyles();

    const handleClick = e => setSelected(e.currentTarget.innerText);

    const getClassName = v => (selected == v) && classes.selectedButton;

    return (
        <Box className={classes.root}>
            <Typography variant="h6">
                Temario
            </Typography>
            <Box width="max-content" marginTop='1rem'>
                <Button
                    className={clsx(classes.button, getClassName('Temas'))}
                    onClick={handleClick}
                    size='small'
                >
                    Temas
                </Button>
                <Button
                    className={clsx(classes.button, getClassName('Recursos'))}
                    onClick={handleClick}
                    size='small'
                >
                    Recursos
                </Button>
            </Box>
            <Box className={classes.content}>
                {(selected == 'Temas') ? (
                    <SubthemeList {...props} />
                ) : (
                    <ResourceList {...props} />
                )}
            </Box>
        </Box>
    )
}
