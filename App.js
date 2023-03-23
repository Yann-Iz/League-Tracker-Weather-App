import Home from "./component/Home";
import Rotation from "./component/Rotation";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./component/Login";

const tab = createBottomTabNavigator();
const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Login">
        <stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="NavBotton"
          component={NavBottom}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const NavBottom = () => {
  return (
    <tab.Navigator>
      <tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      ></tab.Screen>
      <tab.Screen
        name="Rotation"
        component={Rotation}
        options={{ headerShown: false }}
      ></tab.Screen>
    </tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
