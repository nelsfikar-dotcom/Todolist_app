import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MenuUtama from "../screen/index";
import List from "../screen/list";

const Tab = createMaterialTopTabNavigator();

export default function BottomBar() {
    return (

        <Tab.Navigator
            tabBarPosition="bottom"
            screenOptions={{
                swipeEnabled: true,
            }}>

            <Tab.Screen
                name="Home"
                component={MenuUtama}
            />

            <Tab.Screen
                name="Task"
                component={List}
            />
        </Tab.Navigator>

    )
}