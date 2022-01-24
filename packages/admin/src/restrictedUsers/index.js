import RestrictedUserCard from './RestrictedUserCard'

const user = {
    id: 1,
    user_name: '@test',
    names: 'Test user',
    picture: 'public/default/user.png'
}

const BlacklistedUsers = () => (
    <RestrictedUserCard data={user} id={user.id} />
)

export default BlacklistedUsers
