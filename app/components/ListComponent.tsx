import {Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import InputPlayer from "./InputPlayer";
import Item from "./Item";
import {usePlayers} from "../contexts/PlayersContext";
import {useState} from "react";
import useSortedPlayers from "../hooks/useSortedPlayers";
import {OrderBy} from "../types/OrderBy";

const { width } = Dimensions.get('window');

const ListComponent = () => {
    const { players, loading, addPlayer, removePlayer } = usePlayers();
    const [orderBy] = useState<OrderBy>("name");
    const sortedPlayers = useSortedPlayers(players, orderBy);

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
                extraData={"name"}
                renderItem={({ item }) => (
                    <Item
                        player={item}
                        onRemove={removePlayer}
                    />
                )}
                ListHeaderComponent={() => (
                    <View>
                        <InputPlayer onAdd={addPlayer} />
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
        backgroundColor: "#1a1e21",
        width: width
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
