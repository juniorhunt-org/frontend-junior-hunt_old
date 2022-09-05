import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { FC, useEffect, useState } from "react";
import { IAd, NumberToWeekDay, Schedule } from "../../types";
import styled from "styled-components/native";
import useColorScheme from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import Button from "./Button";
import { useAd } from "../../hooks/useAd";
import { useAuth } from "../../hooks/useAuth";

interface IAdProps {
	ad: IAd;
	navigator: any;
}

const Ad: FC<IAdProps> = ({ ad, navigator }) => {
	const colorscheme = useColorScheme();
	const { setAd, deleteReplyAd, getSchedule } = useAd();
	const { user } = useAuth();
	const [schedule, setSchedule] = useState<Schedule>({} as Schedule);

	const getScheduleHandler = async () => {
		setSchedule(await getSchedule(ad));
		console.log(schedule);
	};

	useEffect(() => {
		getScheduleHandler();
		console.log(ad.users, user.detailInfo);
	}, []);

	const detailAd = () => {
		setAd(ad);
		navigator.navigate("Modal");
	};

	const Wrapper = styled.View`
		margin-top: 15px;
		padding: 10px 10px;
		background-color: ${Colors[colorscheme].background};
		border-radius: 10px;
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
		<Wrapper
			style={{
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.25,
				shadowRadius: 3.84,
				elevation: 5,
			}}
		>
			<Title>{ad.title}</Title>
			<Intro>
				{ad.description.length > 47
					? ad.description.substring(0, 47) + "..."
					: ad.description}
			</Intro>
			<Intro>
				<FontAwesome name="user" size={14} /> Количество свободных вакансий:{" "}
				{ad.limit - ad.users.length}
			</Intro>
			<Price>{ad.payment} ₽ за час</Price>
			{schedule && (
				<Price>
					Время работы с {schedule.start} - {schedule.stop} в{" "}
					{NumberToWeekDay[schedule.week_day]}
				</Price>
			)}

			{user.detailInfo.id ? (
				ad.users.includes(user.detailInfo.id) ? (
					<Button
						title="Отменить отклик"
						danger={true}
						onPress={() => deleteReplyAd(ad.id)}
					/>
				) : (
					<Button title="Подробнее" onPress={detailAd} />
				)
			) : (
				<Button title="Подробнее" onPress={detailAd} />
			)}
		</Wrapper>
	);
};

export default Ad;
