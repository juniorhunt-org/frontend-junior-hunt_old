import { FlatList, RefreshControl } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { IAd } from '../types'
import { getMyAds } from '../provider/api'
import UserCard from './ui/UserCard'
import { FadeInView } from './FadeInView'

const UsersList: FC<{ navigation: any }> = ({ navigation }) => {
	const { user, isLoading, setIsLoading } = useAuth()
	const [myAds, setMyAds] = useState<IAd[]>([])

	const getData = async () => {
		setIsLoading(true)
		if (user.detailInfo.id) {
			setMyAds(await getMyAds(user.token, user.detailInfo.id))
		}
		setIsLoading(false)
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<FadeInView>
			<FlatList
				data={myAds}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={getData} />
				}
				renderItem={({ item }) => (
					<>
						{item.users.map((user_id) => (
							<UserCard navigation={navigation} user_id={user_id} ad={item} />
						))}
					</>
				)}
				keyExtractor={(item) => `user ${item.id}`}
			/>
		</FadeInView>
	)
}

export default UsersList
