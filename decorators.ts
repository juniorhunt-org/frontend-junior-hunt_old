import { Alert } from 'react-native'

export async function ApiErrorAlert(callback: () => any) {
	try {
		return await callback()
	} catch (error: any) {
		const errorData = error.response.data
		let errorMessage = ''
		Object.keys(errorData).forEach((key: any) => {
			let fieldsKey = key
			switch (key) {
				case 'phone':
					fieldsKey = 'Номер телефона: '
					break
				case 'email':
					fieldsKey = 'Email: '
					break
				case 'non_field_errors':
					fieldsKey = ''
					break
				case 'username':
					fieldsKey = 'Никнейм: '
					break
				case 'password':
					fieldsKey = 'Пароль: '
					break
				case 'address':
					fieldsKey = 'Адрес: '
					break
				case 'payment':
					fieldsKey = 'Оплата за час: '
					break
				case 'description':
					fieldsKey = 'Описание: '
					break
				case 'title':
					fieldsKey = 'Заголовок: '
					break
			}
			errorMessage = `${errorMessage}${fieldsKey + errorData[key][0] + '\n'}`
		})
		Alert.alert('Ошибка', errorMessage)
	}
}
