import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
	prefixes: [Linking.createURL("/")],
	config: {
		screens: {
			Root: {
				screens: {
					Home: {
						screens: {
							TabOneScreen: "one",
						},
					},
					Search: {
						screens: {
							TabTwoScreen: "two",
						},
					},
					Account: {
						screens: {
							TabOneScreen: "three",
						},
					},
				},
			},
			Modal: "modal",
			Auth: {
				screens: {
					Auth: {
						screens: {
							TabOneScreen: "one",
						},
					},
				},
			},
		},
	},
};

export default linking;
