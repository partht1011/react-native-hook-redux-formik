import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import colors from '../../assets/colors';
import {serverURL} from '../../config';
import {Button} from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import HoneyButton from '../Button/HoneyButton';
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    borderRightColor: colors.primary,
    borderRightWidth: 1,
  },
  img: {
    height: 100,
    width: 100,
    margin: 10,
  },
  texts: {
    flex: 1,
    paddingHorizontal: 10,
  },
  label: {
    color: colors.grey1,
    fontSize: 18,
  },
  title: {
    color: colors.grey1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subC: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default ({
  images,
  prd_name,
  price,
  pqtysell,
  onMinus,
  onPlus,
  onRemove,
}) => (
  <View style={styles.container}>
    <View style={styles.left}>
      <Image
        source={{uri: serverURL + images}}
        style={styles.img}
        resizeMode="cover"
      />
    </View>

    <View style={styles.texts}>
      <Text style={styles.title}>{prd_name}</Text>
      <Text style={styles.label}>Price: AED {price}</Text>
      <View style={styles.subC}>
        <Text style={styles.label}>Quantity: </Text>
        <FeatherIcon
          name="minus"
          size={25}
          color={Number(pqtysell) > 1 ? colors.primary : colors.grey1}
          style={styles.icon}
          onPress={() => {
            if (Number(pqtysell) > 1) {
              onMinus();
            }
          }}
        />
        <Text style={styles.label}> {pqtysell} </Text>
        <FeatherIcon
          name="plus"
          size={25}
          color={colors.primary}
          style={styles.icon}
          onPress={onPlus}
        />
      </View>

      <HoneyButton
        title="Remove"
        containerStyle={{marginTop: 10}}
        buttonStyle={{
          backgroundColor: colors.primary,
          borderRadius: 15,
          paddingVertical: 2,
          marginHorizontal: 15,
        }}
        onPress={onRemove}
      />
    </View>
  </View>
);
