import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";

const index = () => {
    const { loading, session, profile } = useAuth();

    if (loading) {
        return <ActivityIndicator />;
    }

    if (!session) {
        return <Redirect href="/sign-in" />;
    }

    if (profile?.group === "ADMIN") {
        return (
            <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
                <Link href={"/(user)"} asChild>
                    <Button text="User" />
                </Link>
                <Link href={"/(admin)"} asChild>
                    <Button text="Admin" />
                </Link>
            </View>
        );
    }

    return <Redirect href="/(user)" />;
};

export default index;
