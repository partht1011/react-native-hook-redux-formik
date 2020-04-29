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
import {Button} from 'react-native-elements';

const {width} = Dimensions.get('screen');

const ITEMSIZE = (width - 40 - 20) / 2;

const styles = StyleSheet.create({
  container: {
    width: ITEMSIZE,
    borderWidth: 1,
    borderColor: colors.white2,
    justifyContent: 'center',
    marginBottom: 10,
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

export default ({onPress, data: {image, sname}, marginRight = false}) => (
  <View
    style={[styles.container, {marginRight: marginRight ? 20 : 0}]}
    onPress={onPress}>
    <Image
      source={{uri: serverURL + image}}
      style={styles.image}
      resizeMode="contain"
    />
    <Text style={styles.title}>{sname}</Text>
    <Button
      title="VIEW"
      onPress={onPress}
      containerStyle={{
        margin: 10,
      }}
      buttonStyle={{
        borderRadius: 19,
        paddingVertical: 8,
        backgroundColor: colors.primary,
      }}
      titleStyle={{
        fontWeight: 'bold',
        fontSize: 14,
      }}
      onPressOut={onPress}
    />
  </View>
);
