import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import PageContainer from '../../../components/PageContainer';
import * as API from '../../../services/api';
import {setAppLoading} from '../../../redux/actions/app';
import images from '../../../assets/images';
import Section from '../../../components/Section';
import CategoryItem from '../../../components/Section/CategoryItem';
import ProductPreview from '../../../components/Section/ProductPreview';
import colors from '../../../assets/colors';

const slides = [
  {img: images.slider1, id: '1'},
  {img: images.slider2, id: '2'},
];

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  top: {
    position: 'relative',

    alignItems: 'center',
  },
  banner: {
    width: width - 40,
    height: ((width - 40) * 11) / 19,
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
    backgroundColor: colors.white,
  },
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 0,
    backgroundColor: colors.white,
  },
});

const ProductHome = ({navigation}) => {
  const [data, setData] = useState({
    categories: [
      {
        catid: 1,
        cname: 'Honey',
        image: images.honey,
      },
      {
        catid: 2,
        cname: 'Hive\nProducts',
        image: images.hive,
      },
      {
        catid: 3,
        cname: 'Gourmet',
        image: images.gourmet,
      },
      {
        catid: 4,
        cname: 'Beauty',
        image: images.cosmetic,
      },
      {
        catid: 5,
        cname: 'Health',
        image: images.health,
      },
    ],
    featuredProducts: [],
    loaded: false,
  });

  const [sliderIndex, setSliderIndex] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAppLoading(true));
    Promise.all([/*API.getAllCategories(),*/ API.getFeaturedProducts()])
      .then(([/*categoryData,*/ featuredData]) => {
        dispatch(setAppLoading(false));
        setData(data => ({
          ...data,
          loaded: true,
          //categories: categoryData.items,
          featuredProducts: featuredData.items,
        }));
      })
      .catch(err => {
        console.warn(err);
        dispatch(setAppLoading(false));
      });
  }, []);

  const onCategoryClicked = category => {
    navigation.navigate('SubCategories', {
      id: category.catid,
      title: category.cname,
    });
  };

  const onProductClicked = product => {
    navigation.navigate('ProductDetails', {id: product.pid});
  };

  return (
    <PageContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.top}>
          <Carousel
            loop
            data={slides}
            sliderWidth={width - 40}
            itemWidth={width - 40}
            containerCustomStyle={styles.carousel}
            renderItem={({item}) => (
              <Image
                key={item.id}
                source={item.img}
                resizeMode="contain"
                style={styles.banner}
              />
            )}
            onSnapToItem={setSliderIndex}
          />
          <Pagination
            dotsLength={slides.length}
            activeDotIndex={sliderIndex}
            containerStyle={styles.dots}
            dotStyle={styles.dotActive}
            inactiveDotStyle={styles.dot}
            inactiveDotOpacity={0.5}
            inactiveDotScale={1}
          />
        </View>

        {data.loaded && (
          <React.Fragment>
            <Section title="Our Categories">
              {data.categories.map((category, index) => (
                <CategoryItem
                  key={category.catid}
                  title={category.cname}
                  image={category.image}
                  onPress={() => {
                    onCategoryClicked(category);
                  }}
                  marginRight={index < data.categories.length - 1}
                />
              ))}
            </Section>
            <Section title="Featured Products">
              {data.featuredProducts.map((product, index) => (
                <ProductPreview
                  key={product.pid}
                  data={product}
                  marginRight={index + 1 < data.featuredProducts.length}
                  onPress={() => {
                    onProductClicked(product);
                  }}
                />
              ))}
            </Section>
          </React.Fragment>
        )}
      </ScrollView>
    </PageContainer>
  );
};

export default ProductHome;
