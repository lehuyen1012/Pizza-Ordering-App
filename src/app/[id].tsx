import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text style={{ color: "white" }}>id for {id}</Text>
        </View>
    );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({});
