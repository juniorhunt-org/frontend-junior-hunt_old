import React, { FC } from "react";
import AdList from "../components/AdList";
import { FadeInView } from "../components/FadeInView";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { RootTabScreenProps } from "../types";

export const Search: FC<RootTabScreenProps<"Search">> = ({ navigation }) => {
	const { fetchAds, user } = useAuth();

	return (
		<FadeInView>
			<Layout>
				{user.detailInfo.is_company && (
					<Button
						title="Создать объявления"
						onPress={() => {
							navigation.navigate("addForm");
						}}
					/>
				)}
				<AdList getData={fetchAds} navigation={navigation} />
			</Layout>
		</FadeInView>
	);
};
