import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../../assets/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import {Input} from 'react-native-elements';

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
    borderBottomColor: colors.primary,
  },
  input: {
    marginLeft: 10,
    color: colors.primary,
  },
});

export default props => (
  <Input
    placeholder="Email"
    keyboardType="email-address"
    leftIcon={<Icon name="mail" size={24} color={colors.primary} />}
    inputContainerStyle={styles.inputContainer}
    inputStyle={styles.input}
    autoCapitalize="none"
    {...props}
  />
);
