import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Button,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useDispatch, useSelector} from 'react-redux';
import PageContainer from '../../../components/PageContainer';
import * as API from '../../../services/api';
import {setAppLoading} from '../../../redux/actions/app';
import colors from '../../../assets/colors';
import {serverURL} from '../../../config';
import HoneyButton from '../../../components/Button/HoneyButton';
import InputField from '../../../components/InputField';
import {
  selectSessionId,
  selectAuthLoggedIn,
  selectAuthId,
} from '../../../redux/selectors/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {width} = Dimensions.get('window');

const IMGSIZE = width - 50;

const styles = StyleSheet.create({
  comment: {
    fontSize: 20,
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 10,
  },
  img: {
    height: IMGSIZE - 50,
  },
  button: {
    marginVertical: 10,
  },
  top: {
    position: 'relative',

    alignItems: 'center',
  },
  carousel: {margin: 10},
  dots: {
    position: 'absolute',
    bottom: 0,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 0,
    backgroundColor: colors.black,
    opacity: 0.2,
  },
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 0,
    backgroundColor: colors.black,
    opacity: 0.75,
  },
});

const ProductDetails = ({route, navigation}) => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState('1');
  const sessionId = useSelector(selectSessionId);
  const uid = useSelector(selectAuthId);
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectAuthLoggedIn);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    dispatch(setAppLoading(true));
    setQuantity('1');

    API.getProductDetails(route.params.id)
      .then(res => {
        dispatch(setAppLoading(false));
        setProduct(res.items[0]);
      })
      .catch(() => {
        dispatch(setAppLoading(false));
      });
  }, [route.params.id]);

  const onAddCart = () => {
    if (!loggedIn) {
      return navigation.navigate('LogIn');
    }
    const formData = new FormData();

    formData.append('pqtysell', quantity);
    formData.append('ord_sessionid', sessionId + uid);
    formData.append('price', product.price);
    formData.append('patt', product.paid);
    formData.append('p_id', product.pid);

    dispatch(setAppLoading(true));
    API.addToCart(formData)
      .then(res => {
        dispatch(setAppLoading(false));
        alert(res.message);
      })
      .catch(err => {
        console.warn(err);
        alert('Error!');
        dispatch(setAppLoading(false));
      });
  };

  const onChangeQuantity = text => {
    setQuantity(text.replace(/[^0-9]/g, ''));
  };

  return (
    <PageContainer title="Product Details" backVisible navigation={navigation}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {product !== null && (
          <View>
            <Text style={styles.comment}>{product.prd_name}</Text>
            <View style={styles.top}>
              <Carousel
                loop
                data={product.images}
                sliderWidth={width - 40}
                itemWidth={width - 40}
                containerCustomStyle={styles.carousel}
                renderItem={({item, index}) => (
                  <Image
                    key={index}
                    source={{uri: serverURL + item}}
                    resizeMode="contain"
                    style={styles.img}
                  />
                )}
                onSnapToItem={setSliderIndex}
              />
              <Pagination
                dotsLength={product.images.length}
                activeDotIndex={sliderIndex}
                containerStyle={styles.dots}
                dotStyle={styles.dotActive}
                inactiveDotStyle={styles.dot}
                inactiveDotOpacity={0.5}
                inactiveDotScale={1}
              />
            </View>

            <Text style={styles.comment}>Price: AED {product.price}</Text>
            <InputField
              placeholder="Quantity"
              label="Quantity"
              keyboardType="number-pad"
              value={quantity}
              onChangeText={onChangeQuantity}
            />
            <HoneyButton
              title="Add To Cart"
              onPress={onAddCart}
              disabled={quantity === ''}
              containerStyle={styles.button}
            />
          </View>
        )}
      </KeyboardAwareScrollView>
    </PageContainer>
  );
};

export default ProductDetails;
