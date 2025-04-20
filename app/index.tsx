import {StyleSheet, Text, View} from "react-native";
import TextComponent from "@/components/TextComponent";
import ListComponent from "@/components/ListComponent";

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#1a1e21",
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
