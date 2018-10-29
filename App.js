import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default class App extends Component<Props> {
  state = {
    items: [],
  }
  onPressFetch() {
    //fetch('https://api.github.com/search/repositories?q=react')
    fetch('https://api.github.com/search/repositories?q=react&page=2')
      .then(response => response.json())
      .then(({ items }) => this.setState({ items }));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{marginTop: 40}} onPress={() => this.onPressFetch()}>
          <Text>Fetch</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.id}
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
