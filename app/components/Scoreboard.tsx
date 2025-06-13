import {StyleSheet, Text, View} from "react-native";

interface Props {
    score1: number;
    score2: number;
}

export default function Scoreboard({ score1, score2 }: Props) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.teams}>Time 1</Text>
            </View>
            <View style={styles.score}>
                <Text style={styles.text}>{score1}</Text>
                <Text style={styles.text}>x</Text>
                <Text style={styles.text}>{score2}</Text>
            </View>
            <View>
                <Text style={styles.teams}>Time 2</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
    },
    text: {
        fontFamily: "Roboto-slab",
        fontWeight: "400",
        fontSize: 16,
        color: "#FFFFFF",
        alignSelf: "center",
    },
    score: {
        width: "30%",
        paddingVertical: 7,
        backgroundColor: "#E9531B",
        marginBottom: 11,
        borderRadius: 18,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignSelf: "center"
    },
    teams: {
        fontFamily: "Roboto-slab",
        fontWeight: "400",
        fontSize: 16,
        color: "#FFFFFF",
        marginHorizontal: 10,
    }
});