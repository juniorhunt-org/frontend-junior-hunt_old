import { Alert } from "react-native";

export async function ApiErrorAlert(targer: () => any) {
	try {
		const value = await targer();
		return value;
	} catch (error: any) {
		console.log("error", error.response);
		const errorData = error.response.data;
		Object.keys(errorData).forEach((key: any) => {
			let fieldsKey = key;
			switch (key) {
				case "phone":
					fieldsKey = "Номер телефона: ";
					break;
				case "email":
					fieldsKey = "Email: ";
					break;
				case "username":
					fieldsKey = "Никнейм: ";
					break;
				case "password":
					fieldsKey = "Пароль: ";
					break;
				case "non_field_errors":
					fieldsKey = "";
					break;
				case "username":
					fieldsKey = "Никнейм: ";
					break;
				case "password":
					fieldsKey = "Пароль: ";
					break;
				case "address":
					fieldsKey = "Адрес: ";
					break;
				case "payment":
					fieldsKey = "Оплата за час: ";
					break;
				case "description":
					fieldsKey = "Описание: ";
					break;
				case "title":
					fieldsKey = "Заголовок: ";
					break;
			}
			Alert.alert("Ошибка регистрации", fieldsKey + errorData[key][0]);
		});
	}
}
