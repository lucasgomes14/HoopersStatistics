import Back from "../components/Back";
import ListComponent from "../components/ListComponent";
import Logo from "../components/Logo";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#1a1e21",
    }, 
});

export default function AddPlayer() {
    return (
        <View style={styles.container}>
            <Back />
            <Logo />
            <ListComponent />
        </View>
        
  );
}