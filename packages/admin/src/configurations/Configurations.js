import * as React from 'react'
// Components
import LevelsList from './LevelsList'
import CategoriesList from './CategoryList'
import TabbedList from '@approbado/lib/components/TabbedList'

const tags = [
    {
        name: 'Categorías',
        pathname: 'categories',
        component: <CategoriesList />
    },
    {
        name: 'Niveles',
        pathname: 'levels',
        component: <LevelsList />
    },
]

const Configurations = () => (
    <TabbedList
        tags={tags}
        name='Configuraciones'
    />
)

export default Configurations
