import * as React from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '@approbado/lib/styles';
import { Card, Box, Typography, CardContent } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
    outer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        zIndex: '-1',
        background: theme.palette.primary.main,
        height: '100vh',
        '&::after': {
            content: "''",
            background: `url(${process.env.PUBLIC_URL}/A.svg)`,
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            width: '500.41px',
            height: '510px',
            left: '0px',
            top: '0px'
        }
    },
    card: {
        background: fade(theme.palette.secondary.light, 0.9),
        padding: '2rem 1rem',
        width: '24rem',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '6px !important',
        justifyContent: 'center'
    },
    cardHeader: {
        textAlign: 'center',
        marginBottom: '2rem'
    },
    content: {
        display: 'flex'
    }
}));

const ErrorLayout = () => {
    const classes = useStyles();

    return (
        <Box component='div' className={classes.outer}>
            <Card className={classes.card}>
                <Box className={classes.cardHeader}>
                    <img src={`${process.env.PUBLIC_URL}/logotipo.png`} alt='approbado_logotipo' height="50px" width="200px" />
                </Box>
                <CardContent>
                    <Typography variant="h5">
                        ¡Ups!
                    </Typography>
                    <Typography variant="subtitle2">
                        Lo sentimos. Estamos pasando por problemas técnicos.
                    </Typography>
                    <Typography variant="subtitle2">
                        Esperamos resolverlo pronto =)
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

const ErrorLayoutWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <ErrorLayout {...props} />
    </ThemeProvider>
);

export default ErrorLayoutWithTheme;
