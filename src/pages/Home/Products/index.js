import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import PageContainer from '../../../components/PageContainer';
import * as API from '../../../services/api';
import {setAppLoading} from '../../../redux/actions/app';
import colors from '../../../assets/colors';
import ProductItem from '../../../components/Products/ProductItem';

const styles = StyleSheet.create({
  comment: {
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 10,
  },
  divider: {
    height: 10,
    backgroundColor: colors.white3,
    marginVertical: 10,
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
});

const Products = ({navigation, route}) => {
  const [data, setData] = useState({
    products: [],
    loaded: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const categoryId = route.params.id;
    if (categoryId !== -1) {
      dispatch(setAppLoading(true));
      setData({
        products: [],
        loaded: false,
      });
      API.getProductsListUnderSubCategory(categoryId)
        .then(res => {
          dispatch(setAppLoading(false));
          setData({products: res.items, loaded: true});
        })
        .catch(err => {
          dispatch(setAppLoading(false));
        });
    }
  }, [route.params.id]);

  const onProductDetails = product => () => {
    navigation.navigate('ProductDetails', {id: product.pid});
  };

  return (
    <PageContainer
      title={route.params.title}
      backVisible
      navigation={navigation}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.loaded && (
          <View style={styles.products}>
            {data.products.map(product => (
              <ProductItem
                key={product.pid}
                data={product}
                onDetails={onProductDetails(product)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </PageContainer>
  );
};

export default Products;
