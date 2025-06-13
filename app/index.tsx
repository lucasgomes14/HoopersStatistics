import {StyleSheet, View, Dimensions, Image} from "react-native";
import NavegationButton from "./components/NavegationButton";

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#1A1E21",
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imageContainer: {
      width: '100%',
      height: height * 0.5
    },
    buttonsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
});

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("./assets/images/image-main-page.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <NavegationButton title="Adicionar jogador" screenName="/screens/AddPlayer" />
        <NavegationButton title="Criar partida" screenName="/screens/CreateMatch" />
        <NavegationButton title="Estatística dos jogadores" screenName="/screens/StatsPlayer" />
        <NavegationButton title="Estatística das partidas" screenName="/screens/StatsMatch" />
      </View>
    
    </View>
  );
}
