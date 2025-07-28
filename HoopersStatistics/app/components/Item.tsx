import Feather from "@expo/vector-icons/Feather";
import {Player} from "../types/Player";
import {StyleSheet, TouchableOpacity, View, Text} from "react-native";

interface ItemProps {
    player: Player;
    onRemove: (id: number) => void;
}

const Item = ({
                   player,
                   onRemove
               }: ItemProps) => {
    return (
        <View style={styles.player}>
            <View style={styles.header}>
                <Text style={styles.textName}>{player.name}</Text>
                <TouchableOpacity style={styles.trash} onPress={() => onRemove(player.id)}>
                    <Feather name="trash-2" size={24} color="#D3D3D3" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    player: {
        backgroundColor: "#E9531B",
        marginBottom: 11,
        marginHorizontal: 34,
        borderRadius: 7,
    },
    header: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 18
    },
    textName: {
        color: "#D3D3D3",
        fontWeight: "semibold",
        fontFamily: "Roboto-slab",
        fontSize: 20,
        lineHeight: 16,
        letterSpacing: .4,
    },
    trash: {
        position: "absolute",
        right: 20
    }
})

export default Item;