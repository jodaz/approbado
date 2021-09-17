import { Route } from 'react-router-dom';
import Configurations from './configurations/Configurations';
import LevelsCreate from './configurations/LevelsCreate'
import CategoryCreate from './configurations/CategoryCreate'
import CategoryEdit from './configurations/CategoryEdit'
import LevelEdit from './configurations/LevelEdit'

export default [
    <Route exact path="/configurations" render={() => <Configurations />} />,
    <Route 
        path="/configurations/levels/create" 
        render={() => <LevelsCreate />} 
    />,
    <Route 
        path="/configurations/categories/create" 
        render={() => <CategoryCreate />} 
    />,
    <Route 
        path="/configurations/categories/:id" 
        render={() => <CategoryEdit />} 
    />,
    <Route 
        path="/configurations/levels/:id" 
        render={() => <LevelEdit />} 
    />,
];

