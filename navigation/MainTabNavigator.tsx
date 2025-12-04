import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import InsightsScreen from "@/screens/InsightsScreen";
import { useTheme } from "@/hooks/useTheme";
import { RootStackParamList } from "./RootNavigator";

export type MainTabParamList = {
  HomeTab: undefined;
  AddTab: undefined;
  InsightsTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function AddPlaceholder() {
  return null;
}

export default function MainTabNavigator() {
  const { theme, isDark } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Platform.select({
            ios: "transparent",
            android: theme.backgroundDefault,
          }),
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={100}
              tint={isDark ? "dark" : "light"}
              style={StyleSheet.absoluteFill}
            />
          ) : null,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddTab"
        component={AddPlaceholder}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("AddExpense");
          },
        }}
        options={{
          title: "Add",
          tabBarIcon: ({ color }) => (
            <Pressable
              style={[styles.addButton, { backgroundColor: theme.primary }]}
              onPress={() => navigation.navigate("AddExpense")}
            >
              <Feather name="plus" size={24} color="#FFFFFF" />
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="InsightsTab"
        component={InsightsScreen}
        options={{
          title: "Insights",
          tabBarIcon: ({ color, size }) => (
            <Feather name="zap" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
