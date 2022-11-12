import { TouchableOpacity } from "react-native";
import React, { FC, useEffect, useState, useCallback } from "react";
import { IAd, ProfileUser } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import useColorScheme from "../../hooks/useColorScheme";
import styled from "styled-components/native";
import Colors from "../../constants/Colors";
import { useAd } from "../../hooks/useAd";
import { FadeInView } from "../FadeInView";

interface IUserCard {
	ad?: IAd;
	user_id: number;
	navigation?: any;
	showAd?: boolean;
}

const UserCard: FC<IUserCard> = ({ ad, user_id, navigation }) => {
	const [profile, setProfile] = useState<ProfileUser>({} as ProfileUser);
	const colorscheme = useColorScheme();
	const { getUserInfo } = useAuth();
	const { setAd } = useAd();

	const getInfo = useCallback(async () => {
		setProfile(await getUserInfo(user_id));
	}, [user_id]);

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
		font-weight: 700;
		margin-top: 10px;
	`;

	useEffect(() => {
		getInfo();
	}, []);

	return (
		<FadeInView>
			<Wrapper>
				<Title>
					Пользователь: {profile.first_name} {profile.last_name}
				</Title>
				<Intro>Описание: {profile.description}</Intro>
				{!profile.is_company ? (
					<>
						<Intro>Контактные данные: {profile.contacts}</Intro>
						{ad && (
							<TouchableOpacity
								onPress={() => {
									setAd(ad);
									navigation.navigate("AdDetail");
								}}
							>
								<Price>По объявлению: {ad.title}</Price>
							</TouchableOpacity>
						)}
					</>
				) : (
					<>
						<Intro>Компания: {profile.company_name}</Intro>
					</>
				)}
			</Wrapper>
		</FadeInView>
	);
};

export default UserCard;
