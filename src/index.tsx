import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MenuUtama() {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ height: '100%', flexDirection: 'column', marginHorizontal: 20, marginTop: insets.top}}>

            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                Hi, NelsFikar 👋
            </Text>
            <Text style={{ marginBottom: 20, color: "#555" }}>
                Aktivitas harian anda menjadi lebih mudah
            </Text>

            <View style={{ gap: 20 }}>
                <View style={{ flexDirection: "row", gap: 20 }}>

                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: "#008cff",
                            borderRadius: 20,
                            justifyContent: "center",
                            flexDirection: "row",
                            padding: 20,
                            alignItems: "center"
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
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: "#f1df3b",
                            borderRadius: 20,
                            justifyContent: "center",
                            padding: 20,
                            flexDirection: "row",
                            alignItems: "center"
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
                                In Proces
                            </Text>
                            <Text style={{ color: "#000000" }}>
                                12 Tasks
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", gap: 20 }}>

                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: "#0ea882",
                            borderRadius: 20,
                            justifyContent: "center",
                            flexDirection: "row",
                            padding: 20,
                            alignItems: "center"
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
                            flex: 1,
                            backgroundColor: "#e20808",
                            borderRadius: 20,
                            justifyContent: "center",
                            padding: 20,
                            flexDirection: "row",
                            alignItems: "center"
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

            <View style={{ marginBottom: 20}}>
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
                        <Text style={{ fontWeight: "heavy", color: "#aaa7a7a0" }}>Digital mobile </Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialIcons name="check-circle" size={15} />
                            <Text> 15 Tasks </Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{marginBottom: 20}}>
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
                        <Text style={{ fontWeight: "heavy", color: "#aaa7a7a0" }}>Digital mobile </Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialIcons name="check-circle" size={15} />
                            <Text> 10 Tasks </Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{marginBottom: 20}}>
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
                        }}>Work Out list</Text>
                        <Text style={{ fontWeight: "heavy", color: "#aaa7a7a0" }}>Digital mobile </Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialIcons name="check-circle" size={15} />
                            <Text> 8 Tasks </Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
}