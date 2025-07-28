import {Player} from "@/app/types/Player";
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";

interface Props {
    visible: boolean;
    players: Player[];
    selected: number[];
    toggleSelect: (id: number) => void;
    onClose: () => void;
}

export default function PlayerSelectModal({ visible, players, selected, toggleSelect, onClose }: Props) {
    return (
        <Modal visible={visible} animationType="fade">
            <View style={styles.containerModal}>
                <Text style={styles.titleModal}>Escolha até 5 jogadores</Text>

                <FlatList
                    data={players}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.selectedModal,
                                {
                                    backgroundColor: selected.includes(item.id) ? "#E9531B" : "#f0f0f0",
                                },
                            ]}
                            onPress={() => toggleSelect(item.id)}
                        >
                            <Text
                                style={[
                                    styles.textSelectedModal,
                                    { color: selected.includes(item.id) ? "white" : "black" },
                                ]}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />

                <TouchableOpacity style={styles.confirm} onPress={onClose}>
                    <Text style={styles.textConfirm}>Confirmar seleção</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    titleModal: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        fontFamily: "Roboto-slab",
        color: "#D9D9D9",

    },
    containerModal: {
        flex: 1,
        padding: 20,
        backgroundColor: "#1a1e21",
    },
    selectedModal: {
        padding: 10,
        marginBottom: 5,
        borderRadius: 8,
    },
    textSelectedModal: {
        fontSize: 14,
        fontFamily: "Roboto-slab",
    },
    confirm: {
        marginTop: 20,
        backgroundColor: "#E9531B",
        padding: 12,
        borderRadius: 10
    },
    textConfirm: {
        color: "#FFFFFF",
        textAlign: "center"
    },
});