import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Products from '../../pages/Home/Products';
import ProductDetails from '../../pages/Home/ProductDetails';
import ProductHome from '../../pages/Home/ProductHome';
import SubCategories from '../../pages/Home/SubCategories';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="ProductHome" component={ProductHome} />
    <Stack.Screen name="SubCategories" component={SubCategories} />
    <Stack.Screen name="Products" component={Products} />
    <Stack.Screen name="ProductDetails" component={ProductDetails} />
  </Stack.Navigator>
);
