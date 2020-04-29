import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import PageContainer from '../../../components/PageContainer';
import * as API from '../../../services/api';
import {useDispatch} from 'react-redux/lib/hooks/useDispatch';
import {setAppLoading} from '../../../redux/actions/app';
import {useSelector} from 'react-redux';
import {selectAuthId, selectAuthLoggedIn} from '../../../redux/selectors/auth';
import OrderItem from '../../../components/OrderItem';

const Orders = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const uid = useSelector(selectAuthId);
  const loggedIn = useSelector(selectAuthLoggedIn);

  useEffect(() => {
    if (!loggedIn) {
      navigation.navigate('LogIn');
    }
  }, [loggedIn]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      if (!loggedIn) {
        navigation.navigate('LogIn');
        return;
      }
      setOrders([]);
      dispatch(setAppLoading(true));
      API.getOrderList(uid)
        .then(res => {
          dispatch(setAppLoading(false));
          setOrders(res.items);
          if (res.items.length === 0) {
            alert("You don't have any past orders!");
          }
        })
        .catch(err => {
          console.warn(err);
          dispatch(setAppLoading(false));
          alert("You don't have any past orders!");
        });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <PageContainer title="Orders">
      <ScrollView>
        {orders.map(order => (
          <OrderItem {...order} key={order.ord_id} />
        ))}
      </ScrollView>
    </PageContainer>
  );
};

export default Orders;
