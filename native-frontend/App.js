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
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#172554",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          screenOptions={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Past Hikes"
          component={PastHikesScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="Hike Details"
          component={HikeDetailsScreen}
          screenOptions={{ headerShown: true }}
          options={({ route }) => ({ title: route.params.name || "Details" })}
        ></Stack.Screen>
        <Stack.Screen name="Add Hike" component={AddHikeScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
