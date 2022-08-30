import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import Layout from "../components/layout/Layout";
import Ad from "../components/ui/Ad";
import { useAuth } from "../hooks/useAuth";
import { IAd } from "../types";

export default function Search() {
	const [data, setData] = useState<IAd[]>([]);
	const { fetchAds, isLoading } = useAuth();

	const update = () => {
		fetchAds().then((data) => {
			console.log(data);
			setData(data);
		});
	};

	useEffect(update, []);

	return (
		<Layout>
			<FlatList
				data={data}
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={update} />
				}
				renderItem={({ item }) => <Ad {...item} />}
				keyExtractor={(item) => `ad ${item.id}`}
			/>
		</Layout>
	);
}
