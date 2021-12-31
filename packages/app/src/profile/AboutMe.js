import * as React from 'react'
import ProfileContentItem from './ProfileContentItem';
import ProfileIcon from '@approbado/lib/icons/ProfileIcon';
import MessageIcon from '@approbado/lib/icons/MessageIcon';
import CertificationIcon from '@approbado/lib/icons/CertificationIcon';
import LinkIcon from '@approbado/lib/icons/LinkIcon';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { ReactComponent as LinkedinIcon } from '@approbado/lib/icons/Linkedin.svg'
import { ReactComponent as TwitterIcon } from '@approbado/lib/icons/Twitter.svg'

const AboutMe = ({ bio }) => (
    <Grid container>
        <Grid item xs={12}>
            <ProfileContentItem
                title='Resumen'
                icon={<ProfileIcon />}
            >
                <Typography variant="subtitle1">
                    Hola soy Matías y soy estudiante de segundo de Derecho en la Universidad de Chile.
                    Me gusta el campo de Derecho político, así que... vamos a darle!
                </Typography>
            </ProfileContentItem>
        </Grid>
        <Grid container>
            <Grid item xs={12} sm={4}>
                <ProfileContentItem
                    title='Email'
                    icon={<MessageIcon />}
                >
                    <Typography variant="subtitle1">
                        matiashuertas@gmail.com
                    </Typography>
                </ProfileContentItem>
            </Grid>
            <Grid item xs={12} sm={4}>
                <ProfileContentItem
                    title='Ocupación'
                    icon={<CertificationIcon />}
                >
                    <Typography variant="subtitle1">
                        Estudiante de derecho
                    </Typography>
                </ProfileContentItem>
            </Grid>
            <Grid item xs={12}>
                <ProfileContentItem
                    title='Redes sociales'
                    icon={<LinkIcon />}
                >
                    <Box width='70px' display='flex' justifyContent="space-between">
                        <a href="#" target="_blank">
                            <LinkedinIcon />
                        </a>
                        <a href="#" target="_blank">
                            <TwitterIcon />
                        </a>
                    </Box>
                </ProfileContentItem>
            </Grid>
        </Grid>
    </Grid>
);

export default AboutMe;
