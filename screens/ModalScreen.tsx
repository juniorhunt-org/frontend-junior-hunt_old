import { StatusBar } from "expo-status-bar";
import React, { FC } from "react";
import { Alert, Platform } from "react-native";
import styled from "styled-components/native";
import useColorScheme from "../hooks/useColorScheme";

import { useAd } from "../hooks/useAd";
import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import Layout from "../components/layout/Layout";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../components/ui/Button";

export const ModalScreen: FC<RootTabScreenProps<"Modal">> = ({
	navigation,
}) => {
	const { ad, requestAd } = useAd();
	const colorscheme = useColorScheme();

	const Title = styled.Text`
		font-weight: 500;
		font-size: 20px;
		margin-top: 20px;
		color: ${Colors[colorscheme].tint};
	`;

	const Description = styled.Text`
		font-size: 16px;
		color: ${Colors[colorscheme].text};
		margin-top: 10px;
	`;

	const Wrapper = styled.View`
		margin-top: 10px;
		padding: 10px 10px;
		background-color: ${Colors[colorscheme].background};
		border-radius: 10px;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		border: 2px solid ${Colors[colorscheme].tint};
	`;

	const Price = styled.Text`
		color: ${Colors[colorscheme].tint};
		font-weight: 500;
		font-size: 16px;
		margin-top: 10px;
	`;

	const Address = styled.Text`
		font-weight: 500;
	`;

	const submitHandler = () => {
		requestAd();
		Alert.alert(
			"Вы успешко откликнулись на объявления",
			"Ждите пока на вашу заявку ответят"
		);
		navigation.goBack();
	};

	return (
		<Layout>
			<Wrapper>
				<Title>{ad.title}</Title>
				<Description>{ad.description}</Description>
				<Description>
					<FontAwesome name="user" size={14} /> Количество свободных вакансий:{" "}
					{ad.limit}
				</Description>
				<Description>
					Адрес: <Address>{ad.address}</Address>
				</Description>
				<Price>{ad.payment} ₽ за час</Price>
				{/* TODO: create users add to ad  */}
				<Button title="Откликнуться" onPress={submitHandler} />
				<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
			</Wrapper>
		</Layout>
	);
};
