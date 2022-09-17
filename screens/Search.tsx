import React, { FC, useEffect } from "react";
import AdList from "../components/AdList";
import { FadeInView } from "../components/FadeInView";
import Layout from "../components/layout/Layout";
import { useAuth } from "../hooks/useAuth";
import { RootTabScreenProps } from "../types";

export const Search: FC<RootTabScreenProps<"Search">> = ({ navigation }) => {
	const { fetchAds, user } = useAuth();

	return (
		<FadeInView>
			<Layout>
				<AdList
					getData={fetchAds}
					navigation={navigation}
					myAds={user.detailInfo.is_company}
				/>
			</Layout>
		</FadeInView>
	);
};
