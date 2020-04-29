import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Cart from '../../pages/Home/Cart';
import ThankYou from '../../pages/Home/ThankYou';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Cart" component={Cart} />
    <Stack.Screen name="ThankYou" component={ThankYou} />
  </Stack.Navigator>
);
