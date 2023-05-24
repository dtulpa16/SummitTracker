import {
  NavigationAction,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import PastHikesScreen from "./screens/PastHikesScreen";
import HikeDetailsScreen from "./screens/HikeDetailsScreen";
import AddHikeScreen from "./screens/AddHikeScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen
          name="Past Hikes"
          component={PastHikesScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="Hike Details"
          component={HikeDetailsScreen}
          options={({ route }) => ({ title: route.params.name || "Details" })}
        ></Stack.Screen>
        <Stack.Screen name="Add Hike" component={AddHikeScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
