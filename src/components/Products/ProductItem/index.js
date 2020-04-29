import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import colors from '../../../assets/colors';
import {serverURL} from '../../../config';
import AddToCart from '../AddToCart';
import DetailsButton from '../DetailsButton';

const {width} = Dimensions.get('screen');

const ITEMSIZE = (width - 60) / 2;
const IMGSIZE = (width - 80) / 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,

    marginBottom: 20,
    width: ITEMSIZE,
  },
  label: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    height: IMGSIZE,
    backgroundColor: colors.white,
    borderColor: colors.white3,
    borderWidth: 1,
    marginBottom: 5,
  },
  price: {
    color: colors.primary,
    fontSize: 18,
  },
  bottom: {
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.white3,
    marginTop: 10,
    padding: 5,
  },
});

export default ({onDetails, data: {prd_name, images, price}}) => (
  <TouchableOpacity style={styles.container} onPress={onDetails}>
    <Image
      source={{uri: serverURL + images}}
      style={styles.image}
      resizeMode="contain"
    />
    <Text style={styles.label}>{prd_name}</Text>
    {/* <Text style={styles.price}>AED {price}</Text> */}
    {/* <View style={styles.bottom}>
      <DetailsButton />
    </View> */}
  </TouchableOpacity>
);
