import { FontAwesome } from "@expo/vector-icons";
import React, { FC, useState } from "react";
import { KeyboardTypeOptions, TextInput } from "react-native";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import useColorScheme from "../../hooks/useColorScheme";

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
}) => {
	const colorscheme = useColorScheme();
	const { isSmallDevice } = Layout;
	return (
		<TextInput
			blurOnSubmit={true}
			style={{
				marginTop: 10,
				padding: isSmallDevice ? 5 : 10,
				borderColor: Colors[colorscheme].tint,
				width: `${width}%`,
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.25,
				shadowRadius: 3.84,
				elevation: 5,
				height: multiline ? 100 : "auto",
				backgroundColor: Colors[colorscheme].background,
				color: Colors[colorscheme].text,
				borderRadius: 10,
				borderWidth: 2,
				fontSize: isSmallDevice ? 11 : 13,
			}}
			placeholder={placeholder}
			placeholderTextColor={Colors[colorscheme].placeholderColor}
			onChangeText={onChange}
			value={val}
			multiline={multiline}
			secureTextEntry={isSecure}
			autoCapitalize="sentences"
			keyboardType={keyboardType}
			textContentType={contentType}
		/>
	);
};

export default Field;
