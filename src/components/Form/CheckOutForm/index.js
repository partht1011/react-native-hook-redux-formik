import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { withFormik } from "formik";
import { compose, bindActionCreators } from "redux";
import { Input, colors as COLORS } from "react-native-elements";
import colors from "../../../assets/colors";
import HoneyButton from "../../Button/HoneyButton";
import { connect } from "react-redux";
import { CheckBox } from "react-native-elements";
import CountryPicker from "react-native-country-picker-modal";
import CountryList from "country-list";

import { selectAuthId, selectSessionId } from "../../../redux/selectors/auth";

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    marginBottom: 0
  },
  input: {
    fontSize: 16,
    fontStyle: "italic"
  },
  inputActive: {
    fontSize: 16,
    color: colors.primary
  },
  inputContainer: {
    marginBottom: 0
  },
  formItemContainer: {
    marginBottom: 15
  },
  button: {
    marginBottom: 20
  },
  formError: {
    color: COLORS.error,
    fontSize: 12,
    margin: 10
  },
  formComment: {
    color: colors.primary,
    fontSize: 18,
    margin: 10
  },
  subContainer: {
    paddingHorizontal: 10
  },
  countryContainer: {
    marginHorizontal: 10,
    marginBottom: 15
  },
  countryLabel: {
    color: colors.grey1,
    marginBottom: 10
  },
  countryError: {
    marginLeft: 10,
    fontSize: 12,
    marginTop: 15,
    color: COLORS.error
  }
});

const CheckOutForm = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    setFieldTouched,
    handleSubmit,
    setFieldValue
  } = props;
  return (
    <View>
      {errors.form && <Text style={styles.formError}>{errors.form}</Text>}
      <Text style={styles.formComment}>Billing Details</Text>
      <View style={styles.subContainer}>
        <Input
          containerStyle={styles.formItemContainer}
          editable={!isSubmitting}
          errorMessage={
            touched.fname && errors.fname ? errors.fname : undefined
          }
          inputStyle={values.fname === "" ? styles.input : styles.inputActive}
          inputContainerStyle={styles.inputContainer}
          label="First Name"
          labelStyle={styles.label}
          placeholder="First Name"
          value={values.fname}
          onBlur={() => setFieldTouched("fname")}
          onChangeText={handleChange("fname")}
        />
        <Input
          containerStyle={styles.formItemContainer}
          editable={!isSubmitting}
          errorMessage={
            touched.lname && errors.lname ? errors.lname : undefined
          }
          inputStyle={values.lname === "" ? styles.input : styles.inputActive}
          inputContainerStyle={styles.inputContainer}
          label="Last Name"
          labelStyle={styles.label}
          placeholder="Last Name"
          value={values.lname}
          onBlur={() => setFieldTouched("lname")}
          onChangeText={handleChange("lname")}
        />
        <Input
          containerStyle={styles.formItemContainer}
          editable={false}
          inputStyle={styles.inputActive}
          inputContainerStyle={styles.inputContainer}
          label="Email"
          labelStyle={styles.label}
          placeholder="Email"
          value={values.email}
        />
        <Input
          containerStyle={styles.formItemContainer}
          editable={!isSubmitting}
          errorMessage={
            touched.phone && errors.phone ? errors.phone : undefined
          }
          inputStyle={values.phone === "" ? styles.input : styles.inputActive}
          inputContainerStyle={styles.inputContainer}
          label="Contact No"
          labelStyle={styles.label}
          placeholder="Contact No"
          value={values.phone}
          onBlur={() => setFieldTouched("phone")}
          onChangeText={handleChange("phone")}
        />
        <Input
          containerStyle={styles.formItemContainer}
          editable={!isSubmitting}
          errorMessage={touched.city && errors.city ? errors.city : undefined}
          inputStyle={values.city === "" ? styles.input : styles.inputActive}
          inputContainerStyle={styles.inputContainer}
          label="Town / City"
          labelStyle={styles.label}
          placeholder="Town / City"
          value={values.city}
          onBlur={() => setFieldTouched("city")}
          onChangeText={handleChange("city")}
        />
        <Input
          containerStyle={styles.formItemContainer}
          editable={!isSubmitting}
          errorMessage={
            touched.state && errors.state ? errors.state : undefined
          }
          inputStyle={values.state === "" ? styles.input : styles.inputActive}
          inputContainerStyle={styles.inputContainer}
          label="State / Provinence"
          labelStyle={styles.label}
          placeholder="State / Provinence"
          value={values.state}
          onBlur={() => setFieldTouched("state")}
          onChangeText={handleChange("state")}
        />
        <Input
          containerStyle={styles.formItemContainer}
          editable={!isSubmitting}
          errorMessage={
            touched.pincode && errors.pincode ? errors.pincode : undefined
          }
          inputStyle={values.pincode === "" ? styles.input : styles.inputActive}
          inputContainerStyle={styles.inputContainer}
          label="Zip Code"
          labelStyle={styles.label}
          placeholder="Zip Code"
          value={values.pincode}
          onBlur={() => setFieldTouched("pincode")}
          onChangeText={handleChange("pincode")}
        />
        {/* <Input
          containerStyle={styles.formItemContainer}
          editable={!isSubmitting}
          errorMessage={
            touched.country && errors.country ? errors.country : undefined
          }
          inputStyle={values.country === "" ? styles.input : styles.inputActive}
          inputContainerStyle={styles.inputContainer}
          label="Country"
          labelStyle={styles.label}
          placeholder="Country"
          value={values.country}
          onBlur={() => setFieldTouched("country")}
          onChangeText={handleChange("country")}
        /> */}
        <View style={styles.countryContainer}>
          <Text style={[styles.label, styles.countryLabel]}>Country</Text>
          <CountryPicker
            countryCode={CountryList.getCode(values.country)}
            onSelect={value => {
              handleChange("country")(value.name);
              setFieldTouched("country");
            }}
            withCountryNameButton
          />
          {touched.country && errors.country ? (
            <Text style={styles.countryError}>{errors.country}</Text>
          ) : null}
        </View>

        <Input
          containerStyle={styles.formItemContainer}
          editable={!isSubmitting}
          errorMessage={
            touched.address && errors.address ? errors.address : undefined
          }
          inputStyle={values.address === "" ? styles.input : styles.inputActive}
          inputContainerStyle={styles.inputContainer}
          label="Address"
          labelStyle={styles.label}
          placeholder="Address"
          value={values.address}
          onBlur={() => setFieldTouched("address")}
          onChangeText={handleChange("address")}
        />
        <CheckBox
          title="Ship To A Different Address"
          checked={values.shipToAnotherAddress}
          onPress={() => {
            setFieldValue("shipToAnotherAddress", !values.shipToAnotherAddress);
          }}
        />
      </View>

      {values.shipToAnotherAddress && (
        <View>
          <Text style={styles.formComment}>Shipping Details</Text>
          <View style={styles.subContainer}>
            <Input
              containerStyle={styles.formItemContainer}
              editable={!isSubmitting}
              errorMessage={
                touched.shippingfname && errors.shippingfname
                  ? errors.shippingfname
                  : undefined
              }
              inputStyle={
                values.shippingfname === "" ? styles.input : styles.inputActive
              }
              inputContainerStyle={styles.inputContainer}
              label="First Name"
              labelStyle={styles.label}
              placeholder="First Name"
              value={values.shippingfname}
              onBlur={() => setFieldTouched("shippingfname")}
              onChangeText={handleChange("shippingfname")}
            />
            <Input
              containerStyle={styles.formItemContainer}
              editable={!isSubmitting}
              errorMessage={
                touched.shippinglname && errors.shippinglname
                  ? errors.shippinglname
                  : undefined
              }
              inputStyle={
                values.shippinglname === "" ? styles.input : styles.inputActive
              }
              inputContainerStyle={styles.inputContainer}
              label="Last Name"
              labelStyle={styles.label}
              placeholder="Last Name"
              value={values.shippinglname}
              onBlur={() => setFieldTouched("shippinglname")}
              onChangeText={handleChange("shippinglname")}
            />
            <Input
              containerStyle={styles.formItemContainer}
              editable={!isSubmitting}
              errorMessage={
                touched.shippingemail && errors.shippingemail
                  ? errors.shippingemail
                  : undefined
              }
              inputStyle={
                values.shippingemail === "" ? styles.input : styles.inputActive
              }
              inputContainerStyle={styles.inputContainer}
              label="Email"
              labelStyle={styles.label}
              placeholder="Email"
              value={values.shippingemail}
              onBlur={() => setFieldTouched("shippingemail")}
              onChangeText={handleChange("shippingemail")}
            />
            <Input
              containerStyle={styles.formItemContainer}
              editable={!isSubmitting}
              errorMessage={
                touched.shippingphone && errors.shippingphone
                  ? errors.shippingphone
                  : undefined
              }
              inputStyle={
                values.shippingphone === "" ? styles.input : styles.inputActive
              }
              inputContainerStyle={styles.inputContainer}
              label="Contact No"
              labelStyle={styles.label}
              placeholder="Contact No"
              value={values.shippingphone}
              onBlur={() => setFieldTouched("shippingphone")}
              onChangeText={handleChange("shippingphone")}
            />
            <Input
              containerStyle={styles.formItemContainer}
              editable={!isSubmitting}
              errorMessage={
                touched.shippingcity && errors.shippingcity
                  ? errors.shippingcity
                  : undefined
              }
              inputStyle={
                values.shippingcity === "" ? styles.input : styles.inputActive
              }
              inputContainerStyle={styles.inputContainer}
              label="Town / City"
              labelStyle={styles.label}
              placeholder="Town / City"
              value={values.shippingcity}
              onBlur={() => setFieldTouched("shippingcity")}
              onChangeText={handleChange("shippingcity")}
            />
            <Input
              containerStyle={styles.formItemContainer}
              editable={!isSubmitting}
              errorMessage={
                touched.shippingstate && errors.shippingstate
                  ? errors.shippingstate
                  : undefined
              }
              inputStyle={
                values.shippingstate === "" ? styles.input : styles.inputActive
              }
              inputContainerStyle={styles.inputContainer}
              label="State / Provinence"
              labelStyle={styles.label}
              placeholder="State / Provinence"
              value={values.shippingstate}
              onBlur={() => setFieldTouched("shippingstate")}
              onChangeText={handleChange("shippingstate")}
            />
            <Input
              containerStyle={styles.formItemContainer}
              editable={!isSubmitting}
              errorMessage={
                touched.shippingpincode && errors.shippingpincode
                  ? errors.shippingpincode
                  : undefined
              }
              inputStyle={
                values.shippingpincode === ""
                  ? styles.input
                  : styles.inputActive
              }
              inputContainerStyle={styles.inputContainer}
              label="Zip Code"
              labelStyle={styles.label}
              placeholder="Zip Code"
              value={values.shippingpincode}
              onBlur={() => setFieldTouched("shippingpincode")}
              onChangeText={handleChange("shippingpincode")}
            />
            {/* <Input
              containerStyle={styles.formItemContainer}
              editable={!isSubmitting}
              errorMessage={
                touched.shippingcountry && errors.shippingcountry
                  ? errors.shippingcountry
                  : undefined
              }
              inputStyle={
                values.shippingcountry === ""
                  ? styles.input
                  : styles.inputActive
              }
              inputContainerStyle={styles.inputContainer}
              label="Country"
              labelStyle={styles.label}
              placeholder="Country"
              value={values.shippingcountry}
              onBlur={() => setFieldTouched("shippingcountry")}
              onChangeText={handleChange("shippingcountry")}
            /> */}
            <View style={styles.countryContainer}>
              <Text style={[styles.label, styles.countryLabel]}>Country</Text>
              <CountryPicker
                countryCode={CountryList.getCode(values.shippingcountry)}
                onSelect={value => {
                  handleChange("shippingcountry")(value.name);
                  setFieldTouched("shippingcountry");
                }}
                withCountryNameButton
              />
              {touched.shippingcountry && errors.shippingcountry ? (
                <Text style={styles.countryError}>
                  {errors.shippingcountry}
                </Text>
              ) : null}
            </View>

            <Input
              containerStyle={styles.formItemContainer}
              editable={!isSubmitting}
              errorMessage={
                touched.shippingaddress && errors.shippingaddress
                  ? errors.shippingaddress
                  : undefined
              }
              inputStyle={
                values.shippingaddress === ""
                  ? styles.input
                  : styles.inputActive
              }
              inputContainerStyle={styles.inputContainer}
              label="Address"
              labelStyle={styles.label}
              placeholder="Address"
              value={values.shippingaddress}
              onBlur={() => setFieldTouched("shippingaddress")}
              onChangeText={handleChange("shippingaddress")}
            />
          </View>
        </View>
      )}
      <HoneyButton
        title="Proceed Payment"
        containerStyle={styles.button}
        disabled={isSubmitting}
        loading={isSubmitting}
        onPress={handleSubmit}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  uid: selectAuthId(state),
  sessionid: selectSessionId(state)
});

const getFLname = name => {
  if (name === "" || name === undefined) {
    return { fname: "", lname: "" };
  }
  const splits = String(name).split(" ");
  if (splits.length === 0) {
    return { fname: "", lname: "" };
  }
  if (splits.length === 1) {
    return { fname: splits[0], lname: "" };
  }
  return { fname: splits[0], lname: splits[1] };
};

const getValue = value => value || "";

export default compose(
  connect(mapStateToProps),
  withFormik({
    mapPropsToValues: ({
      data: { email, state, address, country, city, pincode, phone, name }
    }) => ({
      fname: getFLname(name).fname,
      lname: getFLname(name).lname,
      email,
      phone: getValue(phone),
      city: getValue(city),
      state: getValue(state),
      pincode: getValue(pincode),
      country: getValue(country),
      address: getValue(address),
      payment_mode: 1, // cod, online
      shippingfname: getFLname(name).fname,
      shippinglname: getFLname(name).lname,
      shippingemail: getValue(email),
      shippingphone: getValue(phone),
      shippingcity: getValue(city),
      shippingstate: getValue(state),
      shippingpincode: getValue(pincode),
      shippingcountry: getValue(country),
      shippingaddress: getValue(address),
      shipToAnotherAddress: false
    }),
    validate: values => {
      const errors = {};
      const keys = [
        "fname",
        "lname",
        "email",
        "phone",
        "city",
        "state",
        "pincode",
        "country",
        "address"
      ];

      keys.forEach(key => {
        if (
          values[key] === "" ||
          values[key] === undefined ||
          values[key] === null
        ) {
          errors[key] = "This field can't be empty!";
        }
      });
      if (values.shipToAnotherAddress) {
        keys.forEach(key => {
          const newKey = `shipping${key}`;
          if (
            values[newKey] === "" ||
            values[newKey] === undefined ||
            values[newKey] === null
          ) {
            errors[newKey] = "This field can't be empty!";
          }
        });
      }
      return errors;
    },

    handleSubmit: async (
      values,
      { props, setSubmitting, setFieldError, isValid }
    ) => {
      // props.cartInfo: sub_total, shippingcost, total, grandtotal

      const formData = new FormData();
      formData.append("userid", props.uid);
      formData.append("sessionid", props.sessionid + props.uid);

      Object.keys(props.cartInfo).forEach(key => {
        formData.append(key, props.cartInfo[key]);
      });

      console.log("---", values);

      const keys = [
        "fname",
        "lname",
        "email",
        "phone",
        "city",
        "state",
        "pincode",
        "country",
        "address"
      ];
      for (let index = 0; index < keys.length; index += 1) {
        const key = keys[index];
        if (values[key] === "" || values[key] === null) {
          return alert("Fill the gaps!");
        }
        formData.append(key, values[key]);
      }

      if (values.shipToAnotherAddress) {
        for (let index = 0; index < keys.length; index += 1) {
          const key = `shipping${keys[index]}`;
          if (values[key] === "" || values[key] === null) {
            return alert("Fill the gaps!");
          }
          formData.append(key, values[key]);
        }
      } else {
        for (let index = 0; index < keys.length; index += 1) {
          const key = keys[index];
          formData.append(`shipping${key}`, values[key]);
        }
      }
      formData.append("payment_mode", values.payment_mode);
      props.onCheckout(formData);
    }
  })
)(CheckOutForm);
