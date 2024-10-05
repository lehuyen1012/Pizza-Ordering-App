import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { useState } from "react";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();

    const { addItem } = useCart();

    const router = useRouter();

    const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

    const product = products.find((p) => p.id.toString() === id);

    const addToCard = () => {
        if (!product) {
            return;
        }
        addItem(product, selectedSize);
        router.push("/cart");
    };
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product?.name }} />

            <Image
                source={{ uri: product?.image || defaultPizzaImage }}
                style={styles.image}
            />
            <Text style={styles.title}>{product?.name}</Text>
            <Text style={styles.price}>${product?.price}</Text>
        </View>
    );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        padding: 10,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    price: {
        fontSize: 20,
        fontWeight: "bold",
    },
    sizes: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
    },
    size: {
        backgroundColor: "gainsboro",
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    sizeText: {
        fontSize: 20,
        fontWeight: "500",
    },
});
