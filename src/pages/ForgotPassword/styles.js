import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../assets/colors';

const {height} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
    position: 'relative',
  },
  content: {
    flex: 1,
  },
  form: {
    marginTop: (height - 230) / 6,
  },
  link: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  linkText: {
    color: colors.primary,
  },
});
