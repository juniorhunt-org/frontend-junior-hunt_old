import {Platform} from 'react-native'
import React, {createContext, FC, ReactNode, useEffect, useRef, useState} from 'react'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import {Notification} from 'expo-notifications'
import axios from 'axios'
import {NotificationTypes} from "../constants/Notification";
import {API_ROOT} from "../constants/Api";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

interface IMessageData {
  type: NotificationTypes
}

interface NotificationContextInterface {
  sendPushNotification: (
    user_id: number,
    title: string,
    body: string,
    notification_type: NotificationTypes
  ) => Promise<void>
  createNotificationTokenOrUpdateInDb: (
    user_id: number,
    token: string
  ) => Promise<void>
  deleteNotificationTokenFromDb: (
    user_id: number,
    token: string
  ) => Promise<void>
}

interface NotificationApiResponse {
  id: number
  user: number
  user_id: number
  token: string
}

export const NotificationContext = createContext<NotificationContextInterface>(
  {} as NotificationContextInterface
)

const NotificationProvider: FC<{ children: ReactNode }> = ({children}) => {
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState<Notification | null>(null)
  const notificationListener = useRef<any>()
  const responseListener = useRef<any>()

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    )
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // @ts-ignore
        const {type}: IMessageData = response.notification.request.content.data
        switch (type) {
          case NotificationTypes.userFeedback:
            break;
        }
      })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  const sendPushNotification = async (
    user_id: number,
    title: string,
    body: string,
    notification_type: NotificationTypes
  ) => {
    try {
      const {token} = await getDetailNotificationTokenByUserId(user_id)
      const message = {
        to: token,
        sound: 'default',
        title,
        body,
        data: {
          type: notification_type
        }
      }
      await axios.post('https://exp.host/--/api/v2/push/send', message)
    } catch (err) {
    }
  }

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const {status: existingStatus} =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const {status} = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Пожалуйста, дайте к отправки уведомлений')
        return
      }
      return (await Notifications.getExpoPushTokenAsync()).data
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }
  }

  const getDetailNotificationTokenByUserId = async (userId: number) => {
    const response = await axios.get(
      `${API_ROOT}/api/v1/user_notification/?user_id=${userId}`
    )
    const data: NotificationApiResponse[] = response.data
    return data[0]
  }

  const createNotificationTokenOrUpdateInDb = async (
    userId: number,
    token: string
  ) => {
    try {
      await axios.post(
        `${API_ROOT}/api/v1/user_notification`,
        {user: userId, user_id: userId, token: expoPushToken},
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
    } catch (error: any) {
      const {id} = await getDetailNotificationTokenByUserId(userId)
      await axios.patch(
        `${API_ROOT}/api/v1/user_notification/${id}/`,
        {token: expoPushToken},
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )
    }
  }

  const deleteNotificationTokenFromDb = async (
    userId: number,
    token: string
  ) => {
    const {id} = await getDetailNotificationTokenByUserId(userId)
    await axios.delete(
      `${API_ROOT}/api/v1/user_notification/${id}/`,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
  }

  const value = {
    createNotificationTokenOrUpdateInDb,
    sendPushNotification,
    deleteNotificationTokenFromDb
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
