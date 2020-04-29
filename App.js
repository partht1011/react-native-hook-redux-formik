/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import configStore from './src/redux/configStore';
import MainLayout from './src/layouts';
import {loadImages} from './src/assets/images';
import Loader from './src/components/Loader';

const {store, persistor} = configStore();

const App: () => React$Node = () => {
  const [headerColor, setHeaderColor] = useState('#fff');
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    loadImages()
      .then(() => {
        setAssetsLoaded(true);
      })
      .catch(err => {
        alert('Image Load Error! Please close and open app again!');
      });
  }, []);

  if (!assetsLoaded) {
    return <Loader />;
  }

  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={{flex: 0, backgroundColor: headerColor}} /> */}
      <SafeAreaView style={{flex: 1}}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainLayout setHeaderColor={setHeaderColor} />
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
