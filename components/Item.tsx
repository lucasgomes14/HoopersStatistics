import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import {Player} from "@/types/Player";
import {StyleSheet, TouchableOpacity, View, Text} from "react-native";

interface ItemProps {
    player: Player;
    onRemove: (id: number) => void;
    plusPoint: (id: number, value: number) => void;
    minusPoint: (id: number) => void;
    plusAssist: (id: number) => void;
    minusAssist: (id: number) => void;
    plusRebound: (id: number) => void;
    minusRebound: (id: number) => void;
}

const Item = ({
                   player,
                   onRemove,
                   plusPoint,
                   minusPoint,
                   plusAssist,
                   minusAssist,
                   plusRebound,
                   minusRebound
               }: ItemProps) => {
    return (
        <View style={styles.player}>
            <View style={styles.header}>
                <Text style={styles.textName}>{player.name}</Text>
                <TouchableOpacity onPress={() => onRemove(player.id)}>
                    <Feather name="trash-2" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.statistic}>
                <View>
                    <Text style={styles.text}>Pontos</Text>
                    <Text style={styles.text}>{player.points}</Text>
                    <View style={styles.pointButtons}>
                        <TouchableOpacity
                            onPress={() => minusPoint(player.id)}
                            style={styles.minusPointButton}
                        >
                            <Text style={styles.pointButtonText}>-1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => plusPoint(player.id, 1)} style={styles.pointButton}>
                            <Text style={styles.pointButtonText}>+1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => plusPoint(player.id, 2)} style={styles.pointButton}>
                            <Text style={styles.pointButtonText}>+2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => plusPoint(player.id, 3)} style={styles.pointButton}>
                            <Text style={styles.pointButtonText}>+3</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.divider} />

                <View>
                    <Text style={styles.text}>Assistências</Text>
                    <View style={styles.plusAndMinus}>
                        <TouchableOpacity onPress={() => minusAssist(player.id)}>
                            <AntDesign name="minuscircleo" size={20} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.text}>{player.assist}</Text>
                        <TouchableOpacity onPress={() => plusAssist(player.id)}>
                            <AntDesign name="pluscircleo" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.divider} />

                <View>
                    <Text style={styles.text}>Rebotes</Text>
                    <View style={styles.plusAndMinus}>
                        <TouchableOpacity onPress={() => minusRebound(player.id)}>
                            <AntDesign name="minuscircleo" size={20} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.text}>{player.rebound}</Text>
                        <TouchableOpacity onPress={() => plusRebound(player.id)}>
                            <AntDesign name="pluscircleo" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    player: {
        backgroundColor: "#74200f",
        marginTop: 10,
        marginHorizontal: 16,
        padding: 8,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    textName: {
        color: "#ffffff",
        fontWeight: "bold",
        fontFamily: "Roboto-slab",
        fontSize: 20,
    },
    text: {
        color: "#ffffff",
        fontWeight: "600",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 2,
    },
    statistic: {
        gap: 12
    },
    plusAndMinus: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        marginVertical: 0
    },
    pointButtons: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 4,
        marginTop: 2
    },
    pointButton: {
        backgroundColor: "#e9531b",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginHorizontal: 1,
    },
    minusPointButton: {
        backgroundColor: "#1a1e21",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginHorizontal: 1
    },
    pointButtonText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center"
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginVertical: 6,
    }
})

export default Item;