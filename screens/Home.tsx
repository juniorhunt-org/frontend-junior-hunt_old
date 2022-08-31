import { FC } from "react";
import styled from "styled-components/native";
import AdList from "../components/AdList";
import Layout from "../components/layout/Layout";
import Colors from "../constants/Colors";
import { useAd } from "../hooks/useAd";
import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";

export const Home: FC<RootTabScreenProps<"Home">> = ({ navigation }) => {
	const { getReplyAds } = useAd();

	const colorscheme = useColorScheme();

	const Title = styled.Text`
		text-align: center;
		color: ${Colors[colorscheme].text};
		font-size: 19px;
		font-weight: 500;
		margin: 20px 0;
	`;

	return (
		<Layout>
			<Title>Объявления на которые вы откликнулись</Title>
			<AdList getData={getReplyAds} navigation={navigation} />
		</Layout>
	);
};
