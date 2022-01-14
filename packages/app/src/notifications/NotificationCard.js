import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import makeStyles from '@material-ui/styles/makeStyles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        border: 'none',
        borderBottom: '1px solid #D1D1D1',
        cursor: 'pointer',
        marginBottom: '2rem',
        padding: '1rem'
    },
    title: {
        fontSize: '1rem',
        fontWeight: 400,
        color: theme.palette.primary.main
    },
    lightTypography: {
        fontSize: '0.9rem',
        fontWeight: 400,
        color: theme.palette.info.light,
    },
    primaryTypography: {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: theme.palette.primary.main
    },
    header: {
        padding: '0rem'
    },
    content: {
        padding: '0 0 0 3.5rem',
        height: '4rem',
        '&:last-child': {
            paddingBottom: 'unset !important'
        }
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '200px',
        marginLeft: 'auto'
    }
}));

export default function RecipeReviewCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = e => {
        setExpanded(!expanded);
        e.preventDefault();
    };

    return (
        <Card className={classes.root} onClick={handleExpandClick}>
            <CardHeader
                className={classes.header}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <OptionsCardMenu>
                        <DeleteButton
                            label='Eliminar'
                            basePath='notifications'
                            confirmColor='warning'
                            confirmTitle='Eliminar notificación'
                            confirmContent='¿Está seguro que desea eliminar esta notificación?'
                            label='Eliminar esta notificación'
                        />
                    </OptionsCardMenu>
                }
                title={
                    <Typography className={classes.title}>
                        Davinia Cuevas te ha enviado una invitación para formar parte de su grupo de debate “los corruptos de la justicia”
                    </Typography>
                }
                subheader="September 14, 2016"
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <CardActions className={classes.actions} disableSpacing>
                        <Button variant="outlined" color="secondary">
                            Rechazar
                        </Button>
                        <Button variant="contained" color="primary">
                            Aceptar
                        </Button>
                    </CardActions>
                </CardContent>
            </Collapse>
        </Card>
    );
}
