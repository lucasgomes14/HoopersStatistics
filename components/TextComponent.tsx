import {StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        alignItems: "center",
        width: "100%",
    },
    text: {
        fontSize: 30,
        color: "#FF8C00",
        fontFamily: "Luckiestguy",
    }
})

const textComponents = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hoopers statistics</Text>
        </View>
    );
}

export default textComponents;