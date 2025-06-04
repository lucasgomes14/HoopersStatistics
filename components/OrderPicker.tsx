import {OrderBy} from "@/types/OrderBy";
import {Picker} from "@react-native-picker/picker";
import {StyleSheet} from "react-native";

const OrderPicker = ({value, onChange}: {
    value: OrderBy,
    onChange: (value: OrderBy) => void
}) => (
    <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={styles.filter}
        dropdownIconColor="#FF8C00"
    >
        <Picker.Item label="Ordem alfabética" value="name" />
        <Picker.Item label="Pontos" value="points" />
        <Picker.Item label="Assistências" value="assist" />
        <Picker.Item label="Rebotes" value="rebound" />
    </Picker>
);

const styles = StyleSheet.create({
    filter: {
        backgroundColor: "#2c2929",
        marginHorizontal: 10,
        borderRadius: 15,
        color: "#FF8C00",
        marginTop: 5,
    },
});


export default OrderPicker;