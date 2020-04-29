import React from 'react';

import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import OcticonsIcon from 'react-native-vector-icons/Octicons';

import colors from '../../../assets/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ({onPress}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={styles.label}>Details</Text>
  </TouchableOpacity>
);
