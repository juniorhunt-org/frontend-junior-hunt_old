import React, { FC, useEffect } from "react";
import AdList from "../components/AdList";
import { FadeInView } from "../components/FadeInView";
import Layout from "../components/layout/Layout";
import Label from "../components/ui/Label";
import UsersList from "../components/UsersList";
import { useAd } from "../hooks/useAd";
import { useAuth } from "../hooks/useAuth";
import useColorScheme from "../hooks/useColorScheme";
import { useNotification } from "../hooks/useNotification";
import { RootTabScreenProps } from "../types";

export const Home: FC<RootTabScreenProps<"Home">> = ({ navigation }) => {
	const { getReplyAds } = useAd();
	const { user } = useAuth();
	const { createUserNotificationToken } = useNotification();

	useEffect(() => {
		createUserNotificationToken(1);
	}, []);

	return (
		<FadeInView>
			<Layout>
				{user.detailInfo.is_company ? (
					<>
						<Label>Пользователя откликнувшиеся на ваши объявления</Label>
						<UsersList navigation={navigation} />
					</>
				) : (
					<>
						<Label>Объявления на которые вы откликнулись</Label>
						<AdList
							getData={getReplyAds}
							navigation={navigation}
							filtering={false}
						/>
					</>
				)}
			</Layout>
		</FadeInView>
	);
};
