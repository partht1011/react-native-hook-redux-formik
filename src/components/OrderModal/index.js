import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import colors from "../../assets/colors";
import Modal from "react-native-modal";
import HoneyButton from "../Button/HoneyButton";
const styles = StyleSheet.create({
  content: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    textAlign: "center",
  },
  title: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
});
export default ({ visible, onConfirm, onClose, isLoading }) => (
  <Modal
    isVisible={visible}
    onBackdropPress={() => {
      if (!isLoading) onClose();
    }}
  >
    <View style={styles.content}>
      <Text style={styles.title}>Cash On Delivery</Text>
      {isLoading ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : (
        <HoneyButton
          title="Place Order"
          onPress={onConfirm}
          containerStyle={{ marginTop: 10 }}
        />
      )}
    </View>
  </Modal>
);
