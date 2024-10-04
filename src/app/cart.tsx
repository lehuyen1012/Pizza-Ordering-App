import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/providers/CartProvider";

const CartScreen = () => {
    const { items } = useCart();
    return (
        <View>
            <Text>Cart items length: {items.length}</Text>

            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
        </View>
    );
};

export default CartScreen;

const styles = StyleSheet.create({});
