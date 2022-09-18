import { StatusBar } from "expo-status-bar";
import React, { FC, useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import styled from "styled-components/native";
import useColorScheme from "../hooks/useColorScheme";

import { useAd } from "../hooks/useAd";
import {
	NumberToWeekDay,
	RootStackScreenProps,
	RootTabScreenProps,
	Schedule,
} from "../types";
import Colors from "../constants/Colors";
import Layout from "../components/layout/Layout";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import UserCard from "../components/ui/UserCard";
import { useNotification } from "../hooks/useNotification";

export const AddDetailScreen: FC<RootTabScreenProps<"AdDetail">> = ({
	navigation,
}) => {
	const { ad, requestAd, getSchedule, deleteAd } = useAd();
	const colorscheme: "light" | "dark" = useColorScheme();
	const { user, setIsLoading } = useAuth();
	const [schedule, setSchedule] = useState<Schedule>({} as Schedule);
	const { sendPushNotification } = useNotification();

	const getScheduleHandler = async () => {
		setIsLoading(true);
		setSchedule(await getSchedule(ad));
		setIsLoading(false);
	};

	useEffect(() => {
		getScheduleHandler();
	}, []);

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

	const submitHandler = async () => {
		requestAd();
		Alert.alert("Вы успешко откликнулись на объявления");
		await sendPushNotification(
			ad.owner,
			"Посмотрите отклившувшихся пользователей",
			"Здравствуйте, на вашу вакансию откликнулся, посмотрите его профиль"
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
					{ad.limit - ad.users.length}
				</Description>
				<Description>
					Адрес: <Address>{ad.address}</Address>
				</Description>
				<Price>{ad.payment} ₽ за час</Price>
				{schedule && (
					<Price>
						Время работы с {schedule.start} - {schedule.stop} в{" "}
						{NumberToWeekDay[schedule.week_day]}
					</Price>
				)}
				<UserCard
					ad={ad}
					navigation={navigation}
					user_id={ad.owner}
					showAd={false}
				/>
				{user.detailInfo.is_company ? (
					ad.owner == user.detailInfo.id ? (
						<Button
							title="Удалить"
							danger={true}
							onPress={() => {
								deleteAd(ad.id);
								navigation.navigate("Search");
							}}
						/>
					) : (
						<Button
							title="Вы не можете откликаться на вакансии"
							onPress={() => {}}
							active={false}
						/>
					)
				) : (
					<Button title="Откликнуться" onPress={submitHandler} />
				)}
			</Wrapper>
		</Layout>
	);
};
