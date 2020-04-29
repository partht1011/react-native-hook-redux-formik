import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  label: {
    width: '50%',
    fontSize: 16,
    color: colors.primary,
  },
  value: {
    width: '50%',
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default ({label, value}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);
