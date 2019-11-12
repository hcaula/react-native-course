import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  content: {
    fontSize: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    marginTop: 20,
    textAlign: 'center'
  }
})

class Loading extends React.Component {
  state = { content: this.props.text }

  componentDidMount() {
    const { speed, text } = this.props

    this.interval = window.setInterval(() => {
      this.state.content === text + '...'
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + '.' }))
    }, speed)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    return (
      <View>
        <Text style={styles.content}>{this.state.content}</Text>
      </View>
    )
  }
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}

export default Loading
