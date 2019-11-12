import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Popular from './app/components/Popular'

const MainNavigator = createStackNavigator({
  Popular: { screen: Popular }
})

const App = createAppContainer(MainNavigator)

export default App
