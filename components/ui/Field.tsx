import React, { FC } from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

interface IField {
	onChange: (val: string) => void;
	val: string;
	placeholder: string;
	isSecure?: boolean;
}

const Field: FC<IField> = ({ onChange, placeholder, val, isSecure }) => {
	const colorscheme = useColorScheme();

	return (
		<TextInput
			style={{
				marginTop: 16,
				padding: 20,
				borderColor: Colors[colorscheme].tint,
				width: "100%",
				color: Colors[colorscheme].text,
				borderRadius: 16,
				borderWidth: 1,
			}}
			placeholder={placeholder}
			onChangeText={onChange}
			value={val}
			secureTextEntry={isSecure}
			autoCapitalize="none"
		/>
	);
};

export default Field;
