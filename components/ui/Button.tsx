import React, { FC } from "react";
import styled from "styled-components/native";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import { TouchableHighlight } from "react-native";

interface IButton {
	title: string;
	onPress: () => void;
}

const Button: FC<IButton> = ({ title, onPress }) => {
	const colorscheme = useColorScheme();
	const Wrapper = styled.TouchableHighlight`
		width: 100%;
		padding: 20px;
		border-radius: 16px;
		background-color: ${Colors[colorscheme].tint};
		margin-top: 20px;
	`;
	const Title = styled.Text`
		color: ${Colors[colorscheme].text};
		text-align: center;
	`;
	return (
		<Wrapper
			underlayColor={Colors[colorscheme].tabIconDefault}
			onPress={onPress}
		>
			<Title>{title}</Title>
		</Wrapper>
	);
};

export default Button;
