import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import PageContainer from '../../../components/PageContainer';
import * as API from '../../../services/api';
import {setAppLoading} from '../../../redux/actions/app';
import colors from '../../../assets/colors';
import ProductItem from '../../../components/Products/ProductItem';
import SubCategoryPreview from '../../../components/Section/SubCategoryPreview';

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

const SubCategories = ({navigation, route}) => {
  const [data, setData] = useState({
    subs: [],
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
      API.getSubCategoriesUnderCategory(categoryId)
        .then(res => {
          dispatch(setAppLoading(false));
          setData({subs: res.items, loaded: true});
        })
        .catch(err => {
          dispatch(setAppLoading(false));
        });
    }
  }, [route.params.id]);

  const onProducts = sub => () => {
    navigation.navigate('Products', {id: sub.subid, title: sub.sname});
  };

  return (
    <PageContainer
      title={route.params.title}
      backVisible
      navigation={navigation}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.loaded && (
          <View style={styles.products}>
            {data.subs.map(sub => (
              <SubCategoryPreview
                key={sub.subid}
                data={sub}
                onPress={onProducts(sub)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </PageContainer>
  );
};

export default SubCategories;
