import * as React from 'react'
import ForumList from '@approbado/lib/layouts/forums/ForumList';

const Publications = ({ id }) => (
    <ForumList filter={{ user_id: id }} />
);

export default Publications;
