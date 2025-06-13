import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Match} from "@/app/types/Match";
import {useMatches} from "@/app/contexts/MatchesContext";
import Feather from "@expo/vector-icons/Feather";

interface StatMatchProps  {
    match: Match;
}

const formatTime = (totalSeconds: number): string => {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

const StatMatch = ({ match }: StatMatchProps) => {
    const { removeMatch } = useMatches();

    const handleRemove = () => {
        removeMatch(match.id);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.trash} onPress={handleRemove}>
                <Feather name="trash-2" size={24} color="#D3D3D3" />
            </TouchableOpacity>
            <View style={styles.match}>
                <Text style={styles.nameMatch}>Partida {match.id}</Text>

                <View style={styles.matchTimeContainer}>
                    <Text style={styles.matchTime}>Duração</Text>
                    <Text style={styles.matchTime}>{formatTime(match.duration)}</Text>
                </View>

                {match.teams.map((team, index) => (
                    <View key={index} style={styles.teamContainer}>
                        <Text style={styles.team}>Time {index + 1}</Text>

                        <View style={styles.pointsContainer}>
                            <Text style={styles.points}>Pontos</Text>
                            <Text style={styles.points}>{team.totalPoints}</Text>
                        </View>

                        <View style={styles.statsContainer}>
                            <View style={styles.stats}>
                                <Text style={styles.players}>Jogadores</Text>
                                {team.players.map(player => (
                                    <Text key={player.id} style={styles.players}>
                                        {player.name}
                                    </Text>
                                ))}
                            </View>
                            <View>
                                <Text style={styles.players}>P / A / R</Text>
                                {team.players.map(player => (
                                    <Text key={player.id} style={styles.players}>
                                        {player.points} / {player.assist} / {player.rebound}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E9531B",
        color: "#D9D9D9",
        marginBottom: 11,
        borderRadius: 7,
        marginHorizontal: 34,
        paddingBottom: 24
    },
    match: {
        alignItems: "center",
        marginHorizontal: 24,
    },
    nameMatch: {
        fontFamily: "Roboto-slab",
        fontWeight: "400",
        fontSize: 22,
        color: "#FFFFFF",
        marginTop: 34,
    },
    teams: {
        width: "80%",
        justifyContent: "space-around",
        marginBottom: 31,
    },
    teamContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 15
    },
    team: {
        color: "#FFFFFF",
        fontFamily: "Roboto-slab",
        fontWeight: "400",
        fontSize: 16,
        marginBottom: 13
    },
    pointsContainer: {
        width: "100%",
        backgroundColor: "#D9D9D9",
        alignItems: "center",
        marginBottom: 9,
        paddingVertical: 2,
        borderRadius: 7,
    },
    points: {
        color: "#1A1E21",
        fontFamily: "Roboto-slab",
        fontWeight: "400",
        fontSize: 14,
    },
    statsContainer: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#D9D9D9",
        justifyContent: "space-around",
        paddingHorizontal: 9,
        paddingVertical: 13,
        borderRadius: 7,
    },
    stats: {
        width: 100,
        fontSize: 10
    },
    players: {
        color: "#1A1E21",
        fontFamily: "Roboto-slab",
        fontWeight: "400",
        fontSize: 14,
    },
    matchTime: {
        color: "#1A1E21",
        fontFamily: "Roboto-slab",
        fontWeight: "400",
        fontSize: 14,
    },
    matchTimeContainer: {
        width: "100%",
        backgroundColor: "#D9D9D9",
        alignItems: "center",
        marginBottom: 9,
        paddingVertical: 2,
        borderRadius: 7,
    },
    trash: {
        position: "absolute",
        right: 20,
        top: 15
    }
});

export default StatMatch;