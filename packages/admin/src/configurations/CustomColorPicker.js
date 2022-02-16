import { ColorInput } from 'react-admin-color-input';
import { withStyles } from '@material-ui/styles'

const classes = {
    root: {
        marginTop: '-0.5rem',
        width: '100%'
    }
};

const CustomColorPicker = ({ classes, ...rest }) => (
    <ColorInput source="color" placeholder="Nombre"  className={classes.root} {...rest} />
)

export default withStyles(classes)(CustomColorPicker)
