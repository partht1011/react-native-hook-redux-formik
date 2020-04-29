import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { withFormik } from "formik";
import { compose, bindActionCreators } from "redux";
import { Input, colors as COLORS } from "react-native-elements";
import CountryPicker from "react-native-country-picker-modal";
import CountryList from "country-list";
import colors from "../../../assets/colors";
import HoneyButton from "../../Button/HoneyButton";
import { setAppLoading, loadProfile } from "../../../redux/actions/app";
import { connect } from "react-redux";
import * as API from "../../../services/api";
import { selectAuthId } from "../../../redux/selectors/auth";

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
  },
  button: {
    marginBottom: 20
  },
  formError: {
    color: COLORS.error,
    fontSize: 12,
    margin: 10
  }
});

const ProfileForm = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    setFieldTouched,
    handleSubmit
  } = props;
  return (
    <View>
      {errors.form && <Text style={styles.formError}>{errors.form}</Text>}
      <Input
        containerStyle={styles.formItemContainer}
        editable={!isSubmitting}
        errorMessage={touched.fname && errors.fname ? errors.fname : undefined}
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
        errorMessage={touched.lname && errors.lname ? errors.lname : undefined}
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
        errorMessage={touched.phone && errors.phone ? errors.phone : undefined}
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
        errorMessage={touched.state && errors.state ? errors.state : undefined}
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
        inputStyle={values.country === '' ? styles.input : styles.inputActive}
        inputContainerStyle={styles.inputContainer}
        label="Country"
        labelStyle={styles.label}
        placeholder="Country"
        value={values.country}
        onBlur={() => setFieldTouched('country')}
        onChangeText={handleChange('country')}
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
      <HoneyButton
        title="Update"
        containerStyle={styles.button}
        disabled={isSubmitting}
        loading={isSubmitting}
        onPress={handleSubmit}
      />
    </View>
  );
};

const mapStateToProps = state => ({ uid: selectAuthId(state) });
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setAppLoading, loadProfile }, dispatch);
};

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
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
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
      address: getValue(address)
    }),
    validate: values => {
      const errors = {};
      Object.keys(values).forEach(key => {
        if (values[key] === "") {
          errors[key] = "This field can't be empty!";
        }
      });
      return errors;
    },
    handleSubmit: async (values, { props, setSubmitting, setFieldError }) => {
      const formData = new FormData();
      formData.append("uid", props.uid);
      Object.keys(values).map(key => {
        if (key !== "email") {
          formData.append(key, values[key]);
        }
      });
      props.setAppLoading(true);
      API.updateUserDetails(formData)
        .then(res => {
          props.setAppLoading(false);
          alert(res.message);
          props.loadProfile();
        })
        .catch(err => {
          console.warn(err);
          props.setAppLoading(false);
        });
    }
  })
)(ProfileForm);
