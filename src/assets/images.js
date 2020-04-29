import React from 'react';
import {Image} from 'react-native';

const images = {
  logo: require('./images/logo.png'),
  logoWhite: require('./images/logo_white.png'),
  logoSquare: require('./images/logo_square.png'),
  banner: require('./images/banner.jpg'),
  slider1: require('./images/slide1.jpg'),
  slider2: require('./images/slide2.jpg'),
  honey: require('./images/icons/honey.png'),
  cosmetic: require('./images/icons/cosmetic.png'),
  hive: require('./images/icons/hive.png'),
  gourmet: require('./images/icons/gourmet.png'),
  health: require('./images/icons/health.png'),
};

export function loadImages() {
  return new Promise((resolve, reject) => {
    Promise.all(
      Object.keys(images).map(i => {
        let img = {
          ...Image.resolveAssetSource(images[i]),
          cache: 'force-cache',
        };

        return Image.prefetch(img);
      }),
    )
      .then(results => {
        resolve();
      })
      .catch(err => reject(err));
  });
}

export default images;
