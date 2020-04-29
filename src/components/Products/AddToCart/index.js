import React from 'react';

import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import colors from '../../../assets/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: colors.black,
    fontSize: 16,
  },
});

export default ({onPress}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <AntDesignIcon name="shoppingcart" size={25} color={colors.black} />
  </TouchableOpacity>
);
