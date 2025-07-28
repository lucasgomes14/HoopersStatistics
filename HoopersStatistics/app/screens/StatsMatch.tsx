import Back from "../components/Back";
import Logo from "../components/Logo";
import {Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import StatMatch from "@/app/components/StatMatch";
import {useMatches} from "@/app/contexts/MatchesContext";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: "#1a1e21",
        paddingBottom: 10
    },
    emptyItem: {
        marginTop: 20,
        justifyContent: "center",
        alignSelf: "center",
        fontSize: 18,
        color: "#e9531b",
        fontWeight: "bold",
        fontFamily: "Roboto-slab",
    },
});

export default function StatsMatch() {
    const { matches } = useMatches();

    return (
        <View style={styles.container}>
            <Back />
            <Logo />

            <View style={styles.container}>
                <FlatList
                    data={matches}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <StatMatch match={item} />
                    )}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyItem}>Nenhuma partida cadastrado!</Text>
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            </View>
        </View>
  );
}