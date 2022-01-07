import * as React from 'react'
import { ReactComponent as RibbonIllustration } from '@approbado/lib/illustrations/Ribbon.svg'
import NoContent from '@approbado/lib/components/NoContent'

const Certifications = () => (
    <NoContent
        icon={<RibbonIllustration />}
        title='Aún no hay certificaciones'
    />
);

export default Certifications;
