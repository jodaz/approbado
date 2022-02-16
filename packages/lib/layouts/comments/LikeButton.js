import * as React from 'react'
import LikeIcon from '@approbado/lib/icons/LikeIcon'
import { makeStyles } from '@material-ui/core/styles';
import { useMutation, useRefresh } from 'react-admin'
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: '50%'
    },
    icon: {
        fontSize: '1rem',
        color: props =>
            (props.likeStatus == 1)
                ? 'red'
                : 'inherit'
    }
}));

const LikeButton = ({ id, likeUser, likesCount }) => {
    const [mutate, { data, loading, loaded }] = useMutation();
    const refresh = useRefresh();
    const classes = useStyles({ likeStatus: likeUser })

    const handleClick = React.useCallback(async () => {
        try {
            await mutate({
                type: 'update',
                resource: 'like-posts',
                payload: { id: id, data: {} }
            }, { returnPromise: true })
        }  catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [mutate]);

    React.useEffect(() => {
        if (loaded) {
            refresh();
        }
    }, [loaded])

    return (
        <IconButton onClick={handleClick} className={classes.root}>
            <LikeIcon className={classes.icon} />
        </IconButton>
    )
}

export default LikeButton
