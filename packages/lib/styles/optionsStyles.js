import { makeStyles } from '@material-ui/core'

const optionsStyles = makeStyles(theme => ({
    checked: props => ({
        "&$checked": {
            color: props.isRight
                ? `${theme.palette.success.main} !important`
                : `${theme.palette.error.main} !important`
        }
    }),
    selected: props => ({
        "&$selected": {
            borderRadius: '6px',
            backgroundColor: 'transparent',
            opacity: 'unset',
            border: props.isRight
                ? `3px solid ${theme.palette.success.main} !important`
                : `3px solid ${theme.palette.error.main} !important`
        }
    })
}))

export default optionsStyles;
