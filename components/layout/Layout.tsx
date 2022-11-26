import {View} from 'react-native'
import React, {FC, useEffect} from 'react'
import {useAuth} from '../../hooks/useAuth'
import {useNotification} from '../../hooks/useNotification'
import {useTheme} from "@react-navigation/native";

interface ILayout {
  children: React.ReactNode
}

const Layout: FC<ILayout> = ({children}) => {
  const {colors} = useTheme()

  const {user} = useAuth()
  const {createNotificationTokenOrUpdateInDb} = useNotification()

  useEffect(() => {
    if (user && user.detailInfo) {
      createNotificationTokenOrUpdateInDb(user.detailInfo.id, user.token)
    }
  }, [user])

  return (
    <View
      style={{
        paddingHorizontal: 16,
        height: '100%',
        backgroundColor: colors.background
      }}
    >
      {children}
    </View>
  )
}

export default Layout
