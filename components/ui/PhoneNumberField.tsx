import React, { FC, useRef } from "react";
import PhoneInput from "react-native-phone-number-input";
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import useColorScheme from "../../hooks/useColorScheme";

interface IPhoneNumberField {
	value: string;
	setValue: (value: string) => void;
	setFormatted: (value: string) => void;
}

const PhoneNumberField: FC<IPhoneNumberField> = ({
	value,
	setFormatted,
	setValue,
}) => {
	const colorscheme = useColorScheme();
	const phoneInput = useRef<PhoneInput>(null);
	const { isSmallDevice } = Layout;

	return (
		<PhoneInput
			placeholder="Введите номер телефона"
			textInputStyle={{
				fontSize: isSmallDevice ? 9 : 11,
				height: 100,
				color: Colors[colorscheme].text,
			}}
			ref={phoneInput}
			defaultValue={value}
			onChangeText={setValue}
			onChangeFormattedText={setFormatted}
			layout="second"
			textContainerStyle={{
				borderRadius: 10,
				backgroundColor: Colors[colorscheme].background,
			}}
			containerStyle={{
				backgroundColor: Colors[colorscheme].tint,
				width: "100%",
				borderWidth: 2,
				marginTop: 10,
				borderColor: Colors[colorscheme].tint,
				borderRadius: 10,
				height: 50,
			}}
			defaultCode="RU"
		/>
	);
};

export default PhoneNumberField;
