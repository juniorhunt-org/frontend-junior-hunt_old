import { View } from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import PhoneInput from "react-native-phone-number-input";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";

interface IPhoneInput {
	onChange: (value: string) => void;
	valueDefault: string;
}

const PhoneNumberField: FC<IPhoneInput> = ({ onChange, valueDefault }) => {
	const colorscheme = useColorScheme();

	return (
		<View
			style={{
				width: "100%",
				marginTop: 10,
			}}
		>
			<PhoneInput
				defaultValue={valueDefault}
				defaultCode="RU"
				placeholder="Введите номер телефона"
				containerStyle={{
					borderRadius: 10,
					borderWidth: 5,
					borderColor: Colors[colorscheme].tabIconSelected,
					width: "100%",
				}}
				textInputStyle={{
					color: Colors[colorscheme].text,
				}}
				codeTextStyle={{
					color: Colors[colorscheme].text,
				}}
				textContainerStyle={{
					backgroundColor: Colors[colorscheme].background,
				}}
				flagButtonStyle={{
					backgroundColor: Colors[colorscheme].tint,
				}}
				layout="second"
				onChangeText={onChange}
				onChangeFormattedText={onChange}
				withDarkTheme={colorscheme === "dark"}
			/>
		</View>
	);
};

export default PhoneNumberField;
