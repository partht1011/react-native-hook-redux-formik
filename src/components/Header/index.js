import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";

import colors from "../../assets/colors";
import images from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { selectAuthLoggedIn } from "../../redux/selectors/auth";

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,

    position: "relative"
  },
  logoContainer: {
    flex: 1,

    textAlign: "left"
  },
  logo: {
    height: 50,
    width: (50 * 34) / 9,
    marginLeft: 15
  },
  icon: {
    width: 25,
    marginRight: 15
  }
});

const Header = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectAuthLoggedIn);

  const onToggle = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const onCart = () => {
    navigation.navigate("Shopping Cart");
  };
  const onLogo = () => {
    navigation.navigate("ProductHome");
  };
  const onSignOut = () => {
    dispatch(logout());
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoContainer} onPress={onLogo}>
        <Image source={images.logo} resizeMode="contain" style={styles.logo} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onCart} style={styles.icon}>
        <AntDesignIcon name="shoppingcart" size={25} color={colors.primary} />
      </TouchableOpacity>
      {/* {loggedIn && (
        <TouchableOpacity onPress={onSignOut} style={styles.icon}>
          <AntDesignIcon name="logout" size={25} color={colors.primary} />
        </TouchableOpacity>
      )} */}
      <TouchableOpacity onPress={onToggle} style={styles.icon}>
        <FeatherIcon name="menu" size={25} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
