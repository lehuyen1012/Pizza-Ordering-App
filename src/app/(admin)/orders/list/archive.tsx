import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import orders from "@assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { useAdminOrderList } from "@/api/orders";

export default function OrdersScreen() {
    const {
        data: orders,
        isLoading,
        error,
    } = useAdminOrderList({ archived: true });

    if (isLoading) {
        return <ActivityIndicator />;
    }
    if (error) {
        return <Text>Failed to fetch</Text>;
    }
    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ padding: 10, gap: 10 }}
        />
    );
}
