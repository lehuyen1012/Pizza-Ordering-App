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

            <Text>Select Size</Text>
            <View style={styles.sizes}>
                {sizes.map((size) => (
                    <Pressable
                        onPress={() => setSelectedSize(size)}
                        style={[
                            styles.size,
                            {
                                backgroundColor:
                                    selectedSize === size
                                        ? "gainsboro"
                                        : "white",
                            },
                        ]}
                        key={size}
                    >
                        <Text
                            style={[
                                styles.sizeText,
                                {
                                    color:
                                        selectedSize === size
                                            ? "black"
                                            : "gainsboro",
                                },
                            ]}
                        >
                            {size}
                        </Text>
                    </Pressable>
                ))}
            </View>
            <Text style={styles.price}>${product?.price}</Text>
            <Button onPress={addToCard} text="Add to Cart" />
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
    price: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: "auto",
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
