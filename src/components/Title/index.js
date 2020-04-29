import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    position: 'relative',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 24,
    fontWeight: '500',
  },
  back: {
    position: 'absolute',
    left: 15,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});

export default ({text, backVisible, navigation}) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
    {backVisible && (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.back}>
        <MaterialIcons name="arrow-back" color={colors.primary} size={30} />
      </TouchableOpacity>
    )}
  </View>
);
