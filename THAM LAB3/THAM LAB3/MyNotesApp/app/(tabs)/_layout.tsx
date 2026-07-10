import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: true,
        tabBarActiveTintColor: "#FF6B35",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#FFF",
          borderTopColor: "#FFE8DC",
        },
        headerStyle: {
          backgroundColor: "#FF6B35",
        },
        headerTintColor: "#FFF",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Witamy",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="note"
        options={{
          title: "Notatki",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "O autorze",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}