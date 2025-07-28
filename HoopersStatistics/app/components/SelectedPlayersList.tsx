import {Player} from "@/app/types/Player";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Props {
    players: Player[];
    updateStat: (id: number, field: keyof Player, value: number) => void;
}

export default function SelectedPlayersList({ players, updateStat }: Props) {
        return (
        <FlatList
            data={players}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.selectedContainer}
            renderItem={({ item }) => (
                <View style={styles.playerBlock}>
                    <Text style={styles.textName}>{item.name}</Text>

                    <View style={styles.statistic}>
                        <Text style={styles.text}>Pontos</Text>
                        <Text style={styles.text}>{item.points}</Text>
                        <View style={styles.pointButtons}>
                            <TouchableOpacity style={styles.minusPointButton} onPress={() => updateStat(item.id, "points" as keyof Player, -1)}>
                                <Text style={styles.pointButtonText}>-1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pointButton} onPress={() => updateStat(item.id, "points" as keyof Player, +1)}>
                                <Text style={styles.pointButtonText}>+1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pointButton} onPress={() => updateStat(item.id, "points" as keyof Player, +2)}>
                                <Text style={styles.pointButtonText}>+2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pointButton} onPress={() => updateStat(item.id, "points" as keyof Player, +3)}>
                                <Text style={styles.pointButtonText}>+3</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text style={styles.text}>Assistências</Text>
                            <View style={styles.plusAndMinus}>
                                <TouchableOpacity  onPress={() => updateStat(item.id, "assist" as keyof Player, -1)}>
                                    <AntDesign name="minuscircleo" size={20} color="#E9531B" />
                                </TouchableOpacity>
                                <Text style={styles.text}>{item.assist}</Text>
                                <TouchableOpacity  onPress={() => updateStat(item.id, "assist" as keyof Player, +1)}>
                                    <AntDesign name="pluscircleo" size={20} color="#E9531B" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.text}>Rebotes</Text>
                            <View style={styles.plusAndMinus}>
                                <TouchableOpacity onPress={() => updateStat(item.id, "rebound" as keyof Player, -1)}>
                                    <AntDesign name="minuscircleo" size={20} color="#E9531B" />
                                </TouchableOpacity>
                                <Text style={styles.text}>{item.rebound}</Text>
                                <TouchableOpacity onPress={() => updateStat(item.id, "rebound" as keyof Player, +1)}>
                                    <AntDesign name="pluscircleo" size={20} color="#E9531B" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    selectedContainer: {
        marginTop: 10,
        padding: 8,
    },
    textName: {
        color: "#1A1E21",
        fontWeight: "bold",
        fontFamily: "Roboto-slab",
        fontSize: 20,
        textAlign: "center",
        marginTop: 10
    },
    statistic: {
        alignItems: "center",
    },
    text: {
        color: "#1A1E21",
        fontFamily: "Roboto-slab",
        fontSize: 14,
        textAlign: "center",
        marginTop: 5
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
        backgroundColor: "#E9531B",
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
    playerBlock: {
        backgroundColor: "#D9D9D9",
        borderRadius: 7,
        padding: 10,
        marginBottom: 16
    },
});