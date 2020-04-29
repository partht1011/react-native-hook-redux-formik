import {postData, getData, deleteData, patchData} from './base';

const endPoints = {
  // auth
  login: 'items/loginuser.php',
  signup: 'items/createuser.php',
  forgotPassword: 'items/forgetpass.php',
  //
  userDetails: 'items/readusers.php',
  updateUserDetails: 'items/updateuser.php',

  allCategories: 'items/getcategories.php',
  getCategory: 'items/allcategories.php',
  subCategories: 'items/getsubcategories.php',
  getSubCategory: 'items/getsubcategories.php',
  subCategoriesbyCategory: 'items/getsubcategorybycid.php',
  productsUnderCategory: 'items/getCatProductlist.php',
  productsUnderSubCategory: 'items/getSubCatProductlist.php',
  productDetails: 'items/getproductdetail.php',
  addToCart: 'items/addtocart.php',
  checkout: 'items/checkout.php',
  orderList: 'items/getOrderbyuser.php',
  honeyBeeGarden: 'items/honeygarden.php',
  subscribe: 'items/subscribeuser.php',
  cartItems: 'items/cartitems.php',
  featuredProducts: 'items/getFeaturedProductlist.php',
  updateCartItem: 'items/updatecart.php',
  removeCartItem: 'items/removecart.php',
};

export const login = (body) =>
  new Promise((resolve, reject) =>
    postData(endPoints.login, body)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );

export const signup = (body) =>
  new Promise((resolve, reject) =>
    postData(endPoints.signup, body)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );

export const getUserDetails = (id) =>
  new Promise((resolve, reject) =>
    postData(endPoints.userDetails + '?id=' + id)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );

export const updateUserDetails = (body) =>
  new Promise((resolve, reject) =>
    postData(endPoints.updateUserDetails, body)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );

export const getAllCategories = (body) =>
  new Promise((resolve, reject) =>
    getData(endPoints.allCategories)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );

export const getProductsListUnderCategory = (id) =>
  new Promise((resolve, reject) =>
    getData(endPoints.productsUnderCategory + '?id=' + id)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );

export const getSubCategoriesUnderCategory = (id) =>
  new Promise((resolve, reject) =>
    getData(endPoints.subCategoriesbyCategory + '?id=' + id)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );

export const getProductsListUnderSubCategory = (id) =>
  new Promise((resolve, reject) =>
    getData(endPoints.productsUnderSubCategory + '?id=' + id)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );
export const getProductDetails = (id) =>
  new Promise((resolve, reject) =>
    getData(endPoints.productDetails + '?id=' + id)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );

export const addToCart = (body) =>
  new Promise((resolve, reject) =>
    postData(endPoints.addToCart, body)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );

export const checkout = (body) =>
  new Promise((resolve, reject) =>
    postData(endPoints.checkout, body)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );

export const getOrderList = (id) =>
  new Promise((resolve, reject) =>
    getData(endPoints.orderList + '?id=' + id)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );

export const forgotPassword = (body) =>
  new Promise((resolve, reject) =>
    postData(endPoints.forgotPassword, body)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );
export const listCartItems = (body) =>
  new Promise((resolve, reject) =>
    postData(endPoints.cartItems, body)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );

export const getFeaturedProducts = (body) =>
  new Promise((resolve, reject) =>
    getData(endPoints.featuredProducts)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );
export const updateCartItem = (body) =>
  new Promise((resolve, reject) =>
    postData(endPoints.updateCartItem, body)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );

export const removeCartItem = (body) =>
  new Promise((resolve, reject) =>
    postData(endPoints.removeCartItem, body)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err)),
  );
