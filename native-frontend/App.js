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
const Stack = createNativeStackNavigator();

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
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: () => <NavBar navigation={navigation} />,
          })}
        ></Stack.Screen>
        <Stack.Screen
          name="Past Hikes"
          component={PastHikesScreen}
          options={({ navigation }) => ({
            headerTitle: () => <NavBar navigation={navigation} />,
          })}
        ></Stack.Screen>
        <Stack.Screen
          name="Hike Details"
          component={HikeDetailsScreen}
          options={({ navigation, route }) => ({
            headerTitle: () => (
              <NavBar
                navigation={navigation}
                title={route.params?.name ?? "Details"}
              />
            ),
          })}
        ></Stack.Screen>
        <Stack.Screen name="Add Hike" component={AddHikeScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
