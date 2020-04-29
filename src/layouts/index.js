import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import AuthLayout from './AuthLayout';
import {selectLoading} from '../redux/selectors/app';
import Loader from '../components/Loader';
import SignedInLayout from './SignedInLayout';
import navHelper from '../utils/navHelper';
import colors from '../assets/colors';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

const MainLayout = ({setHeaderColor}) => {
  const loading = useSelector(selectLoading);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  return (
    <React.Fragment>
      <NavigationContainer
        ref={ref => navHelper.setRootNavigator(ref)}
        onStateChange={state => {
          const {name} = state.routes[state.index];
          setHeaderColor(name === 'AuthLayout' ? colors.white : colors.primary);
        }}>
        <Stack.Navigator
          headerMode="none"
          screenOptions={{gestureEnabled: false}}>
          <Stack.Screen name="AuthLayout" component={AuthLayout} />
          <Stack.Screen name="SignedInLayout" component={SignedInLayout} />
        </Stack.Navigator>
      </NavigationContainer>
      {loading && <Loader />}
    </React.Fragment>
  );
};

export default MainLayout;
