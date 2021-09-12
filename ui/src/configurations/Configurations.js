import * as React from 'react'
// Components
import LevelsList from './LevelsList'
import CategoriesList from './CategoryList'
import TriviaSettings from './TriviaSettings'
import TabbedList from '../components/TabbedList'

const tags = ['categorías', 'niveles', 'trivia'];

const RenderList = ({ currentTab }) => {
    if (currentTab === 'niveles') {
        return <LevelsList />
    } else if (currentTab === 'trivia') {
        return <TriviaSettings />
    } else if (currentTab === 'categorías') {
        return <CategoriesList />
    }
    return null;
}

const Configurations = () => (
    <TabbedList
        tags={tags}
        defaultTag='categorías'
        name='Configuraciones'
    >
        <RenderList />
    </TabbedList>
)

export default Configurations
