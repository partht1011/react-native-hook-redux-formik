import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import PageContainer from "../../../components/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { setAppLoading, setApp } from "../../../redux/actions/app";
import * as API from "../../../services/api";
import {
  selectAuthId,
  selectSessionId,
  selectAuthLoggedIn,
} from "../../../redux/selectors/auth";
import CheckOutForm from "../../../components/Form/CheckOutForm";
import colors from "../../../assets/colors";
import CartItem from "../../../components/CartItem";
import CartItemLabel from "../../../components/CartItem/CartItemLabel";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import OrderModal from "../../../components/OrderModal";
import { selectLoading } from "../../../redux/selectors/app";

const styles = StyleSheet.create({
  comment: {
    fontSize: 24,
    color: colors.primary,
    textAlign: "center",
    marginVertical: 5,
  },
  divider: {
    height: 10,
    backgroundColor: colors.white3,
    marginVertical: 10,
  },
  products: {
    padding: 10,
  },
});
const Cart = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [profile, setProfile] = useState(null);
  const uid = useSelector(selectAuthId);
  const sessionid = useSelector(selectSessionId);
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectAuthLoggedIn);
  const isLoading = useSelector(selectLoading);
  const [modalInfo, setModalInfo] = useState({
    visible: false,
    formData: null,
  });

  const onCheckout = (formData) => {
    setModalInfo({
      visible: true,
      formData,
    });
  };

  const toggleModal = () => {
    setModalInfo({
      visible: false,
      formData: null,
    });
  };

  const checkout = () => {
    dispatch(setAppLoading(true));
    API.checkout(modalInfo.formData)
      .then((res) => {
        dispatch(setAppLoading(false));
        toggleModal();
        onSuccess();
        navigation.navigate("ThankYou", {
          transactionno: res.transactionno,
        });
      })
      .catch((err) => {
        console.warn(err);
        dispatch(setAppLoading(false));
      });
  };

  useEffect(() => {
    if (!loggedIn) {
      navigation.navigate("LogIn");
    }
  }, [loggedIn]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action
      if (!loggedIn) {
        navigation.navigate("LogIn");
        return;
      }
      setItems([]);
      dispatch(setAppLoading(true));
      const formData = new FormData();
      formData.append("key", sessionid + uid);
      Promise.all([API.getUserDetails(uid), API.listCartItems(formData)])
        .then(([profileResponse, cartResponse]) => {
          dispatch(setAppLoading(false));
          setProfile(profileResponse.items[0]);
          dispatch(
            setApp({
              profile: profileResponse.items[0],
            })
          );
          setItems(cartResponse.items);

          if (cartResponse.items.length === 0) {
            alert("You don't have any products in your cart!");
          }
        })
        .catch((err) => {
          console.warn(err);
          dispatch(setAppLoading(false));
          alert("You don't have any products in your cart!");
        });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const showItems = items.length > 0;
  const showForm = showItems && profile !== null;

  const cartSubTotal = () =>
    items
      .map((item) => Number(item.price) * Number(item.pqtysell))
      .reduce((e1, e2) => e1 + e2);

  const vat = () => cartSubTotal() * 0.05;
  const totalIncludingVat = () => cartSubTotal() + vat() + 30;

  const onSuccess = () => {
    setItems([]);
  };

  const updateCartItem = (item, action) => {
    const formData = new FormData();
    formData.append("p_id", item.p_id);
    formData.append("pqtysell", 1);
    formData.append("ord_sessionid", item.ord_sessionid);
    formData.append("patt", item.patt);
    formData.append("action", action);

    API.updateCartItem(formData).then((res) => {
      console.log(res);
    });

    setItems((items) =>
      items.map((e) =>
        e.p_id === item.p_id
          ? {
              ...e,
              pqtysell: Number(e.pqtysell) + (action === "minus" ? -1 : 1),
            }
          : e
      )
    );
  };

  const removeCartItem = (item) => {
    const formData = new FormData();
    formData.append("p_id", item.p_id);

    formData.append("ord_sessionid", item.ord_sessionid);
    formData.append("patt", item.patt);
    formData.append("action", "remove");

    API.removeCartItem(formData).then((res) => {
      console.log(res);
    });

    setItems((items) => items.filter((e) => e.p_id !== item.p_id));
  };

  return (
    <PageContainer title="Shopping Cart">
      {modalInfo.visible && (
        <OrderModal
          visible
          onClose={toggleModal}
          onConfirm={checkout}
          isLoading={isLoading}
        />
      )}
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {showItems && (
          <View style={styles.products}>
            <Text style={styles.comment}>Review Order</Text>
            <View>
              {items.map((item) => (
                <CartItem
                  {...item}
                  key={item.p_id}
                  onMinus={() => {
                    updateCartItem(item, "minus");
                  }}
                  onPlus={() => {
                    updateCartItem(item, "plus");
                  }}
                  onRemove={() => {
                    removeCartItem(item);
                  }}
                />
              ))}
              <CartItemLabel
                label="Cart Subtotal"
                value={`AED ${cartSubTotal()}`}
              />
              <CartItemLabel label="Shipping Charge" value={`AED 30`} />
              <CartItemLabel label="VAT" value={`AED ${vat()}`} />
              <CartItemLabel
                label="Total Including VAT"
                value={`AED ${totalIncludingVat()}`}
              />
            </View>
          </View>
        )}
        {showForm && (
          <React.Fragment>
            <View style={styles.divider} />
            <View style={styles.products}>
              <Text style={styles.comment}>Check Out</Text>
              <CheckOutForm
                data={profile}
                cartInfo={{
                  sub_total: cartSubTotal(),
                  shippingcost: 30,
                  total: totalIncludingVat() - 30,
                  grandtotal: totalIncludingVat(),
                }}
                onCheckout={onCheckout}
              />
            </View>
          </React.Fragment>
        )}
      </KeyboardAwareScrollView>
    </PageContainer>
  );
};

export default Cart;
