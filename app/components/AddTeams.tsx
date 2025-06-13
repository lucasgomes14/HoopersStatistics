import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {usePlayers} from "@/app/contexts/PlayersContext";
import {useState} from "react";
import SelectedPlayersList from "@/app/components/SelectedPlayersList";
import PlayerSelectModal from "@/app/components/PlayerSelectModal";
import {Player} from "@/app/types/Player";

interface Props {
    numberTeam: string;
    players: Player[];
    setPlayers: (players: Player[]) => void;
    updateStat: (id: number, field: keyof Player, value: number) => void;
}

export default function AddTeams({ numberTeam, players, setPlayers, updateStat }: Props) {
    const { players: allPlayers } = usePlayers();
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState<number[]>([]);

    const toggleSelect = (id: number) => {
        if (selected.includes(id)) {
            setSelected(prev => prev.filter(pid => pid !== id));
        } else {
            if (selected.length >= 5) {
                Alert.alert("Limite de 5 jogadores");
                return;
            }
            setSelected(prev => [...prev, id]);
        }
    };

    const confirmSelection = () => {
        const selectedPlayers = allPlayers
            .filter(p => selected.includes(p.id))
            .map(p => ({
                ...p,
                points: 0,
                assist: 0,
                rebound: 0,
            }));

        setPlayers(selectedPlayers);
        setModalVisible(false);
    };

    return (
        <View>
            <View style={styles.team}>
                <Text style={styles.text}>Time {numberTeam}</Text>
            </View>

            <View style={styles.container}>
                {players.length < 5 && (
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                        <AntDesign name="plus" size={24} color="#E9531B" />
                    </TouchableOpacity>
                )}

                <SelectedPlayersList players={players} updateStat={updateStat} />

                <PlayerSelectModal
                    visible={modalVisible}
                    players={allPlayers}
                    selected={selected}
                    toggleSelect={toggleSelect}
                    onClose={confirmSelection}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E9531B",
        color: "#D9D9D9",
        marginBottom: 30,
        borderRadius: 7,
        marginHorizontal: 34,
        paddingVertical: 11
    },
    text: {
        fontFamily: "Roboto-slab",
        fontSize: 24,
        color: "#FFFFFF",
        alignSelf: "center",
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: "#D9D9D9",
        borderRadius: 15,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        marginVertical: 24
    },
    team: {
        marginBottom: 10
    }
});