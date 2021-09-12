import { Route } from 'react-router-dom';
import Configurations from './configurations/Configurations';
import LevelsCreate from './configurations/LevelsCreate'
import CategoryCreate from './configurations/CategoryCreate'

export default [
    <Route exact path="/configurations" render={() => <Configurations />} />,
    <Route 
        path="/configurations/levels/create" 
        render={() => <LevelsCreate basePath='levels' resource='levels'/>} 
    />,
    <Route 
        path="/configurations/categories/create" 
        render={() => <CategoryCreate />} 
    />
];

