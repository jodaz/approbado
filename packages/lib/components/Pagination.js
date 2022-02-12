import { useListContext } from 'react-admin';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';

// Icons
import { ReactComponent as LeftAngleIcon } from '@approbado/lib/icons/LeftAngle.svg'
import { ReactComponent as RightAngleIcon } from '@approbado/lib/icons/RightAngle.svg'

const Pagination = () => {
    const { page, perPage, total, setPage } = useListContext();
    const nbPages = Math.ceil(total / perPage) || 1;

    if (!total) return null

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem'
        }}>
            <Box>
                Página {page} de {nbPages}
            </Box>
            {(page != nbPages) &&
                <Box>
                    <Button
                        color="primary.light"
                        key="prev"
                        onClick={() => setPage(page - 1)}
                        size='small'
                    >
                        <LeftAngleIcon />
                    </Button>
                    <Button
                        color="primary.light"
                        key="next"
                        onClick={() => setPage(page + 1)}
                        size='small'
                    >
                        <RightAngleIcon />
                    </Button>
                </Box>
            }
        </Box>
    );
}

export default Pagination
