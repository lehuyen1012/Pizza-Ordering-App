import { Tabs, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListLayout() {
    return (
        <SafeAreaView
            edges={["top"]}
            style={{ flex: 1, backgroundColor: "#fff" }}
        >
            <TopTabs>
                <TopTabs.Screen name="index" options={{ title: "Active" }} />
            </TopTabs>
        </SafeAreaView>
    );
}
