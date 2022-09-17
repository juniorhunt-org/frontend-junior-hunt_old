import { Platform } from "react-native";
import React, {
	createContext,
	FC,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import axios from "axios";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

interface NotificationContextInterface {
	sendPushNotification: (
		user_id: number,
		title: string,
		body: string
	) => Promise<void>;
	createNotificationTokenOrUpdateInDb: (
		user_id: number,
		token: string
	) => Promise<void>;
	deleteNotificationTokenFromDb: (
		user_id: number,
		token: string
	) => Promise<void>;
}

interface NotificationApiResponse {
	id: number;
	user: number;
	user_id: number;
	token: string;
}

export const NotificationContext = createContext<NotificationContextInterface>(
	{} as NotificationContextInterface
);

const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [expoPushToken, setExpoPushToken] = useState("");
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef<any>();
	const responseListener = useRef<any>();

	useEffect(() => {
		registerForPushNotificationsAsync().then(
			(token) => token && setExpoPushToken(token)
		);
		console.log(expoPushToken);
		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification !== undefined);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				console.log(response);
			});

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	const sendPushNotification = async (
		user_id: number,
		title: string,
		body: string
	) => {
		const { token } = await getDetailNotificationTokenByUserId(user_id);
		const message = {
			to: token,
			sound: "default",
			title,
			body,
			data: {},
		};
		await axios.post("https://exp.host/--/api/v2/push/send", message);
	};

	const registerForPushNotificationsAsync = async () => {
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
			const token = (await Notifications.getExpoPushTokenAsync()).data;
			return token;
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
	};

	const getDetailNotificationTokenByUserId = async (userId: number) => {
		const response = await axios.get(
			`http://213.139.208.189/api/v1/user_notification/?user_id=${userId}`
		);
		const data: NotificationApiResponse[] = response.data;
		return data[0];
	};

	const createNotificationTokenOrUpdateInDb = async (
		userId: number,
		token: string
	) => {
		try {
			await axios.post(
				"http://213.139.208.189/api/v1/user_notification/",
				{ user: userId, user_id: userId, token: expoPushToken },
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);
		} catch (error: any) {
			const { id } = await getDetailNotificationTokenByUserId(userId);
			await axios.patch(
				`http://213.139.208.189/api/v1/user_notification/${id}/`,
				{ token: expoPushToken },
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			);
		}
	};

	const deleteNotificationTokenFromDb = async (
		userId: number,
		token: string
	) => {
		const { id } = await getDetailNotificationTokenByUserId(userId);
		await axios.delete(
			`http://213.139.208.189/api/v1/user_notification/${id}/`,
			{
				headers: {
					Authorization: `Token ${token}`,
				},
			}
		);
	};

	const value = {
		createNotificationTokenOrUpdateInDb,
		sendPushNotification,
		deleteNotificationTokenFromDb,
	};

	return (
		<NotificationContext.Provider value={value}>
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationProvider;
