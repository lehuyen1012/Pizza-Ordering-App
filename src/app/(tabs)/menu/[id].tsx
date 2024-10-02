import { StyleSheet, Text, View, Image } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Colors from "@/constants/Colors";

const sizes = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();

    const product = products.find((p) => p.id.toString() === id);
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
                    <View style={styles.size} key={size}>
                        <Text style={styles.sizeText}>{size}</Text>
                    </View>
                ))}
            </View>
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
    price: {
        fontSize: 18,
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
