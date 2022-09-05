import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { IAd, ProfileUser } from "../types";
import { getMyAds } from "../provider/api";
import UserCard from "./ui/UserCard";
import { FadeInView } from "./FadeInView";
import Label from "./ui/Label";

const UsersList: FC<{ navigation: any }> = ({ navigation }) => {
	const { user, isLoading, setIsLoading, getUserInfo } = useAuth();
	const [myAds, setMyAds] = useState<IAd[]>([]);

	const getData = async () => {
		setIsLoading(true);
		if (user.detailInfo.id) {
			console.log(await getMyAds(user.token, user.detailInfo.id));
			setMyAds(await getMyAds(user.token, user.detailInfo.id));
		}
		setIsLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<FadeInView>
			{myAds.length > 0 ? (
				<FlatList
					data={myAds}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl refreshing={isLoading} onRefresh={getData} />
					}
					renderItem={({ item }) => (
						<>
							{item.users.map((user_id) => (
								<UserCard navigation={navigation} user_id={user_id} ad={item} />
							))}
						</>
					)}
					keyExtractor={(item) => `user ${item.id}`}
				/>
			) : (
				<Label>На ваши объявления никто не откликнулся :(</Label>
			)}
		</FadeInView>
	);
};

export default UsersList;
