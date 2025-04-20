import {SectionList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import InputPlayer from "@/components/InputPlayer";
import {useState} from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

interface Player {
    id: number,
    name: string,
    points: number,
    assist: number,
    rebound: number
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a1e21"
    },
    emptyItem: {
        marginTop: 20,
        alignSelf: "center",
        fontSize: 18,
        color: "#e9531b",
        fontWeight: "bold",
        fontFamily: "Roboto-slab",
    },
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
    },
    sectionTitle: {
        fontFamily: "Roboto-slab",
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 16,
        marginTop: 16
    },
})

const Item = ({
    player, onRemove, plusPoint, minusPoint, plusAssist, minusAssist, plusRebound, minusRebound
}: {
    player: Player,
    onRemove: (id: number) => void,
    plusPoint: (id: number, value: number) => void,
    minusPoint: (id: number) => void,
    plusAssist: (id: number) => void,
    minusAssist: (id: number) => void,
    plusRebound: (id: number) => void,
    minusRebound: (id: number) => void
}) => {
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

const ListComponent = () => {
    const [players, setPlayers] = useState<Player[]>([]);

    const getSections = () => {
        const sorted = [...players].sort((a, b) => a.name.localeCompare(b.name));

        const grouped = sorted.reduce((acc, player) => {
            const firstLetter = player.name[0].toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(player);
            return acc;
        }, {} as Record<string, Player[]>);

        return Object.keys(grouped).sort().map(letter => ({
            title: letter,
            data: grouped[letter],
        }));
    };

    const addPlayer = (name: string) => {
        const newId = players.length === 0 ? 1 : Math.max(...players.map(p => p.id)) + 1;
        const newPlayer: Player = {
            id: newId,
            name,
            points: 0,
            assist: 0,
            rebound: 0
        }
        setPlayers(p => [...p, newPlayer]);
    }

    const handleRemove = (id: number) => {
        setPlayers(p => p.filter(p => p.id !== id));
    }

    const plusPoint = (id: number, value: number) => {
        setPlayers(prev =>
            prev.map(player =>
                player.id === id ? { ...player, points: player.points + value } : player
            )
        );
    }

    const minusPoint = (id: number) => {
        setPlayers(prev => prev.map(player => player.id === id
            ? { ...player, points: player.points > 0 ? player.points - 1 : 0 }
            : player
        ));
    }

    const plusAssist = (id: number) => {
        setPlayers(prev => prev.map(player => player.id === id
            ? { ...player, assist: player.assist + 1 }
            : player
        ));
    }

    const minusAssist = (id: number) => {
        setPlayers(prev => prev.map(player => player.id === id
            ? { ...player, assist: player.assist > 0 ? player.assist - 1 : 0 }
            : player
        ));
    }

    const plusRebound = (id: number) => {
        setPlayers(prev => prev.map(player => player.id === id
            ? { ...player, rebound: player.rebound + 1 }
            : player
        ));
    }

    const minusRebound = (id: number) => {
        setPlayers(prev => prev.map(player => player.id === id
            ? { ...player, rebound: player.rebound > 0 ? player.rebound - 1 : 0 }
            : player
        ));
    }

    return (
        <View style={styles.container}>
            <SectionList
                sections={getSections()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <Item
                        player={item}
                        onRemove={handleRemove}
                        plusPoint={plusPoint}
                        minusPoint={minusPoint}
                        plusAssist={plusAssist}
                        minusAssist={minusAssist}
                        plusRebound={plusRebound}
                        minusRebound={minusRebound} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionTitle}>
                        {title}
                    </Text>
                )}
                ListHeaderComponent={() => <InputPlayer onAdd={addPlayer} /> }
                ListEmptyComponent={() => <Text style={styles.emptyItem}>Nenhum jogador cadastrado!</Text>}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </View>
    );
}

export default ListComponent;
