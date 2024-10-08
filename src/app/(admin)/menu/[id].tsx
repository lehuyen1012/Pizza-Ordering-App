import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { useState } from "react";
import Colors from "@/constants/Colors";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProvider";
import { PizzaSize } from "@/types";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useProduct } from "@/api/products";
import { ActivityIndicator } from "react-native";
import RemoteImage from "@/components/RemoteImage";
const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(
        typeof idString === "string" ? idString : idString[0]
    );
    const { data: product, isLoading, error } = useProduct(id);
    const { addItem } = useCart();

    const router = useRouter();

    const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

    const addToCard = () => {
        if (!product) {
            return;
        }
        addItem(product, selectedSize);
        router.push("/cart");
    };

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Error</Text>;
    }
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Menu",
                    headerRight: () => (
                        <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{
                                            marginRight: 15,
                                            opacity: pressed ? 0.5 : 1,
                                        }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Stack.Screen options={{ title: product?.name }} />

            <RemoteImage
                path={product?.image}
                fallback={defaultPizzaImage}
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
