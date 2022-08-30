import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { FC } from "react";
import { IAd } from "../../types";
import styled from "styled-components/native";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import Button from "./Button";
import Row from "./Row";

const Ad: FC<IAd> = ({ title, description, limit, payment }) => {
	const colorscheme = useColorScheme();

	const Wrapper = styled.View`
		margin-top: 10px;
		padding: 10px 10px;
		background-color: ${Colors[colorscheme].background};
		border-radius: 10px;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		border: 2px solid ${Colors[colorscheme].tint};
	`;

	const Title = styled.Text`
		color: ${Colors[colorscheme].text};
		font-weight: 500;
		font-size: 16px;
	`;

	const Intro = styled.Text`
		color: #898989;
		margin-top: 10px;
	`;

	const Price = styled.Text`
		color: ${Colors[colorscheme].tint};
		font-weight: 500;
		margin-top: 10px;
	`;

	return (
		<Wrapper>
			<Title>{title}</Title>
			<Intro>
				{description.length > 47
					? description.substring(0, 47) + "..."
					: description}
			</Intro>
			<Intro>
				<FontAwesome name="user" size={14} /> Количество свободных вакансий:{" "}
				{limit}
			</Intro>
			<Price>{payment} ₽ за час</Price>
			<Button title="Подробнее" onPress={() => {}} />
		</Wrapper>
	);
};

export default Ad;
