import { FlatList, RefreshControl } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { IAd } from "../types";
import { useAuth } from "../hooks/useAuth";
import Ad from "./ui/Ad";
import { FadeInView } from "./FadeInView";
import Label from "./ui/Label";

interface IAdList {
	getData: () => Promise<IAd[]>;
	navigation: any;
	filtering?: boolean;
	myAds?: boolean;
}

const AdList: FC<IAdList> = ({
	getData,
	navigation,
	filtering = true,
	myAds = false,
}) => {
	const [data, setData] = useState<IAd[]>([]);
	const { isLoading, user } = useAuth();

	const update = () => {
		getData().then((data) => {
			setData(data.reverse());
		});
	};

	useEffect(update, []);

	useEffect(() => {
		isLoading && update();
	}, [isLoading]);

	return (
		<FadeInView>
			<FlatList
				data={
					myAds
						? data.filter((item) => item.owner === user.detailInfo.id)
						: filtering
						? data.filter((item) => item.limit - item.users.length > 0)
						: data
				}
				// showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={update} />
				}
				renderItem={({ item }) => <Ad ad={item} navigator={navigation} />}
				keyExtractor={(item) => `ad ${item.id}`}
			/>
		</FadeInView>
	);
};

export default AdList;
