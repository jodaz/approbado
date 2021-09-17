import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 0.5rem'
  }
}));

export default useStyles;
