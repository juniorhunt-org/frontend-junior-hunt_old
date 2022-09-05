import React, { FC } from "react";
import styled from "styled-components/native";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";

interface IButton {
	title: string;
	onPress: () => void;
	style?: any;
	danger?: boolean;
	active?: boolean;
	width?: number;
}

const Button: FC<IButton> = ({
	title,
	onPress,
	style,
	active = true,
	danger = false,
	width = 100,
}) => {
	const colorscheme = useColorScheme();
	const Wrapper = styled.TouchableOpacity`
		width: ${width}%;
		padding: 15px;
		border-radius: 10px;
		background-color: ${danger
			? Colors[colorscheme].dangerColor
			: !active
			? Colors[colorscheme].background
			: Colors[colorscheme].tint};
		margin-top: 10px;
		margin-bottom: 10px;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
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
