import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Title from '../../../components/Title';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ProfileForm from '../../../components/Form/ProfileForm';
import colors from '../../../assets/colors';
import {useDispatch, useSelector} from 'react-redux';
import {loadProfile, setApp} from '../../../redux/actions/app';
import {selectAppProfile} from '../../../redux/selectors/app';
import {selectAuthId, selectAuthLoggedIn} from '../../../redux/selectors/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    padding: 10,
  },
});

const Profile = ({navigation}) => {
  const profile = useSelector(selectAppProfile);
  const loggedIn = useSelector(selectAuthLoggedIn);
  const dispatch = useDispatch();

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
      dispatch(
        setApp({
          profile: {},
        }),
      );
      dispatch(loadProfile());
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Title text="Profile" />
      <KeyboardAwareScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}>
        {Object.keys(profile).length === 0 ? null : (
          <ProfileForm data={profile} />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Profile;
