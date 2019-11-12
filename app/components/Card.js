import React from 'react'
import { View, Text, Image, Linking } from 'react-native'
import { Card as RVECard } from 'react-native-elements'

const Card = ({ header, subheader, avatar, href, name, children }) => {
  return (
    <RVECard title={header} style={{ textAlign: 'center' }}>
      <Image style={{ width: 100, height: 100 }} source={{ uri: avatar }} />
      {subheader && <Text>{subheader}</Text>}
      <View style={{ textAlign: 'center' }}>
        <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(href)}>
          {name}
        </Text>
      </View>
      {children}
    </RVECard>
  )
}

export default Card
