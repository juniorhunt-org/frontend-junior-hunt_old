import {SafeAreaProvider} from 'react-native-safe-area-context'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import {AdProvider} from './provider/AdProvider'
import {AuthProvider} from './provider/AuthProvider'
import * as ScreenOrientation from 'expo-screen-orientation'
import React from 'react'
import {StatusBar} from 'expo-status-bar'
import NotificationProvider from "./provider/NotificationProvider";

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <AuthProvider>
        <NotificationProvider>
          <AdProvider>
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme}/>
            </SafeAreaProvider>
          </AdProvider>
          <StatusBar style="auto"/>
        </NotificationProvider>
      </AuthProvider>
    )
  }
}
