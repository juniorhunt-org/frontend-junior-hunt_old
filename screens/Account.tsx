import React, { FC, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import Label from "../components/ui/Label";
import Field from "../components/ui/Field";
import styled from "styled-components/native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { FadeInView } from "../components/FadeInView";
import UserCard from "../components/ui/UserCard";
import { useNotification } from "../hooks/useNotification";

export interface IUpdateData {
	description: string;
	contacts: string;
}

const Account: FC = () => {
	const { logout, user, updateUserProfile } = useAuth();
	const [data, setData] = useState<IUpdateData>({} as IUpdateData);
	const colorscheme = useColorScheme();
	const [isUpdate, setIsUpdate] = useState<boolean>(false);
	const { deleteNotificationTokenFromDb } = useNotification();

	return (
		<Layout>
			<Button
				onPress={() => setIsUpdate(!isUpdate)}
				title={isUpdate ? "Посмотреть информацию" : "Обновить информацию"}
			/>
			{isUpdate ? (
				<FadeInView>
					<KeyboardAvoidingView
						keyboardVerticalOffset={Platform.select({ ios: 100, android: 100 })}
						style={{ flex: 1 }}
						behavior="padding"
					>
						<ScrollView>
							<View
								style={{
									marginTop: 15,
									padding: 10,
									backgroundColor: Colors[colorscheme].background,
									borderRadius: 10,
									borderWidth: 2,
									shadowColor: "#000",
									shadowOffset: { width: 0, height: 2 },
									shadowOpacity: 0.5,
									shadowRadius: 3.84,
									elevation: 5,
									borderColor: Colors[colorscheme].tint,
								}}
							>
								<Label>
									{user.detailInfo.first_name} {user.detailInfo.last_name}
								</Label>
								<Field
									placeholder="Изменить описание"
									multiline
									onChange={(value) => setData({ ...data, description: value })}
									val={data.description}
								/>
								<Field
									multiline
									placeholder="Изменить контактные данные"
									onChange={(value) => setData({ ...data, contacts: value })}
									val={data.contacts}
								/>
								<Button
									title="Обновить информацию"
									onPress={() => {
										updateUserProfile(data);
										setIsUpdate(!isUpdate);
									}}
								/>
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</FadeInView>
			) : (
				<UserCard showAd={false} user_id={user.detailInfo.id} />
			)}
			<View>
				<Button
					title="Выйти"
					onPress={() => {
						deleteNotificationTokenFromDb(user.detailInfo.id, user.token);
						logout();
					}}
				/>
			</View>
		</Layout>
	);
};

export default Account;
