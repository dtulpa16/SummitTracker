import {
  NavigationAction,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import PastHikesScreen from "./screens/PastHikesScreen";
import HikeDetailsScreen from "./screens/HikeDetailsScreen";
import AddHikeScreen from "./screens/AddHikeScreen";
import NavBar from "./components/NavBar";
import { Toast } from "react-native-toast-message/lib/src/Toast";
const Stack = createNativeStackNavigator();
const NestedStack = createNativeStackNavigator();

function NestedNavigator() {
  return (
    <NestedStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <NestedStack.Screen name="Home" component={HomeScreen} />
      <NestedStack.Screen name="Past Hikes" component={PastHikesScreen} />
      <NestedStack.Screen name="Hike Details" component={HikeDetailsScreen} />
      <NestedStack.Screen name="Add Hike" component={AddHikeScreen} />
    </NestedStack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerBackVisible: false,
        }}
      >
        <Stack.Screen
          name="Main"
          component={NestedNavigator}
          options={(navigation) => ({
            header: () => <NavBar navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
