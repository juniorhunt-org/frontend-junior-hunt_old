import {FontAwesome} from '@expo/vector-icons'
import React, {FC, useEffect, useState} from 'react'
import {IAd, NumberToWeekDay, Schedule} from '../../types'
import styled from 'styled-components/native'
import Button from './Button'
import {useAd} from '../../hooks/useAd'
import {useAuth} from '../../hooks/useAuth'
import {useTheme} from "@react-navigation/native";

interface IAdProps {
  ad: IAd
  navigator: any
}

const Ad: FC<IAdProps> = ({ad, navigator}) => {
  const {colors} = useTheme()
  const {setAd, deleteReplyAd, getSchedule} = useAd()
  const {user} = useAuth()
  const [schedule, setSchedule] = useState<Schedule>({} as Schedule)
  const getScheduleHandler = async () => {
    setSchedule(await getSchedule(ad))
  }

  useEffect(() => {
    getScheduleHandler()
  }, [])

  const detailAd = () => {
    setAd(ad)
    navigator.navigate('AdDetail')
  }

  const Wrapper = styled.View`
    margin-top: 15px;
    padding: 10px 10px;
    background-color: ${colors.background};
    border-radius: 7px;
    border: 2px solid ${colors.primary};
  `

  const Title = styled.Text`
    color: ${colors.text};
    font-weight: 500;
    font-size: 16px;
  `

  const Intro = styled.Text`
    color: #898989;
    margin-top: 10px;
  `

  const Price = styled.Text`
    color: ${colors.primary};
    font-weight: 500;
    margin-top: 10px;
  `

  return (
    <Wrapper>
      <Title>{ad.title}</Title>
      <Intro>
        {ad.description.length > 47
          ? ad.description.substring(0, 47) + '...'
          : ad.description}
      </Intro>
      <Intro>
        <FontAwesome name="user" size={14}/> Количество свободных вакансий:{' '}
        {ad.limit - ad.users.length}
      </Intro>
      <Price>
        <FontAwesome name="money" size={14}/> {ad.payment} ₽ за час
      </Price>
      {schedule && (
        <Price>
          Время работы с {schedule.start} - {schedule.stop} в{' '}
          {NumberToWeekDay[schedule.week_day]}
        </Price>
      )}

      {user.detailInfo.id ? (
        ad.users.includes(user.detailInfo.id) ? (
          <Button
            title="Отменить отклик"
            danger={true}
            onPress={() => deleteReplyAd(ad.id)}
          />
        ) : (
          <Button title="Подробнее" onPress={detailAd}/>
        )
      ) : (
        <Button title="Подробнее" onPress={detailAd}/>
      )}
    </Wrapper>
  )
}

export default Ad
