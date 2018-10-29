import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput
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

  navigateToDetail(item) {
    this.props.navigation.navigate('Detail', { item });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input}/>
          <TouchableOpacity>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{marginTop: 40}} onPress={() => this.fetchRepositories()}>
          <Text>Fetch</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => this.navigateToDetail(item)}>
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
  inputWrapper: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#EEE',
    borderRadius: 8,
  },
  searchText: {
    padding: 10,
  },
});
