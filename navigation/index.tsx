import {FontAwesome} from '@expo/vector-icons'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import * as React from 'react'
import {ColorSchemeName} from 'react-native'

import Colors from '../constants/Colors'
import {useAuth} from '../hooks/useAuth'
import useColorScheme from '../hooks/useColorScheme'
import Account from '../screens/Account'
import {Home} from '../screens/Home'
import {Search} from '../screens/Search'
import {RootStackParamList, RootTabParamList} from '../types'
import LinkingConfiguration from './LinkingConfiguration'
import Auth from '../screens/Auth'
import {AdDetailScreen} from '../screens/AdDetailScreen'
import AddFormAd from '../screens/AddFormAd'
import Loader from '../components/Loader'

export default function Navigation({
                                     colorScheme
                                   }: {
  colorScheme: ColorSchemeName
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator/>
    </NavigationContainer>
  )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  const {user, isLoading} = useAuth()

  return (
    <Stack.Navigator>
      {user.detailInfo ? (
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{
            headerShown: false
          }}
        />
      ) : isLoading ? (
        <Stack.Screen
          name="Loader"
          component={Loader}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            headerShown: true,
            title: 'Junior Hunt'
          }}
        />
      )}
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          options={{title: 'Объявление'}}
          name="AdDetail"
          component={AdDetailScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const colorScheme = useColorScheme()
  const {user} = useAuth()
  return (
    <BottomTab.Navigator
      initialRouteName="Search"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        unmountOnBlur: true
      }}
    >
      <BottomTab.Screen
        name="Search"
        component={Search}
        options={{
          title: 'Поиск',
          tabBarIcon: ({color}) => <TabBarIcon name="search" color={color}/>
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={() => ({
          title: 'Отклики',
          tabBarIcon: ({color}) => <TabBarIcon name="book" color={color}/>
        })}
      />
      {user.detailInfo.is_company && (
        <BottomTab.Screen
          options={{
            title: 'Объявление',
            tabBarIcon: ({color}) => <TabBarIcon name="plus-circle" color={color}/>
          }}
          name="AddForm"
          component={AddFormAd}
        />
      )}
      <BottomTab.Screen
        name="Account"
        component={Account}
        options={{
          title: 'Профиль',
          tabBarIcon: ({color}) => <TabBarIcon name="user" color={color}/>
        }}
      />
    </BottomTab.Navigator>
  )
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />
}
