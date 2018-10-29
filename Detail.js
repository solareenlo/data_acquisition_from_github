import React from 'react';
import { Text, View } from 'react-native';

export default ({ navigation }) =>
  <Text>{navigation.state.params.item.name}</Text>
