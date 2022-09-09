export const getAuthenticatedUser = async (user) => {
    if (user.is_registered) {
        const profile = await user.$fetchGraph('profile');
        profile.posts = await user.$relatedQuery('posts');
        profile.discussion = await user.$relatedQuery('posts').whereRaw('parent_id is null');
        profile.comments = await user.$relatedQuery('posts').whereRaw('parent_id is not null');
        profile.awards = await user.$relatedQuery('awards').withGraphFetched('trivia');
        profile.memberships = await user.$relatedQuery('memberships')
            .withGraphFetched('plans')
            .where('active', '=', true);

        return profile;
    }

    return user;
}
