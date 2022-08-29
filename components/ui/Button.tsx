import React, { FC } from "react";
import styled from "styled-components/native";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";

interface IButton {
	title: string;
	onPress: () => void;
	style?: any;
	active?: boolean;
	width?: number;
}

const Button: FC<IButton> = ({
	title,
	onPress,
	style,
	active = true,
	width = 100,
}) => {
	const colorscheme = useColorScheme();
	const Wrapper = styled.TouchableHighlight`
		width: ${width}%;
		padding: 20px;
		border-radius: 16px;
		background-color: ${!active
			? Colors[colorscheme].background
			: Colors[colorscheme].tint};
		margin-top: 20px;
		${!active ? `border: 2px solid ` + Colors[colorscheme].tint : ""}
	`;
	const Title = styled.Text`
		color: ${Colors[colorscheme].text};
		text-align: center;
		font-weight: bold;
	`;

	return (
		<Wrapper
			underlayColor={Colors[colorscheme].tabIconDefault}
			onPress={onPress}
			style={style}
		>
			<Title>{title}</Title>
		</Wrapper>
	);
};

export default Button;
