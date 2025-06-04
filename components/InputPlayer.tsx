import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useState} from "react";

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
                <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 40,
    },
    input: {
        backgroundColor: "#2c2929",
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 15,
        padding: 6,
        borderWidth: 1,
        borderColor: "#e9531b",
        color: "#e9531b",
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: "#e9531b",
        borderRadius: 15,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        color: "#000000",
    },
    plus: {
        fontSize: 20,
    }
})

export default InputPlayer;