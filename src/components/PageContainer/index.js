import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../../assets/colors';
import Title from '../Title';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

export default ({
  title = '',
  children,
  backVisible = false,
  navigation = null,
}) => (
  <View style={styles.container}>
    {title !== '' && (
      <Title text={title} backVisible={backVisible} navigation={navigation} />
    )}
    <View style={styles.content}>{children}</View>
  </View>
);
