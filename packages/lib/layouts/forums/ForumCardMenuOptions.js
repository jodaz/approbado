import * as React from 'react';
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import DeleteButton from '@approbado/lib/components/DeleteButton'
import LinkButton from '@approbado/lib/components/LinkButton'

// Icons
import ProfileIcon from '@approbado/lib/icons/ProfileIcon'
import ReportDialog from './ReportDialog'

const ForumCardMenuOptions = React.forwardRef((props, ref) => {
    const { record, user, history } = props;

    return (
        <OptionsCardMenu ref={ref}>
            {(user.id == record.owner.id) && (
                <LinkButton to={`/forums/${record.id}`} />
            )}
            {(user.id == record.owner.id) && (
                <DeleteButton
                    label='Eliminar'
                    basePath='forums'
                    confirmColor='warning'
                    confirmTitle='Eliminar foro'
                    confirmContent='¿Está seguro que desea eliminar este foro?'
                    label='Eliminar'
                    {...record}
                />
            )}
            {(user.id != record.owner.id) && (
                <MenuButton
                    label="Ver perfil"
                    onClick={() => history.push(`/users/${record.owner.id}/show`)}
                    icon={<ProfileIcon />}
                />
            )}
            {(user.id != record.owner.id) && (
                <ReportDialog post_id={record.id} />
            )}
        </OptionsCardMenu>
    )
});

export default ForumCardMenuOptions
