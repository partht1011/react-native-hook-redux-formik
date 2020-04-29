import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';

import {serverURL} from '../../config';
import colors from '../../assets/colors';

const {width} = Dimensions.get('screen');

const ITEMSIZE = (width - 40 - 20) / 2;

const styles = StyleSheet.create({
  container: {
    width: ITEMSIZE,
    borderWidth: 1,
    borderColor: colors.white2,
    justifyContent: 'center',
  },
  image: {
    height: (ITEMSIZE * 2) / 3 - 2,
    width: ITEMSIZE - 2,
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  },
  price: {
    color: colors.grey1,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
  },
});

export default ({
  onPress,
  data: {images, prd_name, price},
  marginRight = false,
}) => (
  <TouchableOpacity
    style={[styles.container, {marginRight: marginRight ? 20 : 0}]}
    onPress={onPress}>
    <Image
      source={{uri: serverURL + images}}
      style={styles.image}
      resizeMode="contain"
    />
    <Text style={styles.title}>{prd_name}</Text>
    <Text style={styles.price}>AED {price}</Text>
  </TouchableOpacity>
);
