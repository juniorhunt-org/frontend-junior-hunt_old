import React, { FC, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FadeInView } from '../components/FadeInView'
import Layout from '../components/layout/Layout'
import Login from '../components/Login'
import Register from '../components/Register/Register'
import Button from '../components/ui/Button'
import { RootStackScreenProps } from '../types'

const Auth: FC<RootStackScreenProps<'Auth'>> = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true)

	return (
		<FadeInView>
			<Layout>
				<>
					{isLogin ? <Login /> : <Register />}
					<SafeAreaView>
						<Button
							title={isLogin ? 'Зарегистрироваться' : 'Войти'}
							onPress={() => setIsLogin(!isLogin)}
						/>
					</SafeAreaView>
				</>
			</Layout>
		</FadeInView>
	)
}

export default Auth
