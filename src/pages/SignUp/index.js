import React, {useState} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-elements';
import styles from './styles';
import Logo from '../../components/Logo';
import EmailInput from '../../components/InputField/EmailInput';
import PasswordInput from '../../components/InputField/PasswordInput';
import HoneyButton from '../../components/Button/HoneyButton';
import {isValidEmail} from '../../utils';
import * as API from '../../services/api';
import {useDispatch} from 'react-redux';
import {setAppLoading, setApp} from '../../redux/actions/app';
import {setAuth} from '../../redux/actions/auth';
import navHelper from '../../utils/navHelper';

const SignUp = ({navigation}) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const dispatch = useDispatch();

  const onLogIn = () => {
    navigation.navigate('LogIn');
  };
  const onSubmit = () => {
    const formData = new FormData();
    formData.append('username', form.email);
    formData.append('pass', form.password);
    dispatch(setAppLoading(true));
    API.signup(formData)
      .then((res) => {
        dispatch(setAppLoading(false));
        console.log(res);
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
            passwordConfirm: '',
          });

          navHelper.navigate('SignedInLayout');
        }
      })
      .catch((err) => {
        dispatch(setAppLoading(false));
        console.warn(err);
        alert('User is existed!');
      });
  };

  const onChange = (key) => (value) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };
  const disabled =
    form.email === '' ||
    form.password === '' ||
    form.password !== form.passwordConfirm ||
    !isValidEmail(form.email);
  return (
    <View style={styles.container}>
      <Logo />
      <KeyboardAwareScrollView style={styles.content}>
        <View style={styles.form}>
          <EmailInput value={form.email} onChangeText={onChange('email')} />
          <PasswordInput
            value={form.password}
            onChangeText={onChange('password')}
          />
          <PasswordInput
            placeholder="Confirm Password"
            value={form.passwordConfirm}
            onChangeText={onChange('passwordConfirm')}
          />
          <HoneyButton title="Sign Up" disabled={disabled} onPress={onSubmit} />
        </View>
      </KeyboardAwareScrollView>
      <Button
        title="Log In"
        style={styles.link}
        type="clear"
        titleStyle={styles.linkText}
        onPress={onLogIn}
      />
    </View>
  );
};

export default SignUp;
