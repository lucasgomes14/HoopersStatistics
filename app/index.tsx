import {StyleSheet, Text, View} from "react-native";
import TextComponent from "@/components/TextComponent";
import ListComponent from "@/components/ListComponent";

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#696969",
        height: "100%",
    }
});

export default function Index() {
  return (
    <View style={styles.container}>
        <TextComponent />
        <ListComponent />
    </View>
  );
}
