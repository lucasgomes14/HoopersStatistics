import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
        flex: 1
    },
    emptyItem:{
        marginTop: 5,
        alignSelf: "center",
        fontSize: 20,
        color: "#FF8C00",
        fontWeight: "bold",
        fontFamily: "Roboto-slab",
    },
    player: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#b66200",
        marginTop: 5,
        marginHorizontal: 10,
        padding: 20,
        borderRadius: 20,

    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontFamily: "Roboto-slab",
        fontSize: 15,
        alignSelf: "center",
    },
    textName: {
        color: "#fff",
        fontWeight: "bold",
        fontFamily: "Roboto-slab",
        fontSize: 25,
        alignSelf: "center",
        textAlign: "center",
        marginBottom: 10
    },
    statistic: {
        flex: 2,
        alignItems: "center",
    },
    plusAndMinus: {
        flexDirection: "row",
        width: 200,
        justifyContent: "space-between",
        marginVertical: 10
    },
    trash: {
        marginTop: 20
    }
})

const Item = ({ player, onRemove, plusPoint, minusPoint, plusAssist, minusAssist, plusRebound, minusRebound }: {player: Player, onRemove: (id: number) => void, plusPoint: (id: number) => void, minusPoint: (id: number) => void, plusAssist: (id: number) => void, minusAssist: (id: number) => void, plusRebound: (id: number) => void, minusRebound: (id: number) => void} ) => {
    return (
        <View style={styles.player}>
            <Text style={styles.textName}>{player.name}</Text>
            <View style={styles.statistic}>
                <View>
                    <Text style={styles.text}>Pontos</Text>
                    <View style={styles.plusAndMinus}>
                        <TouchableOpacity onPress={() => minusPoint(player.id)}>
                            <AntDesign name="minuscircleo" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.text}>{player.points}</Text>
                        <TouchableOpacity onPress={() => plusPoint(player.id)}>
                            <AntDesign name="pluscircleo" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>Assistências</Text>
                    <View style={styles.plusAndMinus}>
                        <TouchableOpacity onPress={() => minusAssist(player.id)}>
                            <AntDesign name="minuscircleo" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.text}>{player.assist}</Text>
                        <TouchableOpacity onPress={() => plusAssist(player.id)}>
                            <AntDesign name="pluscircleo" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={styles.text}>Rebotes</Text>
                    <View style={styles.plusAndMinus}>
                        <TouchableOpacity onPress={() => minusRebound(player.id)}>
                            <AntDesign name="minuscircleo" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.text}>{player.rebound}</Text>
                        <TouchableOpacity onPress={() => plusRebound(player.id)}>
                            <AntDesign name="pluscircleo" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => onRemove(player.id)}>
                        <Feather style={styles.trash} name="trash-2" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const ListComponent = () => {

    const [players, setPlayers] = useState<Player[]>([]);

    const addPlayer = (name: string) => {
        const newId = players.length === 0 ? 1 : Math.max(...players.map(p => p.id)) + 1;
        const newPlayers: Player = {
            id: newId,
            name: name,
            points: 0,
            assist: 0,
            rebound: 0
        }

        setPlayers(p => [...p, newPlayers]);
    }

    const handleRemove = (id: number) => {
        setPlayers(p => p.filter(p => p.id !== id));
    }

    const plusPoint = (id: number) => {
        setPlayers(prevPlayer => prevPlayer.map(player => player.id === id ? {...player, points : player.points + 1} : player));
    }

    const minusPoint = (id: number) => {
        setPlayers(prevPlayer => prevPlayer.map(player => player.id === id ? {...player, points : player.points > 0 ? player.points - 1 : 0} : player));
    }

    const plusAssist = (id: number) => {
        setPlayers(prevPlayer => prevPlayer.map(player => player.id === id ? {...player, assist : player.assist + 1} : player));
    }

    const minusAssist = (id: number) => {
        setPlayers(prevPlayer => prevPlayer.map(player => player.id === id ? {...player, assist : player.assist > 0 ? player.assist - 1 : 0} : player));
    }

    const plusRebound = (id: number) => {
        setPlayers(prevPlayer => prevPlayer.map(player => player.id === id ? {...player, rebound : player.rebound + 1} : player));
    }

    const minusRebound = (id: number) => {
        setPlayers(prevPlayer => prevPlayer.map(player => player.id === id ? {...player, rebound : player.rebound > 0 ? player.rebound - 1 : 0} : player));
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={players}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Item player={item} onRemove={handleRemove} plusPoint={plusPoint} minusPoint={minusPoint} plusAssist={plusAssist} minusAssist={minusAssist} plusRebound={plusRebound} minusRebound={minusRebound} />}
                ListHeaderComponent={() => <InputPlayer onAdd={addPlayer} />}
                ListEmptyComponent={() => <Text style={styles.emptyItem}>Nenhum jogador cadastrado!</Text> }
                contentContainerStyle={{ paddingBottom: 100}}
            />
        </View>
    );
}

export default ListComponent;