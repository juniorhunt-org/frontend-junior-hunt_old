import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { Platform } from "react-native";
import axios from "axios";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

interface NotificationContextInterface {
	expoPushToken: string;
	sendPushNotification: (
		expoPushToken: string,
		title: string,
		description: string
	) => Promise<void>;
	getUserNotificationToken: (user_id: number) => Promise<string>;
	createUserNotificationToken: (user_id: number) => Promise<void>;
}

export const NotificationContext = createContext<NotificationContextInterface>(
	{} as NotificationContextInterface
);

interface IProvider {
	children: ReactNode;
}

export const NotificationProvider: FC<IProvider> = ({ children }) => {
	const [expoPushToken, setExpoPushToken] = useState("");

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => {
			token !== undefined && setExpoPushToken(token);
			console.log("register token", token);
		});
	});

	const sendPushNotification = async (
		expoPushToken: string,
		title: string,
		description: string
	) => {
		const message = {
			to: expoPushToken,
			sound: "default",
			title: title,
			body: description,
			data: { someData: "goes here" },
		};

		await fetch("https://exp.host/--/api/v2/push/send", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Accept-encoding": "gzip, deflate",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		});
	};

	const registerForPushNotificationsAsync = async () => {
		let token;
		if (Device.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== "granted") {
				alert("Failed to get push token for push notification!");
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
			console.log(token);
		} else {
			alert("Must use physical device for Push Notifications");
		}

		if (Platform.OS === "android") {
			Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			});
		}
		return token;
	};

	const getUserNotificationToken = async (user_id: number) => {
		const response = await axios.get(
			`http://213.139.208.189/api/v1/user_notification/?user_id=${user_id}`
		);
		return response.data[0].token;
	};
	const createUserNotificationToken = async (user_id: number) => {
		console.log("register token");
		const response = await axios.post(
			"http://213.139.208.189/api/v1/user_notification/",
			{
				user_id,
				token: expoPushToken,
				user: user_id,
			}
		);
		console.log(response.data);
	};

	const value = {
		expoPushToken,
		sendPushNotification,
		getUserNotificationToken,
		createUserNotificationToken,
	};

	return (
		<NotificationContext.Provider value={value}>
			{children}
		</NotificationContext.Provider>
	);
};
