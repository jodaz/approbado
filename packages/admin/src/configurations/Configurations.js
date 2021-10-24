import * as React from 'react'
// Components
import LevelsList from './LevelsList'
import CategoriesList from './CategoryList'
import TabbedList from '@approbado/lib/components/TabbedList'

const tags = ['Categorías', 'Niveles'];

const RenderList = ({ currentTab }) => {
    if (currentTab === 'Niveles') {
        return <LevelsList />
    } else if (currentTab === 'Categorías') {
        return <CategoriesList />
    }
    return null;
}

const Configurations = () => (
    <TabbedList
        tags={tags}
        defaultTag='Categorías'
        name='Configuraciones'
    >
        <RenderList />
    </TabbedList>
)

export default Configurations
