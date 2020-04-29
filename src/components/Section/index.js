import React from 'react';
import {View, StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import colors from '../../assets/colors';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 18,
    color: colors.black,
  },
  content: {
    paddingBottom: 20,
    flexDirection: 'row',
  },
});

export default ({title, children}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <ScrollView
      contentContainerStyle={styles.content}
      horizontal
      alwaysBounceHorizontal={false}>
      {children}
    </ScrollView>
  </View>
);
