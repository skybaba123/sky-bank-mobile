import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "./constants/colors";

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "./screens/Home";
import Pay from "./screens/Pay";
import Invest from "./screens/Invest";
import Card from "./screens/Cards";
import More from "./screens/More";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AccountDetails from "./screens/AccountDetails";
import MakePayment from "./screens/MakePayment";
import AuthContextProvider, { AuthContext } from "./store/auth";
import { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["new NativeEventEmitter"]);
LogBox.ignoreAllLogs();

const Authentication = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.darkGrey },
        headerStyle: {
          backgroundColor: colors.darkGrey,
          backgroundColor: colors.darkGrey,
          borderBottomColor: "dimgrey",
          borderBottomWidth: 0.3,
        },
      }}
    >
      <Stack.Screen
        name="welcomeScreen"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="registerScreen"
        component={RegisterScreen}
        options={{
          headerTintColor: "#fff",
          headerTitle: "Open an Account",
        }}
      />
      <Stack.Screen
        name="loginScreen"
        component={LoginScreen}
        options={{
          headerTintColor: "#fff",
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
};

const AllTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.darkGrey,
          borderBottomColor: "dimgrey",
          borderBottomWidth: 0.3,
        },
        tabBarStyle: {
          backgroundColor: colors.lightGrey,
        },
        tabBarActiveTintColor: colors.orange,
      }}
      sceneContainerStyle={{ backgroundColor: colors.darkGrey }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Pay"
        component={Pay}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="send" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Invest"
        component={Invest}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Card"
        component={Card}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="credit-card" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="dots-grid"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const OverallNavigator = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const refresh = async () => {
      const userEmail = await AsyncStorage.getItem("USEREMAIL");
      authCtx.getCurrentUserHandler(userEmail);
      const token = await AsyncStorage.getItem("TOKEN");
      authCtx.loginHandler(token);
    };
    refresh();
  }, [authCtx.users]);

  if (authCtx.users.length > 0) {
    SplashScreen.hideAsync();
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!authCtx.authenticated && (
          <Stack.Screen name="auth" component={Authentication} />
        )}

        {authCtx.authenticated && (
          <Stack.Screen name="allTabs" component={AllTabs} />
        )}

        {authCtx.authenticated && (
          <Stack.Screen
            name="accountDetails"
            component={AccountDetails}
            options={{
              headerShown: true,
              title: "Account Details",
              contentStyle: { backgroundColor: colors.darkGrey },
              headerStyle: { backgroundColor: colors.darkGrey },
              headerTintColor: "#fff",
            }}
          />
        )}

        {authCtx.authenticated && (
          <Stack.Screen
            name="payment"
            component={MakePayment}
            options={{
              headerShown: true,
              title: "New NGN Reciepient",
              contentStyle: { backgroundColor: colors.darkGrey },
              headerStyle: { backgroundColor: colors.darkGrey },
              headerTintColor: "#fff",
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <AuthContextProvider>
          <OverallNavigator />
        </AuthContextProvider>
      </SafeAreaView>
    </>
  );
}
