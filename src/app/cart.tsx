import { Platform, StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/providers/CartProvider";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";
const CartScreen = () => {
    const { items, total } = useCart();
    return (
        <View style={{ padding: 10 }}>
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ gap: 10 }}
            />

            <Text
                style={{
                    marginTop: 20,
                    fontSize: 20,
                    fontWeight: "500",
                }}
            >
                Total: ${total}
            </Text>
            <Button text="Checkout" />

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
    );
};

export default CartScreen;

const styles = StyleSheet.create({});
