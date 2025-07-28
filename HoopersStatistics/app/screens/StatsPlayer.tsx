import Back from "../components/Back";
import Logo from "../components/Logo";
import {FlatList, StyleSheet, Text, View} from "react-native";
import OrderPicker from "@/app/components/OrderPicker";
import {OrderBy} from "@/app/types/OrderBy";
import {useState} from "react";
import useSortedPlayers from "@/app/hooks/useSortedPlayers";
import {usePlayers} from "@/app/contexts/PlayersContext";
import StatPlayer from "@/app/components/StatPlayer";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1a1e21",
        flex: 1
    },
    emptyItem: {
        marginTop: 20,
        alignSelf: "center",
        fontSize: 18,
        color: "#e9531b",
        fontWeight: "bold",
        fontFamily: "Roboto-slab",
    },
});

export default function StatsPlayer() {
    const { players } = usePlayers();
    const [orderBy, setOrderBy] = useState<OrderBy>("name");
    const sortedPlayers = useSortedPlayers(players, orderBy);

    return (
        <View style={styles.container}>
            <Back />
            <Logo />
            <View style={styles.container}>
                <FlatList
                    data={sortedPlayers}
                    keyExtractor={(item) => item.id.toString()}
                    extraData={orderBy}
                    renderItem={({ item }) => (
                        <StatPlayer player={item} />
                    )}
                    ListHeaderComponent={() => (
                        <View>
                            {players.length > 0 && <OrderPicker value={orderBy} onChange={setOrderBy} />}
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyItem}>Nenhum jogador cadastrado!</Text>
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            </View>
        </View>
  );
}