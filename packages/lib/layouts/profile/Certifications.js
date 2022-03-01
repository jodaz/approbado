import * as React from 'react'
import { ReactComponent as RibbonIllustration } from '@approbado/lib/illustrations/Ribbon.svg'
import NoContent from '@approbado/lib/components/NoContent'
import GridList from '@approbado/lib/components/GridList';
import { ListBase } from 'react-admin';
import { useParams } from 'react-router-dom'
import AwardBadge from './AwardBadge'

const CertificationsListView = props => {
    const { id } = useParams();

    return (
        <ListBase
            basePath='awards'
            resource='awards'
            perPage={10}
            filter={{ 'user_id': id }}
            sort={{ field: 'created_at', order: 'DESC' }}
            {...props}
        >
            <GridList
                component={<AwardBadge />}
                empty={
                    <NoContent
                        icon={<RibbonIllustration />}
                        title='Aún no hay certificaciones'
                    />
                }
            />
        </ListBase>
    )
}

const Certifications = () => (
    <NoContent
        icon={<RibbonIllustration />}
        title='Aún no hay certificaciones'
    />
);

export default CertificationsListView;
