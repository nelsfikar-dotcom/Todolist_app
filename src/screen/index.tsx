import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import { Task } from "../db/tasks/type";
import { taskService } from "../db/tasks/services";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

type List = {
    add: undefined;
    Dashboard: undefined;
    Task: undefined;
    Home: undefined;
    Login: undefined;
};

export default function MenuUtama() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<List>>();

    const [userName, setUserName] = useState("");

    const [recentTasks, setRecentTasks] = useState<Task[]>([]);

    const [processCount, setProcessCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [cancelCount, setCancelCount] = useState(0);

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

            setUserName(user.name);
        }
    };

    const loadRecentTasks = async () => {
        try {

            const userString = await AsyncStorage.getItem("user");

            if (!userString) return;

            const user = JSON.parse(userString);

            const data = await taskService.getTaskByUserId(user.id);



            setProcessCount(
                data.filter(
                    task => task.status === "process"
                ).length
            );

            setCompletedCount(
                data.filter(
                    task => task.status === "completed"
                ).length
            );

            setCancelCount(
                data.filter(
                    task => task.status === "cancel"
                ).length
            );

            const activeTasks = data.filter(
                task => task.status !== "cancel"
            );

            const sortedData = activeTasks.sort(
                (a, b) =>
                    new Date(b.updated_at).getTime() -
                    new Date(a.updated_at).getTime()
            );

            setRecentTasks(sortedData.slice(0, 5));

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {
        getUser();
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadRecentTasks();
        }, [])
    );

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("user");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.contentWrapper, { marginTop: insets.top }]}>

                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>
                            Hi, {userName} 👋
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            Aktivitas harian anda menjadi lebih mudah
                        </Text>
                    </View>
                    <View style={styles.logoutWrapper}>
                        <TouchableOpacity onPress={handleLogout}>
                            <MaterialIcons name="logout" color='#df2929' size={30} />
                        </TouchableOpacity>
                        <Text style={styles.logoutText}>
                            Logout
                        </Text>
                    </View>
                </View>


                <View style={styles.taskContainer}>
                    <View style={styles.taskColumn}>

                        <TouchableOpacity style={[styles.card, styles.cardInProcess]}>
                            <View style={styles.iconBadge}>
                                <MaterialIcons name="access-time" color="#ffffff" size={25} />
                            </View>
                            <View style={styles.cardTextWrapper}>
                                <Text style={styles.cardTitle}>In Process</Text>
                                <Text style={styles.cardSubtitle}>{processCount} Tasks</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, styles.cardCompleted]}>
                            <View style={styles.iconBadge}>
                                <MaterialIcons name="check-circle" color="#ffffff" size={25} />
                            </View>
                            <View style={styles.cardTextWrapper}>
                                <Text style={styles.cardTitle}>Completed</Text>
                                <Text style={styles.cardSubtitle}>{completedCount} Tasks</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.card, styles.cardCanceled]}>
                            <View style={styles.iconBadge}>
                                <MaterialIcons name="cancel" color="#ffffff" size={25} />
                            </View>
                            <View style={styles.cardTextWrapper}>
                                <Text style={styles.cardTitle}>Canceled</Text>
                                <Text style={styles.cardSubtitle}>{cancelCount} Tasks</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

                <Text style={styles.sectionTitle}>
                    Recent Task :
                </Text>

                <ScrollView>
                    {recentTasks.map((task) => (
                        <View
                            key={task.id}
                            style={{
                                backgroundColor: "#fff",
                                padding: 15,
                                borderRadius: 12,
                                marginBottom: 10,
                                elevation: 2,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 16
                                }}
                            >
                                {task.name}
                            </Text>

                            <Text>
                                {task.desk}
                            </Text>

                            <Text
                                style={{
                                    color: "#008cff",
                                    marginTop: 5
                                }}
                            >
                                🗓️ {new Date(task.updated_at).toLocaleDateString()}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    contentWrapper: {
        marginHorizontal: 20,
        flex: 1,
    },
    header: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        justifyContent: "space-between", 
        marginBottom: 10,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    headerSubtitle: {
        color: "#555",
        fontSize: 10,
    },
    logoutWrapper: {
        alignItems: "center",
    },
    logoutText: {
        fontSize: 10,
        color: "#555",
    },
    taskContainer: {
        gap: 20,
    },
    taskColumn: {
        flexDirection: "column",
        gap: 20,
    },
    card: {
        borderRadius: 20,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        width: "100%", 
    },
    cardInProcess: {
        backgroundColor: "#f1df3b",
    },
    cardCompleted: {
        backgroundColor: "#0ea882",
    },
    cardCanceled: {
        backgroundColor: "#e20808",
    },
    iconBadge: {
        padding: 10,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 50,
    },
    cardTextWrapper: {
        flex: 1, 
        marginLeft: 10,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#000000",
    },
    cardSubtitle: {
        color: "#000000",
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 25,
        marginBottom: 25,
    },
});