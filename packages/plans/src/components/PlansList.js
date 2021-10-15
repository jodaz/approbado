import {
    Box,
    Typography,
    makeStyles,
    createMuiTheme,
    ThemeProvider,
    Button,
    Card,
    CardContent
} from '@material-ui/core'
import { theme } from '@approbado/core';

const useStyles = makeStyles(theme => ({
    title: {
        fontFamily: ['"Special Elite"', "'sans-serif'"].join(','),
        fontSize: '40px'
    },
    subtitle: {
        fontSize: '16px',
        lineHeight: '24px'
    },
    card: {
        borderRadius: '12px !important',
        boxShadow: "4px 4px 90px 0px #00000014"
    },
    content: {
        padding: '2rem 1rem'
    },
    button: {
        background: "linear-gradient(135.16deg, #E6EA00 -22.35%, #FDE000 113.73%)",
        boxShadow: "4px 4px 40px rgba(0, 0, 0, 0.08)",
        borderRadius: "8px",
        textTransform: 'none',
        boxShadow: "4px 4px 40px 0px #00000014",
        padding: '0.3rem 2rem'
    },
    planName: {
        fontSize: '20px',
        weight: '700',
        textAlign: 'center',
        lineHeight: '26.6px'
    },
    planPrice: {
        fontSize: '40px',
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: '53px',
        letterSpacing: '0em',
        textAlign: 'center'
    },
    planSubtitle: {
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "300",
        lineHeight: "26px",
        letterSpacing: "0em",
        textAlign: "center"
    }
}))

const PlansList = () => {
    const classes = useStyles();

    return (
        <Box component='div' alignItems='center' display='flex' flexDirection='column'>
            <Typography variant="h5" className={classes.title}>Planes</Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
                {'Adquiere el mejor plan para seguir disfrutando y divirtiendote con '}
                <strong>{'Approbado'}</strong>
            </Typography>
            <Box component='div' style={{ marginTop: '1em' }}>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Typography variant="subtitle1" className={classes.planName}>Free</Typography>
                        <Typography variant="h4" className={classes.planPrice}>$ 0.00</Typography>
                        <Typography variant="subtitle1" className={classes.planSubtitle}>Freemium para siempre</Typography>
                        <Button className={classes.button}>Comenzar gratis</Button>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

const PlansListWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <PlansList {...props} />
    </ThemeProvider>
);

export default PlansListWithTheme;
