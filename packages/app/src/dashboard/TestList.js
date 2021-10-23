import Grid from '@material-ui/core/Grid'
import EmptyMessageComponent from '@approbado/lib/components/EmptyMessageComponent'

const TestList = () => (
    <Grid container>
        <EmptyMessageComponent
            message='¡Lo sentimos! Aún no tenemos trivias publicadas.'
        />
    </Grid>
)

export default TestList
