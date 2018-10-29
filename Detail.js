import React from 'react';
import { Text, View } from 'react-native';

export default class Detail extends React.Component {
  render() {
    const { navigation: { state: { params: { item }}} } = this.props;
    return (
      <Text>{item.name}</Text>
    );
  }
}
