import Back from "../components/Back";
import Logo from "../components/Logo";
import {Animated, StyleSheet, Text, TouchableOpacity} from "react-native";
import Time from "@/app/components/Time";
import Scoreboard from "@/app/components/Scoreboard";
import AddTeams from "@/app/components/AddTeams";
import {Player} from "@/app/types/Player";
import {useState} from "react";
import {useMatches} from "@/app/contexts/MatchesContext";
import {usePlayers} from "@/app/contexts/PlayersContext";
import {Match} from "@/app/types/Match";
import ScrollView = Animated.ScrollView;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1a1e21",
    },
    saveButton: {
        width: "40%",
        backgroundColor: "#E9531B",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 24,
        borderRadius: 7,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#D9D9D9"
    },
    saveText: {
        fontFamily: "Roboto-slab",
        fontSize: 20,
        color: "#D9D9D9",
        alignSelf: "center",

    }
});

export default function CreateMatch() {
    const [team1Players, setTeam1Players] = useState<Player[]>([]);
    const [team2Players, setTeam2Players] = useState<Player[]>([]);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);

    const { updatePlayerStats } = usePlayers();
    const { addMatch, matches } = useMatches();

    const [seconds, setSeconds] = useState(0);
    const [run, setRun] = useState(false);

    const updateStat = (team: number, id: number, field: keyof Player, value: number) => {
        const teamPlayers = team === 1 ? team1Players : team2Players;
        const setTeamPlayers = team === 1 ? setTeam1Players : setTeam2Players;
        const setScore = team === 1 ? setScore1 : setScore2;

        const updated = teamPlayers.map(player => {
            if (player.id === id) {
                const newValue = Math.max(0, (player[field] as number) + value);

                if (field === "points") {
                    setScore(prev => Math.max(0, prev + value));
                }

                return { ...player, [field]: newValue };
            }
            return player;
        });

        setTeamPlayers(updated);
    };

    const handleSaveMatch = () => {
        const allPlayers = [...team1Players, ...team2Players];

        updatePlayerStats(
            allPlayers.map(player => ({
                id: player.id,
                points: player.points,
                assist: player.assist,
                rebound: player.rebound,
                games: 1,
            }))
        );

        const newMatch: Match = {
            id: matches.length + 1,
            duration: seconds,
            teams: [
                {
                    players: team1Players.map(p => ({
                        id: p.id,
                        name: p.name,
                        points: p.points,
                        assist: p.assist,
                        rebound: p.rebound,
                    })),
                    totalPoints: score1,
                },
                {
                    players: team2Players.map(p => ({
                        id: p.id,
                        name: p.name,
                        points: p.points,
                        assist: p.assist,
                        rebound: p.rebound,
                    })),
                    totalPoints: score2,
                },
            ],
        };

        addMatch(newMatch);

        setTeam1Players([]);
        setTeam2Players([]);
        setScore1(0);
        setScore2(0);
        setSeconds(0);
        setRun(false);
    };

    return (

        <ScrollView style={styles.container}>
            <Back />
            <Logo />
            <Scoreboard score1={score1} score2={score2} />
            <Time
                seconds={seconds}
                setSeconds={setSeconds}
                run={run}
                setRun={setRun} />
            <AddTeams numberTeam={"1"} players={team1Players} setPlayers={setTeam1Players} updateStat={(id, field, value) => updateStat(1, id, field, value)} />
            <AddTeams numberTeam={"2"} players={team2Players} setPlayers={setTeam2Players} updateStat={(id, field, value) => updateStat(2, id, field, value)} />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveMatch}>
                <Text style={styles.saveText}>Salvar Partida</Text>
            </TouchableOpacity>
        </ScrollView>
  );
}
