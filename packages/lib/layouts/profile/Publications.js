import * as React from 'react'
import { ReactComponent as ForumIllustration } from '@approbado/lib/illustrations/Forum.svg'
import NoContent from '@approbado/lib/components/NoContent'

const Publications = () => (
    <NoContent
        icon={<ForumIllustration />}
        title='Aún no hay debates publicados'
    />
);

export default Publications;
