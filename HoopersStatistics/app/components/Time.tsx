import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';

interface TimeProps {
    seconds: number;
    setSeconds: React.Dispatch<React.SetStateAction<number>>;
    run: boolean;
    setRun: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Time({ seconds, setSeconds, run, setRun }: TimeProps) {
    const interval = useRef<number | null>(null);

    useEffect(() => {
        if (run) {
            interval.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else if (interval.current !== null) {
            clearInterval(interval.current);
        }

        return () => {
            if (interval.current !== null) {
                clearInterval(interval.current);
            }
        };
    }, [run]);

    const formatTime = (segundosTotais: number) => {
        const min = Math.floor(segundosTotais / 60);
        const seg = segundosTotais % 60;
        return `${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.timeContainer}>
                <Text style={styles.time}>{formatTime(seconds)}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => setRun(!run)} style={styles.play}>
                    {run ? <FontAwesome5 name="pause" size={15} color="#D3D3D3" /> : <FontAwesome5 name="play" size={15} color="#D3D3D3" />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setRun(false);
                    setSeconds(0);
                }} style={styles.return}>
                    <Fontisto name="arrow-return-left" size={15} color="#D3D3D3" />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center",
        marginBottom: 24,
    },
    timeContainer: {
        marginRight: 11,
        backgroundColor: "#E9531B",
        borderRadius: 18,
        width: "40%",
        paddingVertical: 5,
        justifyContent: "center"
    },
    time: {
        fontFamily: "Roboto-slab",
        fontWeight: "400",
        fontSize: 16,
        color: "#FFFFFF",
        alignSelf: "center",
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    play: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E9531B",
        padding: 8,
        borderRadius: 90,
        marginRight: 5
    },
    return: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E9531B",
        padding: 8,
        borderRadius: 90,
    },
});