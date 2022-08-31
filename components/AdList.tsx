import { FlatList, RefreshControl } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { IAd } from "../types";
import { useAuth } from "../hooks/useAuth";
import Ad from "./ui/Ad";

interface IAdList {
	getData: () => Promise<IAd[]>;
	navigation: any;
}

const AdList: FC<IAdList> = ({ getData, navigation }) => {
	const [data, setData] = useState<IAd[]>([]);
	const { isLoading } = useAuth();

	const update = () => {
		getData().then((data) => {
			setData(data);
		});
	};

	useEffect(update, []);

	return (
		<>
			<FlatList
				data={data}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={update} />
				}
				renderItem={({ item }) => <Ad ad={item} navigator={navigation} />}
				keyExtractor={(item) => `ad ${item.id}`}
			/>
		</>
	);
};

export default AdList;
