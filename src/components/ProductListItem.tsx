import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { Product } from "../types";
import { Link, useSegments } from "expo-router";

export const defaultPizzaImage = "https://i.imgur.com/KaO2MNS.jpeg";

type ProductListItemProps = {
    product: Product;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
    const segments = useSegments();

    return (
        <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
            <Pressable style={styles.container}>
                <Image
                    source={{ uri: product.image || defaultPizzaImage }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.title}> {product.name} </Text>
                <Text style={styles.price}> ${product.price} </Text>
            </Pressable>
        </Link>
    );
};
export default ProductListItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: "50%",
        backgroundColor: Colors.white,
        padding: 10,
        borderRadius: 20,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginVertical: 10,
    },
    price: {
        color: Colors.light.tint,
        fontWeight: "bold",
    },
});
