import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import LinkBehavior from '@approbado/lib/components/LinkBehavior'
import Avatar from '@material-ui/core/Avatar';
import configs from '@approbado/lib/configs'

const GoToProfileButtonLink = ({ id }) => (
    <Link
        to={`/users/${id}/show`}
        color='info'
        underline='hover'
        component={LinkBehavior}
    >
        Ver perfil
    </Link>
);

const useStyles = makeStyles(theme => ({
    root: {
        border: 'none'
    },
    user: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    tHeadCell: {
        fontWeight: 600,
        color: theme.palette.info.dark,
        textTransform: 'uppercase'
    },
    tBodyColumn: {
        padding: '0 1rem'
    },
    tbodyRow: {
        margin: '1rem',
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.12)",
        borderRadius: '6px'
    },
    position: {
        padding: '0.8rem',
        fontWeight: 700,
        color: theme.palette.info.dark,
        fontSize: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '1px 0px 1px rgba(0, 0, 0, 0.12)'
    }
}));

export default function RankingTable({ data }) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.root}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tHeadCell} align="left">Puesto</TableCell>
                        <TableCell className={classes.tHeadCell} align="left">Usuarios</TableCell>
                        <TableCell className={classes.tHeadCell} align="center">Certificados</TableCell>
                        <TableCell className={classes.tHeadCell} align="center">Puntaje total</TableCell>
                        <TableCell className={classes.tHeadCell} align="center">Detalle</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={i} className={classes.tbodyRow}>
                            <TableCell align="left" className={classes.tBodyColumn}>
                                <Box className={classes.position}>
                                    {i+1}
                                </Box>
                            </TableCell>
                            <TableCell align="left" className={classes.tBodyColumn} component="th" scope="row">
                                <Box className={classes.user}>
                                    <Avatar
                                        src={`${configs.SOURCE}/${row.picture}`}
                                        alt='photo_profile'
                                    />
                                    @{row.user_name}
                                </Box>
                            </TableCell>
                            <TableCell align="center" className={classes.tBodyColumn}>
                                {row.awards.length}
                            </TableCell>
                            <TableCell align="center" className={classes.tBodyColumn}>
                                {row.profile.points} pts
                            </TableCell>
                            <TableCell align="center" className={classes.tBodyColumn}>
                                <GoToProfileButtonLink {...row} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
