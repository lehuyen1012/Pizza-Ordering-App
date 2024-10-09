import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useAuth } from "@/providers/AuthProvider";

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const { isAdmin } = useAuth();
    if (!isAdmin) {
        return <Redirect href={"/"} />;
    }
    const { profile } = useAuth();
    if (!profile || profile.group !== "ADMIN") {
        return <Redirect href="/" />;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
                tabBarStyle: {
                    backgroundColor: Colors.light.tint,
                },
            }}
        >
            <Tabs.Screen name="index" options={{ href: null }} />
            <Tabs.Screen
                name="menu"
                options={{
                    title: "Menu",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="cutlery" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    title: "Orders",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="list" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
