import React from 'react';
import { Text, View } from 'react-native';

export default class Detail extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Text>{navigation.state.params.item.name}</Text>
    );
  }
}
