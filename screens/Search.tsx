import React, { FC, useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import AdList from "../components/AdList";
import Layout from "../components/layout/Layout";
import Ad from "../components/ui/Ad";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { IAd, RootTabScreenProps } from "../types";

export const Search: FC<RootTabScreenProps<"Search">> = ({ navigation }) => {
	const { fetchAds } = useAuth();

	return (
		<Layout>
			<AdList getData={fetchAds} navigation={navigation} />
		</Layout>
	);
};
