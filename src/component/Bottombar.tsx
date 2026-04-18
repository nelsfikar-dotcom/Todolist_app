import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type List = {
    Home: undefined;
    Dashboard: undefined;
    Task: undefined;
};

export default function BottomBar() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<List>>();
    return (
        <View style={{
            backgroundColor: "#ffffff",
            borderTopWidth: 2,
            height: 80,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: insets.bottom
        }}>
            <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate('Dashboard')}>
                <MaterialIcons name="home" color="#000000" size={40} />
                <Text style={{ fontSize: 15, fontWeight:"bold" }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate('Task')}>
                <MaterialIcons name="task" color="#000" size={40} />
                <Text style={{ fontSize: 15, fontWeight:"bold" }}>Task</Text>
            </TouchableOpacity>
        </View>
    )
}