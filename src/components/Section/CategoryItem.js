import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import colors from '../../assets/colors';

const {width} = Dimensions.get('screen');

const itemWidth = (width - 40 - 20) / 3;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.white2,
    justifyContent: 'center',
    alignItems: 'center',
    width: itemWidth,
    height: itemWidth,
    padding: 5,
    marginRight: 10,
  },
  title: {
    color: colors.black,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15,
    height: 30,
  },
  img: {
    width: itemWidth / 2,
    height: itemWidth / 2,
  },
});

export default ({title, image, onPress, marginRight}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.container, {marginRight: marginRight ? 10 : 0}]}>
    <Image source={image} resizeMode="contain" style={styles.img} />
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);
