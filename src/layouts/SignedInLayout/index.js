import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../../pages/Home/Profile';
import Header from '../../components/Header';
import Orders from '../../pages/Home/Orders';
import ProductsLayout from './ProductsLayout';
import CartsLayout from './CartsLayout';

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});

const SignedInLayout = () => (
  <View style={styles.fill}>
    <Header />
    <View style={styles.fill}>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={ProductsLayout} />
        <Drawer.Screen name="All Orders" component={Orders} />
        <Drawer.Screen name="Shopping Cart" component={CartsLayout} />
        {/* <Drawer.Screen name="Addresses" component={Addresses} /> */}
        <Drawer.Screen name="Profile" component={Profile} />
        {/* <Drawer.Screen name="Contact" component={Contact} /> */}
      </Drawer.Navigator>
    </View>
  </View>
);

export default SignedInLayout;
