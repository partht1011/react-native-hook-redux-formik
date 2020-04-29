import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import colors from '../../../assets/colors';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 15,
  },
});

export default props => (
  <Button
    containerStyle={styles.container}
    buttonStyle={styles.button}
    {...props}
  />
);
