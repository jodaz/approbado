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
import isEmpty from 'is-empty'

const AboutMe = ({ bio, email, profile }) => (
    <Grid container>
        <Grid item xs={12}>
            <ProfileContentItem
                title='Resumen'
                icon={<ProfileIcon />}
            >
                <Typography variant="subtitle1">
                    {bio ? bio : 'Parece que este usuario prefiere mantener un aire de misterio...'}
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
                        {email}
                    </Typography>
                </ProfileContentItem>
            </Grid>
            {!isEmpty(profile) && (
                <>
                    <Grid item xs={12} sm={4}>
                        <ProfileContentItem
                            title='Ocupación'
                            icon={<CertificationIcon />}
                        >
                            <Typography variant="subtitle1">
                                {(profile.ocupation) ? profile.ocupation : 'Ninguna'}
                            </Typography>
                        </ProfileContentItem>
                    </Grid>
                    <Grid item xs={12}>
                        {(profile.linkedin || profile.twitter) && (
                            <ProfileContentItem
                                title='Redes sociales'
                                icon={<LinkIcon />}
                            >
                                <Box width='70px' display='flex' justifyContent="space-between">
                                    {(profile.linkedin) && (
                                        <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank">
                                            <LinkedinIcon />
                                        </a>
                                    )}
                                    {(profile.twitter) && (
                                        <a href={`https://twitter.com/${profile.twitter}`} target="_blank">
                                            <TwitterIcon />
                                        </a>
                                    )}
                                </Box>
                            </ProfileContentItem>
                        )}
                    </Grid>
                </>
            )}
        </Grid>
    </Grid>
);

export default AboutMe;
