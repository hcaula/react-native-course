import React from 'react'
import { View, Text, Image, Linking, StyleSheet } from 'react-native'
import { Card as RVECard } from 'react-native-elements'

const styles = StyleSheet.create({
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

const Card = ({ header, subheader, avatar, href, name, children }) => {
  return (
    <RVECard title={header}>
      <View style={styles.card}>
        <Image style={{ width: 100, height: 100 }} source={{ uri: avatar }} />
        {subheader && <Text>{subheader}</Text>}
        <View style={styles.card}>
          <Text
            style={{
              color: 'black',
              fontSize: 25
            }}
            onPress={() => Linking.openURL(href)}
          >
            {name}
          </Text>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: 'grey',
              margin: 2
            }}
          ></View>
        </View>
        {children}
      </View>
    </RVECard>
  )
}

export default Card
