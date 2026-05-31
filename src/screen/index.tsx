import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';

type List = {
    add: undefined;
    Dashboard: undefined;
    Task: undefined;
};

export default function MenuUtama() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<List>>();

    const getUser = async () => {
        const data = await AsyncStorage.getItem("user");

        if (data) {
            navigation.navigate("Home")
        } else {
            navigation.navigate("Login")
        }

        if (data) {
            const user = JSON.parse(data);
            console.log("USER LOGIN=>", user);
        }


    };

    useEffect(() => {
        getUser();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("user");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (

        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#ffffff' }}>
            <View style={{ marginHorizontal: 20, flex: 1, marginTop: insets.top }}>

                <View style={{ flexDirection: "row", gap: 15, alignItems: "center", marginBottom: 10, marginTop: 10 }}>

                    <Image
                        source={require('../assets/images/01f.png')}
                        style={{ width: 50, height: 50, borderRadius: 50, }}
                    />

                    <View>
                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                            Hi, NelsFikar 👋
                        </Text>
                        <Text style={{ color: "#555", fontSize: 10 }}>
                            Aktivitas harian anda menjadi lebih mudah
                        </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity
                            style={{}}
                            onPress={handleLogout}
                        >
                            <MaterialIcons name="logout" color='#df2929' size={30} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 10, color: "#555", }}>
                            Logout
                        </Text>
                    </View>
                </View>
                <View style={{ gap: 20 }}>
                    <View style={{ flexDirection: "column", gap: 20 }}>
                        {/* <TouchableOpacity
                                style={{
                                    flex: 1,
                                    backgroundColor: "#008cff",
                                    borderRadius: 20,
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    padding: 20,
                                    alignItems: "center",
                                    
                                }}
                            >
                                <View
                                    style={{
                                        padding: 10,
                                        backgroundColor: "rgba(255,255,255,0.2)",
                                        borderRadius: 50
                                    }}
                                >
                                    <MaterialIcons name="sync" color="#ffffff" size={25} />
                                </View>

                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "#000000" }}>
                                        On Going
                                    </Text>
                                    <Text style={{ color: "#000000" }}>
                                        24 Tasks
                                    </Text>
                                </View>
                            </TouchableOpacity> */}

                        <TouchableOpacity
                            style={{
                                backgroundColor: "#f1df3b",
                                borderRadius: 20,
                                justifyContent: "center",
                                padding: 20,
                                flexDirection: "row",
                                paddingVertical: 10,
                                alignItems: "center",
                                width: "90%",
                                alignSelf: "center"
                            }}
                        >
                            <View
                                style={{
                                    padding: 10,
                                    backgroundColor: "rgba(255,255,255,0.2)",
                                    borderRadius: 50
                                }}
                            >
                                <MaterialIcons name="access-time" color="#ffffff" size={25} />
                            </View>

                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#000000" }}>
                                    In Process
                                </Text>
                                <Text style={{ color: "#000000" }}>
                                    12 Tasks
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {/* </View>
                        <View style={{ flexDirection: "row", gap: 20 }}> */}
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#0ea882",
                                borderRadius: 20,
                                justifyContent: "center",
                                flexDirection: "row",
                                padding: 20,
                                paddingVertical: 10,
                                alignItems: "center",
                                width: "90%",
                                alignSelf: "center"
                            }}
                        >
                            <View
                                style={{
                                    padding: 10,
                                    backgroundColor: "rgba(255,255,255,0.2)",
                                    borderRadius: 50
                                }}
                            >
                                <MaterialIcons name="check-circle" color="#ffffff" size={25} />
                            </View>

                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#000000" }}>
                                    Completed
                                </Text>
                                <Text style={{ color: "#000000" }}>
                                    42 Tasks
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: "#e20808",
                                borderRadius: 20,
                                justifyContent: "center",
                                padding: 20,
                                paddingVertical: 10,
                                flexDirection: "row",
                                alignItems: "center",
                                width: "90%",
                                alignSelf: "center"
                            }}
                        >
                            <View
                                style={{
                                    padding: 10,
                                    backgroundColor: "rgba(255,255,255,0.2)",
                                    borderRadius: 50
                                }}
                            >
                                <MaterialIcons name="cancel" color="#ffffff" size={25} />
                            </View>

                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "#000000" }}>
                                    Canceled
                                </Text>
                                <Text style={{ color: "#000000" }}>
                                    8 Tasks
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>

                <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 25, marginBottom: 25 }}>
                    Recent Task :
                </Text>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>

                    <View style={{ marginBottom: 20 }}>
                        <View style={{
                            position: "absolute",
                            bottom: -5,
                            left: 10,
                            right: 10,
                            height: 20,
                            backgroundColor: "black",
                            borderRadius: 20,
                        }} />
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                backgroundColor: "#e8e6e6",
                                borderRadius: 20,
                                borderColor: "#000000",
                                borderWidth: 1,
                                padding: 15
                            }}
                        >
                            <View>
                                <Text style={{
                                    fontWeight: "bold", fontSize: 20
                                }}>Website for To_Do.io</Text>
                                <Text style={{ fontWeight: "500", color: "#aaa7a7a0" }}>Mobile Project </Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <MaterialIcons name="check-circle" size={15} />
                                    <Text> 15 Tasks </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <View style={{
                            position: "absolute",
                            bottom: -5,
                            left: 10,
                            right: 10,
                            height: 20,
                            backgroundColor: "black",
                            borderRadius: 20,
                        }} />
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                backgroundColor: "#e8e6e6",
                                borderRadius: 20,
                                borderColor: "#000000",
                                borderWidth: 1,
                                padding: 15
                            }}
                        >
                            <View>
                                <Text style={{
                                    fontWeight: "bold", fontSize: 20
                                }}>Wish list</Text>
                                <Text style={{ fontWeight: "500", color: "#aaa7a7a0" }}>My self </Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <MaterialIcons name="check-circle" size={15} />
                                    <Text> 18 Tasks </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <View style={{
                            position: "absolute",
                            bottom: -5,
                            left: 10,
                            right: 10,
                            height: 20,
                            backgroundColor: "black",
                            borderRadius: 20,
                        }} />
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                backgroundColor: "#e8e6e6",
                                borderRadius: 20,
                                borderColor: "#000000",
                                borderWidth: 1,
                                padding: 15
                            }}
                        >
                            <View>
                                <Text style={{
                                    fontWeight: "bold", fontSize: 20
                                }}>Learning something new</Text>
                                <Text style={{ fontWeight: "500", color: "#aaa7a7a0" }}>apa azaaa</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <MaterialIcons name="check-circle" size={15} />
                                    <Text> 10 Tasks </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <View style={{
                            position: "absolute",
                            bottom: -5,
                            left: 10,
                            right: 10,
                            height: 20,
                            backgroundColor: "black",
                            borderRadius: 20,
                        }} />
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                backgroundColor: "#e8e6e6",
                                borderRadius: 20,
                                borderColor: "#000000",
                                borderWidth: 1,
                                padding: 15
                            }}
                        >
                            <View>
                                <Text style={{
                                    fontWeight: "bold", fontSize: 20
                                }}>Work Out List</Text>
                                <Text style={{ fontWeight: "500", color: "#aaa7a7a0" }}>Upgrade</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <MaterialIcons name="check-circle" size={15} />
                                    <Text> 8 Tasks </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({

})