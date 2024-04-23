import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "@screens/SignIn";
import SignUp from "@screens/SignUp";

const { Navigator, Screen } = createNativeStackNavigator();

function AuthRoutes () {
  return (
    <Navigator>
      <Screen name="SignIn" component={SignIn}></Screen>
      <Screen name="SignUp" component={SignUp}></Screen>
    </Navigator>
  )
}

export default AuthRoutes
