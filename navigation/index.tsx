import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import Colors from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";
import useColorScheme from "../hooks/useColorScheme";
import Account from "../screens/Account";
import { Home } from "../screens/Home";
import { Search } from "../screens/Search";
import {
	AuthTabParamList,
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Auth from "../screens/Auth";
import { ModalScreen } from "../screens/ModalScreen";

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

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	const { user } = useAuth();
	console.log(user);
	return (
		<Stack.Navigator>
			{user.detailInfo ? (
				<Stack.Screen
					name="Root"
					component={BottomTabNavigator}
					options={{ headerShown: false }}
				/>
			) : (
				<Stack.Screen
					name="Auth"
					component={AuthBottomTabNavigator}
					options={{ headerShown: false }}
				/>
			)}
			<Stack.Group screenOptions={{ presentation: "modal" }}>
				<Stack.Screen
					options={{ title: "Объявление" }}
					name="Modal"
					component={ModalScreen}
				/>
			</Stack.Group>
		</Stack.Navigator>
	);
}

const bottomTabAuth = createBottomTabNavigator<AuthTabParamList>();

function AuthBottomTabNavigator() {
	const colorScheme = useColorScheme();
	return (
		<bottomTabAuth.Navigator
			initialRouteName="Auth"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
			}}
		>
			<bottomTabAuth.Screen
				name="Auth"
				component={Auth}
				options={() => ({
					title: "Авторизация",
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="user-circle" color={color} />
					),
				})}
			/>
		</bottomTabAuth.Navigator>
	);
}

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
					title: "Главная",
					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
				})}
			/>
			<BottomTab.Screen
				name="Search"
				component={Search}
				options={{
					title: "Поиск",
					tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="Account"
				component={Account}
				options={{
					title: "Профиль",
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
