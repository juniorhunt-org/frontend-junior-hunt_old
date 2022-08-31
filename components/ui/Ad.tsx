import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { FC } from "react";
import { IAd } from "../../types";
import styled from "styled-components/native";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import Button from "./Button";
import { useAd } from "../../hooks/useAd";

interface IAdProps {
	ad: IAd;
	navigator: any;
}

const Ad: FC<IAdProps> = ({ ad, navigator }) => {
	const colorscheme = useColorScheme();
	const { setAd } = useAd();

	const detailAd = () => {
		setAd(ad);
		navigator.navigate("Modal");
	};

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
			<Title>{ad.title}</Title>
			<Intro>
				{ad.description.length > 47
					? ad.description.substring(0, 47) + "..."
					: ad.description}
			</Intro>
			<Intro>
				<FontAwesome name="user" size={14} /> Количество свободных вакансий:{" "}
				{ad.limit}
			</Intro>
			<Price>{ad.payment} ₽ за час</Price>
			<Button title="Подробнее" onPress={detailAd} />
		</Wrapper>
	);
};

export default Ad;
