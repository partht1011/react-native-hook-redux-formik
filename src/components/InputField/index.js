import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';

const styles = StyleSheet.create({
  input: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: colors.black,
  },
});

export default ({primary, ...rest}) => (
  <Input
    inputStyle={[styles.input, primary ? {color: colors.primary} : {}]}
    {...rest}
  />
);
