import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Popular from './app/components/Popular'
import Battle from './app/components/Battle'

const MainNavigator = createStackNavigator({
  Popular: { screen: Popular },
  Battle: { screen: Battle }
})

const App = createAppContainer(MainNavigator)

export default App
