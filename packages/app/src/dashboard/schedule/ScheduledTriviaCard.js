import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import makeStyles from '@material-ui/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import Dot from '@approbado/lib/components/Dot'
import Box from '@material-ui/core/Box';
import { ReactComponent as MoreIcon } from '@approbado/lib/icons/More.svg'
import DownAngleIcon from '@approbado/lib/icons/DownAngleIcon'
import UpperAngleIcon from '@approbado/lib/icons/UpperAngleIcon'
import Button from '@material-ui/core/Button';
import Tag from '@approbado/lib/components/Tag'

const useStyles = makeStyles(theme => ({
    root: {
        border: 'none',
        cursor: 'pointer',
        marginBottom: '2rem',
        padding: '1rem',
        boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
        width: '100%',
        marginBottom: '1rem'
    },
    expand: {
        padding: 0
    },
    title: {
        fontSize: '1rem',
        fontWeight: 400,
        color: theme.palette.primary.main,
        borderLeft: '6px solid #2280ED',
        borderRadius: '4px',
        paddingLeft: '1rem'
    },
    header: {
        padding: '0rem'
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    subheader: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.info.light,
        fontSize: '0.8rem'
    }
}));

const users = [
    { id: 1, full_name: 'Smith Lopez'},
    { id: 2, full_name: 'Tia May'}
]

const Description = ({ title, children }) => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'column',
        padding: '1rem 0'
    }}>
        <Box sx={{ color: '#6D6D6D', marginBottom: '0.3rem' }}>
            {title}
        </Box>
        {children}
    </Box>
)

const ScheduledTriviaCard = ({ users }) => {
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
                action={
                    <OptionsCardMenu icon={<MoreIcon />}>
                        <DeleteButton
                            label='Eliminar'
                            basePath='notifications'
                            confirmColor='warning'
                            confirmTitle='Eliminar notificación'
                            confirmContent='¿Está seguro que desea eliminar este evento?'
                            label='Eliminar evento'
                        />
                    </OptionsCardMenu>
                }
                title={
                    <Typography className={classes.title}>
                        Trivia Grupal
                    </Typography>
                }
            />
            <Box className={classes.actions}>
                <Box className={classes.subheader}>
                    <Box variant='subtitle2'>
                        MAR. 10, AGOSTO
                    </Box>
                    <Dot />
                    <Box variant='subtitle2'>
                        11 AM
                    </Box>
                </Box>
                <IconButton
                    className={classes.expand}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    {!expanded ? <DownAngleIcon /> : <UpperAngleIcon /> }
                </IconButton>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box sx={{ marginTop: '1rem' }}>
                    <Button color="primary" fullWidth>
                        Ingresar a la trivia
                    </Button>
                    <Description title='Título'>
                        <Box fontWeight='600'>
                            Reforzamiento de derecho laboral
                        </Box>
                    </Description>
                    <Description title='Trivia'>
                        <Box fontWeight='600'>
                            Derecho constitucional
                        </Box>
                    </Description>
                    <Description title='Tema'>
                        <Box fontWeight='600'>
                            Tema en especifico
                        </Box>
                    </Description>
                    <Description title='Nivel'>
                        <Box fontWeight='600'>
                            Avanzado
                        </Box>
                    </Description>
                    <Description title='Participantes'>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'start'
                        }}>
                            {users.map((item, i) => (
                                <Tag key={i} name={item.full_name} />
                            ))}
                        </Box>
                    </Description>
                    <Description title='Descripción'>
                        <Box fontWeight='600'>
                        Vamos por la aprobación de esa práctica. SOMOS!!!
                        </Box>
                    </Description>
                </Box>
            </Collapse>
        </Card>
    );
}

ScheduledTriviaCard.defaultProps = {
    users: users
}

export default ScheduledTriviaCard
