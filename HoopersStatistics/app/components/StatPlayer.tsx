import {Player} from "@/app/types/Player";
import {StyleSheet, Text, View} from "react-native";

interface ItemStat {
    player: Player;
}

const StatPlayer = ({
                  player,
              }: ItemStat) => {
    return (
        <View style={styles.container}>
            <View style={styles.player}>
                <Text style={styles.name}>{player.name}</Text>
                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Text style={styles.statName}>Jogos</Text>
                        <Text style={styles.statNumber}>{player.games}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statName}>Pontos</Text>
                        <Text style={styles.statNumber}>{player.points}</Text>
                    </View>
                </View>
                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Text style={styles.statName}>Assistências</Text>
                        <Text style={styles.statNumber}>{player.assist}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statName}>Rebotes</Text>
                        <Text style={styles.statNumber}>{player.rebound}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E9531B",
        color: "#D9D9D9",
        marginBottom: 11,
        borderRadius: 7,
        marginHorizontal: 34
    },
    player: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 18,
        paddingBottom: 10
    },
    name: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontFamily: "Roboto-slab",
        fontSize: 20,
        lineHeight: 16,
        letterSpacing: .4,
        marginBottom: 30
    },
    stats: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    stat: {
        backgroundColor: "#D9D9D9",
        color: "#1A1E21",
        marginHorizontal: 10,
        marginBottom: 20,
        width: 140,
        height: 78,
        alignItems: "center",
    },
    statName: {
        paddingTop: 6,
        fontFamily: "Roboto-slab",
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 16,
        letterSpacing: .4,
    },
    statNumber: {
        paddingTop: 17,
        fontFamily: "Roboto-slab",
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 16,
        letterSpacing: .4,
    }
});

export default StatPlayer;