import BlacklistedUserCard from './BlacklistedUserCard'

const user = {
    id: 1,
    user_name: '@test',
    names: 'Test user',
    picture: 'public/default/user.png'
}

const BlacklistedUsers = () => (
    <BlacklistedUserCard data={user} />
)

export default BlacklistedUsers
