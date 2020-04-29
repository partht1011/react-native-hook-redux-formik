import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import colors from '../../assets/colors';

export default () => (
  <View
    style={[
      StyleSheet.absoluteFill,
      {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        backgroundColor: colors.loader,
        top: -100,
        bottom: -100,
      },
    ]}>
    <ActivityIndicator size="large" />
  </View>
);
