/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Account from "../screens/Account";
import Home from "../screens/Home";
import Search from "../screens/Search";
import TabTwoScreen from "../screens/Search";
import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Root"
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="Home"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
			}}
		>
			<BottomTab.Screen
				name="Home"
				component={Home}
				options={({ navigation }: RootTabScreenProps<"Home">) => ({
					title: "Home",
					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
				})}
			/>
			<BottomTab.Screen
				name="Search"
				component={Search}
				options={{
					title: "Search",
					tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="Account"
				component={Account}
				options={{
					title: "Account",
					tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}


function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
