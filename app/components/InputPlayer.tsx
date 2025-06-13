import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import AntDesign from '@expo/vector-icons/AntDesign';

const InputPlayer = ({ onAdd }: { onAdd: (name: string) => void }) => {

    const [player, setPlayer] = useState("")

    const handleAdd = () => {
        if (player === "") return;

        onAdd(player);
        setPlayer("");
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={newPlayer => setPlayer(newPlayer)}
                placeholder={"Nome do jogador"}
                placeholderTextColor={"#FF8C00"}
                defaultValue={player}
            />
            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                <AntDesign name="plus" size={24} color="#D3D3D3" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 34,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24
    },
    input: {
        height: 54,
        backgroundColor: "#2c2929",
        flex: 1,
        marginRight: 10,
        borderRadius: 38,
        padding: 6,
        borderWidth: 1,
        borderColor: "#e9531b",
        color: "#e9531b",
        fontWeight: "semibold",
        fontFamily: "Roboto-slab",
        paddingLeft: 12,
        fontSize: 12
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: "#e9531b",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        color: "#000000",
    },
})

export default InputPlayer;