import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";
import { useOrderDetails } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/orders/subscription";

export default function OrderDetailsScreen() {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(
        typeof idString === "string" ? idString : idString[0]
    );

    const { data: order, isLoading, error } = useOrderDetails(id);
    useUpdateOrderSubscription(id);

    if (isLoading) {
        return <ActivityIndicator />;
    }
    if (error) {
        return <Text>Error</Text>;
    }

    return (
        <View style={{ padding: 10, gap: 20 }}>
            <Stack.Screen options={{ title: `order #${id}` }} />

            <FlatList
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
                ListHeaderComponent={() => <OrderListItem order={order} />}
            />
        </View>
    );
}
