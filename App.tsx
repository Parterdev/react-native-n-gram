import React from 'react'
import { StatusBar, View } from 'react-native'
import { HomeScreen } from './src/screens/HomeScreen'

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor='darkblue'
      />
      <HomeScreen />
    </View>
  )
}

export default App
