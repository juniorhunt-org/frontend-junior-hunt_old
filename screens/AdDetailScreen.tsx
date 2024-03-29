import React, {FC, useEffect, useState} from 'react'
import {Alert} from 'react-native'
import styled from 'styled-components/native'

import {useAd} from '../hooks/useAd'
import {NumberToWeekDay, RootTabScreenProps, Schedule} from '../types'
import Layout from '../components/layout/Layout'
import {FontAwesome} from '@expo/vector-icons'
import Button from '../components/ui/Button'
import {useAuth} from '../hooks/useAuth'
import UserCard from '../components/ui/UserCard'
import {useNotification} from '../hooks/useNotification'
import {NotificationTypes} from "../constants/Notification";
import {FadeInView} from "../components/FadeInView";
import {useTheme} from "@react-navigation/native";

export const AdDetailScreen: FC<RootTabScreenProps<'AdDetail'>> = ({
                                                                     navigation
                                                                   }) => {
  const {ad, requestAd, getSchedule, deleteAd} = useAd()
  const {colors} = useTheme()
  const {user, setIsLoading} = useAuth()
  const [schedule, setSchedule] = useState<Schedule>({} as Schedule)
  const {sendPushNotification} = useNotification()

  const getScheduleHandler = async () => {
    setIsLoading(true)
    setSchedule(await getSchedule(ad))
    setIsLoading(false)
  }

  useEffect(() => {
    getScheduleHandler()
  }, [ad])

  const Title = styled.Text`
    font-weight: 500;
    font-size: 20px;
    margin-top: 20px;
    color: ${colors.text};
  `

  const Description = styled.Text`
    font-size: 16px;
    color: ${colors.text};
    margin-top: 10px;
  `

  const Wrapper = styled.View`
    margin-top: 10px;
    padding: 10px 10px;
    background-color: ${colors.background};
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    border: 2px solid ${colors.primary};
  `

  const Price = styled.Text`
    color: ${colors.primary};
    font-weight: 500;
    font-size: 16px;
    margin-top: 10px;
  `

  const Address = styled.Text`
    font-weight: 500;
  `

  const submitHandler = async () => {
    await requestAd()
    Alert.alert('Вы успешко откликнулись на объявления')
    await sendPushNotification(
      ad.owner,
      `На вашу вакансию откликнулся ${user.detailInfo.first_name} ${user.detailInfo.last_name}`,
      'Подробнее...',
      NotificationTypes.userFeedback
    )
    navigation.goBack()
  }

  const mainButton = user.detailInfo.is_company ? (
    <Button
      title="Удалить"
      danger={true}
      onPress={() => {
        deleteAd(ad.id)
        navigation.navigate('Home')
      }}
    />
  ) : (
    <Button title="Откликнуться" onPress={submitHandler}/>
  )

  return (
    <Layout>
      <FadeInView>
        <Wrapper>
          <Title>{ad.title}</Title>
          <Description>{ad.description}</Description>
          <Description>
            <FontAwesome name="user" size={14}/> Количество свободных вакансий:{' '}
            {ad.limit - ad.users.length}
          </Description>
          <Description>
            Адрес: <Address>{ad.address}</Address>
          </Description>
          <Price>{ad.payment} ₽ за час</Price>
          {schedule && (
            <Price>
              Время работы с {schedule.start} - {schedule.stop} в{' '}
              {NumberToWeekDay[schedule.week_day]}
            </Price>
          )}

          {mainButton}
        </Wrapper>
        <UserCard ad={ad} navigation={navigation} user_id={ad.owner}/>
      </FadeInView>

    </Layout>
  )
}
