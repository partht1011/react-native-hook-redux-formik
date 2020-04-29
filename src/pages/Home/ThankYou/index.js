import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PageContainer from '../../../components/PageContainer';
import colors from '../../../assets/colors';
import {useDispatch} from 'react-redux';
import {setAppLoading} from '../../../redux/actions/app';
import HoneyButton from '../../../components/Button/HoneyButton';
import * as API from '../../../services/api';

const styles = StyleSheet.create({
  label: {
    fontSize: 22,
    color: colors.primary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
});

const ThankYou = ({route, navigation}) => {
  const {transactionno} = route.params;

  const onConfirm = () => {
    // dispatch(setAppLoading(true));
    navigation.navigate('Cart');
    navigation.navigate('ProductHome');
  };

  return (
    <PageContainer title="Thank You For Your Order">
      <View style={styles.content}>
        <Text style={styles.label}>Your Transaction No is {transactionno}</Text>
      </View>

      <HoneyButton title="Confirm" onPress={onConfirm} />
    </PageContainer>
  );
};

export default ThankYou;
