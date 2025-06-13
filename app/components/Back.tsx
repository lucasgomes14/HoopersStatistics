import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        left: 21,
        top: 50,
        zIndex: 10
    },
});

export default function Back() {
    const router = useRouter();

    const handlePress = () => {
        router.back();
    };

    return (
        <TouchableOpacity style={styles.backButton} onPress={handlePress}>
            <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
    );
}