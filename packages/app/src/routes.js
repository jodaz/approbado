import Authenticate from '@approbado/lib/layouts/Authenticate'
import { RouteWithoutLayout } from 'ra-core';

export default [
    <RouteWithoutLayout path='/auth' render={() => <Authenticate />} />,
];

