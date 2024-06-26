import { Platform } from "react-native"
import { useTheme } from "native-base";
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import HomeSVG from "@assets/home.svg"
import HistorySVG from "@assets/history.svg"
import ProfileSVG from "@assets/profile.svg"

import Home from "@screens/Home";
import History from "@screens/History";
import Profile from "@screens/Profile";
import Exercise from "@screens/Exercise";

type AppRoutes = {
    home: undefined,
    exercise: {
      exerciseId: string
    },
    history: undefined,
    profile: undefined,
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes> 

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

function AppRoutes () {

    const { sizes, colors } = useTheme()

    const iconSizes = sizes[6]
    
  return (
    <Navigator screenOptions={{
        headerShown: false, 
        tabBarShowLabel: false, 
        tabBarActiveTintColor: colors.green[500], 
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
            backgroundColor: colors.gray[600],
            borderTopWidth: 0,
            height: Platform.OS === "android" ? "auto" : 96,
            paddingBottom: sizes[10],
            paddingTop: sizes[6],
        }
        }}>
      <Screen name="home" component={Home} options={{tabBarIcon: ({ color })=> <HomeSVG fill={color} width={iconSizes} height={iconSizes} /> }} />
      <Screen name="history" component={History} options={{tabBarIcon: ({color}) => <HistorySVG fill={color} width={iconSizes} height={iconSizes} /> }} />
      <Screen name="profile" component={Profile} options={{tabBarIcon: ({color}) => <ProfileSVG fill={color} width={iconSizes} height={iconSizes} /> }}  />
      <Screen name="exercise" component={Exercise} options={{ tabBarButton: () => null }} />
    </Navigator>
  )
}

export default AppRoutes
