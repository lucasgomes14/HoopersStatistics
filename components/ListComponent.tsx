import {FlatList, StyleSheet, Text, View} from "react-native";
import InputPlayer from "@/components/InputPlayer";
import Item from "@/components/Item";
import {usePlayers} from "@/contexts/PlayersContext";
import {useState} from "react";
import useSortedPlayers from "@/hooks/useSortedPlayers";
import {OrderBy} from "@/types/OrderBy";
import OrderPicker from "@/components/OrderPicker";

const ListComponent = () => {
    const { players, loading, addPlayer, removePlayer, updatePlayerStats } = usePlayers();
    const [orderBy, setOrderBy] = useState<OrderBy>("name");
    const sortedPlayers = useSortedPlayers(players, orderBy);

    const plusPoint = (id: number, value: number) => {
        const player = players.find(p => p.id === id);
        if (player) {
            updatePlayerStats(id, { points: player.points + value });
        }
    };

    const minusPoint = (id: number) => {
        const player = players.find(p => p.id === id);
        if (player && player.points > 0) {
            updatePlayerStats(id, { points: player.points - 1 });
        }
    };

    const plusAssist = (id: number) => {
        updatePlayerStats(id, { assist: players.find(p => p.id === id)!.assist + 1 });
    };

    const minusAssist = (id: number) => {
        const player = players.find(p => p.id === id);
        if (player && player.assist > 0) {
            updatePlayerStats(id, { assist: player.assist - 1 });
        }
    };

    const plusRebound = (id: number) => {
        updatePlayerStats(id, { rebound: players.find(p => p.id === id)!.rebound + 1 });
    };

    const minusRebound = (id: number) => {
        const player = players.find(p => p.id === id);
        if (player && player.rebound > 0) {
            updatePlayerStats(id, { rebound: player.rebound - 1 });
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyItem}>Carregando dados...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={sortedPlayers}
                keyExtractor={(item) => item.id.toString()}
                extraData={orderBy}
                renderItem={({ item }) => (
                    <Item
                        player={item}
                        onRemove={removePlayer}
                        plusPoint={plusPoint}
                        minusPoint={minusPoint}
                        plusAssist={plusAssist}
                        minusAssist={minusAssist}
                        plusRebound={plusRebound}
                        minusRebound={minusRebound}
                    />
                )}
                ListHeaderComponent={() => (
                    <View>
                        <InputPlayer onAdd={addPlayer} />
                        {players.length > 0 && <OrderPicker value={orderBy} onChange={setOrderBy} />}
                    </View>
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyItem}>Nenhum jogador cadastrado!</Text>
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </View>
    );
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
    sectionTitle: {
        fontFamily: "Roboto-slab",
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 16,
        marginTop: 16
    },
})

export default ListComponent;
