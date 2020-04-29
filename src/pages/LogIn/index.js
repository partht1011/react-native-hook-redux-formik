import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-elements';
import styles from './styles';
import Logo from '../../components/Logo';
import EmailInput from '../../components/InputField/EmailInput';
import PasswordInput from '../../components/InputField/PasswordInput';
import HoneyButton from '../../components/Button/HoneyButton';
import {isValidEmail} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {setAppLoading, setApp} from '../../redux/actions/app';
import {setAuth} from '../../redux/actions/auth';
import * as API from '../../services/api';
import navHelper from '../../utils/navHelper';
import {selectAuthLoggedIn} from '../../redux/selectors/auth';

const LogIn = ({navigation}) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const isLoggedIn = useSelector(selectAuthLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) navigation.navigate('SignedInLayout');
  }, []);

  const onSignUp = () => {
    navigation.navigate('SignUp');
  };
  const onForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  const onGetStarted = () => {
    navigation.navigate('SignedInLayout');
  };

  const onChange = key => value => {
    setForm(form => ({
      ...form,
      [key]: value,
    }));
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('userid', form.email);
    formData.append('pass', form.password);

    dispatch(setAppLoading(true));
    API.login(formData)
      .then(res => {
        dispatch(setAppLoading(false));
        if (res.message !== undefined) {
          alert('Email or Password is wrong');
        } else {
          const profile = res.items[0];
          dispatch(
            setAuth({
              loggedIn: true,
              uid: profile.uid,
            }),
          );
          dispatch(
            setApp({
              profile,
            }),
          );
          setForm({
            email: '',
            password: '',
          });
          navHelper.navigate('SignedInLayout');
        }
      })
      .catch(err => {
        dispatch(setAppLoading(false));
        console.warn(err);
      });
  };

  const disabled =
    form.email === '' || form.password === '' || !isValidEmail(form.email);

  return (
    <View style={styles.container}>
      <Logo />
      <KeyboardAwareScrollView style={styles.content}>
        <View style={styles.form}>
          <EmailInput
            value={form.email}
            onChangeText={onChange('email')}
            placeholder="ID"
          />
          <PasswordInput
            value={form.password}
            onChangeText={onChange('password')}
          />
          <Button
            title="Forgot Password"
            style={styles.forgotPassword}
            type="clear"
            titleStyle={styles.linkText}
            onPress={onForgotPassword}
          />
          <HoneyButton title="Log In" onPress={onSubmit} disabled={disabled} />
        </View>
      </KeyboardAwareScrollView>
      <Button
        title="Use as Guest"
        style={styles.link}
        type="clear"
        titleStyle={styles.linkText}
        onPress={onGetStarted}
      />
      <Button
        title="Sign Up"
        style={styles.link}
        type="clear"
        titleStyle={styles.linkText}
        onPress={onSignUp}
      />
    </View>
  );
};

export default LogIn;
