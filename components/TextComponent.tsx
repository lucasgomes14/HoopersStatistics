import {StyleSheet, Text, View} from "react-native";

const textComponents = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hoopers statistics</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        alignItems: "center",
        width: "100%",
    },
    text: {
        fontSize: 30,
        color: "#e9531b",
        fontFamily: "Luckiestguy",
    }
})

export default textComponents;