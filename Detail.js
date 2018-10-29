import React from 'react';
import { Text, View } from 'react-native';

export default class Detail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item.name,
  })

  render() {
    const { navigation } = this.props;
    return (
      <Text>{navigation.state.params.item.name}</Text>
    );
  }
}
