import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default class App extends React.Component<Props> {
  state = {
    items: [],
    refreshing: false,
  }

  page = 0;

  fetchRepositories(refreshing = false) {
    const newPage = refreshing ? 1 : this.page + 1;
    this.setState({ refreshing });
    fetch(`https://api.github.com/search/repositories?q=react&page=${newPage}`)
      .then(response => response.json())
      .then(({ items }) => {
        this.page = newPage;
        if(refreshing) {
          this.setState({ items, refreshing: false });
        } else {
          this.setState({ items: [...this.state.items, ...items], refreshing: false });
        }
      });
  }

  navigateToDetail() {
    this.props.navigation.navigate('Detail');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{marginTop: 40}} onPress={() => this.fetchRepositories()}>
          <Text>Fetch</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => this.navigateToDetail()}>
              <Text style={{padding: 20}}>{item.name}</Text>
            </TouchableOpacity>
          }
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => this.fetchRepositories()}
          onEndReachedThreshold={0.1}
          onRefresh={() => this.fetchRepositories(true)}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
