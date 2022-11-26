import {TouchableOpacity} from "react-native";
import React, {FC, useCallback, useEffect, useState} from "react";
import {IAd, ProfileUser} from "../../types";
import {useAuth} from "../../hooks/useAuth";
import styled from "styled-components/native";
import {useAd} from "../../hooks/useAd";
import {FadeInView} from "../FadeInView";
import {useTheme} from "@react-navigation/native";

interface IUserCard {
  ad?: IAd;
  user_id: number;
  navigation?: any;
  showAd?: boolean;
}

const UserCard: FC<IUserCard> = ({ad, user_id, navigation}) => {
  const [profile, setProfile] = useState<ProfileUser>({} as ProfileUser);
  const {colors} = useTheme();
  const {getUserInfo} = useAuth();
  const {setAd} = useAd();

  const getInfo = useCallback(async () => {
    setProfile(await getUserInfo(user_id));
  }, [user_id]);

  const Wrapper = styled.View`
    margin-top: 15px;
    padding: 10px 10px;
    background-color: ${colors.background};
    border-radius: 10px;
    border: 2px solid ${colors.border};
  `;

  const Title = styled.Text`
    color: ${colors.text};
    font-weight: 500;
    font-size: 16px;
  `;

  const Intro = styled.Text`
    color: #898989;
    margin-top: 10px;
  `;

  const Price = styled.Text`
    color: ${colors.primary};
    font-weight: 700;
    margin-top: 10px;
  `;

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <FadeInView>
      <Wrapper>
        <Title>
          Пользователь: {profile.first_name} {profile.last_name}
        </Title>
        <Intro>Описание: {profile.description}</Intro>
        {!profile.is_company ? (
          <>
            <Intro>Контактные данные: {profile.contacts}</Intro>
            {ad && (
              <TouchableOpacity
                onPress={() => {
                  setAd(ad);
                  navigation.navigate("AdDetail");
                }}
              >
                <Price>По объявлению: {ad.title}</Price>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            <Intro>Компания: {profile.company_name}</Intro>
          </>
        )}
      </Wrapper>
    </FadeInView>
  );
};

export default UserCard;
