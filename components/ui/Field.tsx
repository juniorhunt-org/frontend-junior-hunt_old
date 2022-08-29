import React, { FC } from "react";
import { KeyboardTypeOptions, TextInput } from "react-native";
import styled from "styled-components/native";
import Colors from "../../constants/Colors";
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
}

const Field: FC<IField> = ({
	onChange,
	placeholder,
	val,
	isSecure,
	keyboardType,
	width = 100,
	contentType,
	required = false,
}) => {
	const colorscheme = useColorScheme();

	return (
		<TextInput
			style={{
				marginTop: 10,
				padding: 12,
				borderColor: Colors[colorscheme].tint,
				width: `${width}%`,
				backgroundColor: Colors[colorscheme].background,
				color: Colors[colorscheme].text,
				borderRadius: 10,
				borderWidth: 2,
			}}
			placeholder={placeholder}
			onChangeText={onChange}
			value={val}
			secureTextEntry={isSecure}
			autoCapitalize="none"
			keyboardType={keyboardType}
			textContentType={contentType}
		/>
	);
};

export default Field;
