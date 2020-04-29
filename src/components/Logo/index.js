import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import images from '../../assets/images';
import colors from '../../assets/colors';

const styles = StyleSheet.create({
  logo: {
    height: 80,
    alignSelf: 'center',
  },
  container: {
    marginTop: 100,
  },
  title: {
    textAlign: 'center',
    color: colors.black,
    fontSize: 30,
    marginTop: 5,
    fontWeight: 'bold',
  },
  comment: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 10,
  },
});

export default props => (
  <View style={styles.container} {...props}>
    <Image
      source={images.logoSquare}
      style={styles.logo}
      resizeMode="contain"
    />
    <Text style={styles.title}>HATTA HONEY</Text>
    <Text style={styles.comment}>HONEYBEE CREATIONS FOR LIFE</Text>
  </View>
);
