import React, {useState} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-elements';
import styles from './styles';
import Logo from '../../components/Logo';
import EmailInput from '../../components/InputField/EmailInput';
import HoneyButton from '../../components/Button/HoneyButton';
import {useDispatch} from 'react-redux';
import {setAppLoading} from '../../redux/actions/app';
import {isValidEmail} from '../../utils';
import * as API from '../../services/api';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const onLogIn = () => {
    navigation.navigate('LogIn');
  };
  const onSubmit = () => {
    const formData = new FormData();
    formData.append('username', email);
    dispatch(setAppLoading(true));
    API.forgotPassword(formData)
      .then(res => {
        dispatch(setAppLoading(false));
        setEmail('');
        alert(res.message);
      })
      .catch(err => {
        dispatch(setAppLoading(false));
        alert('User is not exist');
      });
  };

  const disabled = email === '' || !isValidEmail(email);

  return (
    <View style={styles.container}>
      <Logo />
      <KeyboardAwareScrollView style={styles.content}>
        <View style={styles.form}>
          <EmailInput value={email} onChangeText={setEmail} />
          <HoneyButton
            title="Send Link"
            disabled={disabled}
            onPress={onSubmit}
          />
        </View>
      </KeyboardAwareScrollView>
      <Button
        title="LogIn"
        style={styles.link}
        type="clear"
        titleStyle={styles.linkText}
        onPress={onLogIn}
      />
    </View>
  );
};

export default ForgotPassword;
