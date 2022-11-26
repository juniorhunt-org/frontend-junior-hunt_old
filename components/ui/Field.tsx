import React, {FC} from "react";
import {KeyboardTypeOptions, TextInput} from "react-native";
import Layout from "../../constants/Layout";
import {useTheme} from "@react-navigation/native";

interface IField {
  onChange: (val: string) => void;
  val: string;
  placeholder: string;
  width?: number;
  isSecure?: boolean;
  keyboardType?: KeyboardTypeOptions;
  required?: boolean;
  contentType?:
    | "none"
    | "URL"
    | "addressCity"
    | "addressCityAndState"
    | "addressState"
    | "countryName"
    | "creditCardNumber"
    | "emailAddress"
    | "familyName"
    | "fullStreetAddress"
    | "givenName"
    | "jobTitle"
    | "location"
    | "middleName"
    | "name"
    | "namePrefix"
    | "nameSuffix"
    | "nickname"
    | "organizationName"
    | "postalCode"
    | "streetAddressLine1"
    | "streetAddressLine2"
    | "sublocality"
    | "telephoneNumber"
    | "username"
    | "password"
    | "newPassword"
    | "oneTimeCode";
  multiline?: boolean;
  autoCapitalize?: boolean;
}

const Field: FC<IField> = ({
                             onChange,
                             placeholder,
                             val,
                             isSecure,
                             keyboardType,
                             width = 100,
                             contentType,
                             multiline = false,
                             autoCapitalize = false,
                           }) => {
  const {colors} = useTheme();
  const {isSmallDevice} = Layout;
  return (
    <TextInput
      blurOnSubmit={true}
      style={{
        marginTop: 10,
        padding: isSmallDevice ? 5 : 10,
        borderColor: colors.primary,
        width: `${width}%`,
        height: multiline ? 70 : "auto",
        backgroundColor: colors.background,
        color: colors.text,
        borderRadius: 10,
        borderWidth: 2,
        fontSize: isSmallDevice ? 9 : 12,
      }}
      placeholder={placeholder}
      placeholderTextColor={colors.primary}
      onChangeText={onChange}
      value={val}
      multiline={multiline}
      secureTextEntry={isSecure}
      autoCapitalize={autoCapitalize ? "sentences" : "none"}
      keyboardType={keyboardType}
      textContentType={contentType}
    />
  );
};

export default Field;
