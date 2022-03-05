import Box from '@material-ui/core/Box'
import ProgressBar from './components/ProgressBar'

export default function() {
    return (
        <ProgressBar current={5} total={20} />
    )
}
