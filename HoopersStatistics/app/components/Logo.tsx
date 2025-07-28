import { Image, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 50,
        marginBottom: 38
    },
    image: {
      width: 127,
      height: 114,
    }
});

export default function Logo() {
    return (
        <View style={styles.container}>
            <Image
                      source={require("../assets/images/logo.png")}
                      style={styles.image}
                      resizeMode="contain"
                    />
        </View>
    );
}