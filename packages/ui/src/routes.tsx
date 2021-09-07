import * as React from 'react'
import { Route } from 'react-router-dom';
import Configurations from './configurations';

export default [
    <Route exact path="/configurations" render={() => <Configurations />} />,
];

