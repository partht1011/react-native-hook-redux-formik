import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import colors from '../../assets/colors';
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primary,
    paddingVertical: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  label: {
    color: colors.grey1,
    fontSize: 18,
  },
  value: {
    color: colors.primary,
    fontSize: 20,
  },
});
export default ({
  order_date,
  ord_id,
  order_status,
  grand_total,
  order_count,
}) => (
  <View style={styles.container}>
    <View style={styles.item}>
      <Text style={styles.label}>Order</Text>
      <Text style={styles.value}>{ord_id}</Text>
    </View>
    <View style={styles.item}>
      <Text style={styles.label}>Date</Text>
      <Text style={styles.value}>{order_date}</Text>
    </View>
    <View style={styles.item}>
      <Text style={styles.label}>Status</Text>
      <Text style={styles.value}>{order_status}</Text>
    </View>
    <View style={styles.item}>
      <Text style={styles.label}>Total</Text>
      <Text style={styles.value}>
        AED {grand_total} For {order_count} Item
      </Text>
    </View>
  </View>
);
