import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface NavigationButtonProps {
  title: string;
  screenName: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({title, screenName}) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(screenName);
  };

  return (
    <TouchableOpacity
      style={styles.button} 
      onPress={handlePress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E9531B',
    height: 80,
    width: 280,
    borderRadius: 58,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 11,
  },
  text: {
    color: "#D3D3D3",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto-slab"
  },
});

export default NavigationButton;