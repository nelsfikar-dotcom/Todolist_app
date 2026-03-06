import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Image, ScrollView } from "react-native";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function add() {
    const insets = useSafeAreaInsets();
    return (

        <View style={{ height: '100%', flexDirection: 'column' }}>
            <View style={{ marginHorizontal: 20, flex: 1, marginTop: insets.top }}>
               
            </View>
        </View >
    );
}