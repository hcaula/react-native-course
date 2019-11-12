import React, { Component } from 'react'
import { FlatList, View, Button, Text, StyleSheet } from 'react-native'
import { Icon, Tooltip } from 'react-native-elements'

import { fetchPopularRepos } from '../utils/api'

import Loading from './Loading'
import Card from './Card'

const styles = StyleSheet.create({
  cardItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

function LangaugesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <FlatList
      horizontal={true}
      data={languages}
      renderItem={({ item }) => (
        <Button
          title={item}
          color={item === selected ? 'rgb(187, 46, 31)' : 'black'}
          onPress={() => onUpdateLanguage(item)}
        />
      )}
    />
  )
}

function ReposGrid({ repos }) {
  return (
    <FlatList
      data={repos}
      renderItem={({ item, index }) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues
        } = item

        const { login, avatar_url } = owner

        return (
          <Card
            header={`#${index + 1}`}
            avatar={avatar_url}
            href={html_url}
            name={login}
          >
            <Tooltip popover={<Text>GitHub username</Text>}>
              <View style={styles.cardItem}>
                <Icon
                  name="user"
                  type="font-awesome"
                  color="rgb(255, 191, 116)"
                />
                <Text style={{ color: 'blue' }}>{login}</Text>
              </View>
            </Tooltip>
            <View style={styles.cardItem}>
              <Icon name="star" type="font-awesome" color="rgb(255, 215, 0)" />
              <Text>{stargazers_count.toLocaleString()} stars</Text>
            </View>
            <View style={styles.cardItem}>
              <Icon
                name="star"
                type="font-awesome"
                color="rgb(129, 195, 245)"
              />
              <Text>{forks.toLocaleString()} forks</Text>
            </View>
            <View style={styles.cardItem}>
              <Icon
                name="exclamation-triangle"
                type="font-awesome"
                color="rgb(241, 138, 147)"
              />
              <Text>{open_issues.toLocaleString()} open</Text>
            </View>
          </Card>
        )
      }}
    />
  )
}

class Popular extends Component {
  state = {
    selectedLanguage: 'All',
    repos: {},
    error: null
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage = selectedLanguage => {
    console.log('hello')

    this.setState({
      selectedLanguage,
      error: null
    })

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then(data => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          }))
        })
        .catch(() => {
          console.warn('Error fetching repos: ', error)

          this.setState({
            error: `There was an error fetching the repositories.`
          })
        })
    }
  }

  isLoading = () => {
    const { selectedLanguage, repos, error } = this.state

    return !repos[selectedLanguage] && error === null
  }

  render() {
    const { selectedLanguage, repos, error } = this.state

    return (
      <View>
        <LangaugesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <Loading text="Fetching Repos" />}

        {error && <Text>{error}</Text>}

        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </View>
    )
  }
}

export default Popular
