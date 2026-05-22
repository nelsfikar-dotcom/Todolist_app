import MaterialIcons from "@react-native-vector-icons/material-icons";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, TextInput, StyleSheet,FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CheckBox from "@react-native-community/checkbox";
import { RootStackParamList, task_list } from "../../db/task_list/type";


const dummyTask: task_list[] = [
    {
        id: 1,
        name: "Belajar React Native",
        desk: "Membuat halaman login dan register",
        image: "",
        deadline: "2026-05-25",
        status: "process",
        level: "normal",
        tasks_id: 1,
        created_at: "2026-05-23T10:00:00",
        updated_at: "2026-05-23T10:00:00",
    },
    {
        id: 2,
        name: "Mengerjakan UI Todo",
        desk: "Menambahkan fitur checkbox",
        image: "",
        deadline: "2026-05-27",
        status: "completed",
        level: "normal",
        tasks_id: 1,
        created_at: "2026-05-23T10:00:00",
        updated_at: "2026-05-23T10:00:00",
    },
    {
        id: 3,
        name: "Fix Navigation",
        desk: "Memperbaiki bug goBack()",
        image: "",
        deadline: "2026-05-30",
        status: "cancel",
        level: "priority",
        tasks_id: 2,
        created_at: "2026-05-23T10:00:00",
        updated_at: "2026-05-23T10:00:00",
    },
];

export default function detailTask() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute<RouteProp<RootStackParamList, 'detail'>>();
    const [isSelected, setSelection] = useState(false);
    const [type, setType] = useState('Normal');

    const [editID, setEditId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDesc, setEditDesc] = useState('');

    const handleEdit = (item: {
        id: string;
        title: string;
        desc: string;
    }) => {
        setEditId(item.id);
        setEditTitle(item.title);
        setEditDesc(item.desc);
    }

    const handleSaveEdit = () => {
        if (!editID) return;

        const updatedDetail = detail.map((item) =>
            item.id.toString() === editID
                ? {
                    ...item,
                    name: editTitle,
                    desk: editDesc,
                }
                : item
        );

        setDetail(updatedDetail);

        setEditId(null);
        setEditTitle('');
        setEditDesc('');

    };

    const handleSaveTask = () => {
        if (!route.params?.task) return;

        navigation.navigate('Task', {
            updatedTask: {
                id: route.params?.task?.id,
                title: editTitle,
                desc: editDesc,
            }
        });
    };

    const handleDelete = (id: number) => {
        const filteredTasks = detail.filter((item) => item.id !== id);
        setDetail(filteredTasks);
    };

    const [detail, setDetail] = useState<task_list[]>(dummyTask);

    useEffect(() => {
        if (route.params?.task) {
            setEditTitle(route.params.task.name);
            setEditDesc(route.params.task.desk);
        }
    }, [route.params?.task]);


    const toggleTodo = (index: number) => {
        const newDetails = [...detail];

        newDetails[index].status =
            newDetails[index].status === "completed"
                ? "process"
                : "completed";

        setDetail(newDetails);
    };

    const getColor = (type: any) => {
        switch (type) {
            case 'priority':
                return '#FF3B30';
            case 'optional':
                return '#34C759';
            case 'normal':
                return '#007AFF'
            default:
                return '#ccc'
        }
    };


    return (
        <View style={{ flex: 1, backgroundColor: '#f2eded' }}>
            <View style={{ marginHorizontal: 10, flex: 1, marginTop: insets.top }}>
                <View style={styles.wrap}>
                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                        <TouchableOpacity style={{ marginBottom: 5, flexDirection: "row", alignItems: "center" }} onPress={() => navigation.goBack()}>
                            <MaterialIcons name="arrow-back" color="#008cff" size={35} />
                            {/* <Text style={styles.txtButton}>Kembali</Text> */}
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={handleSaveTask}>
                            {/* <Text style={styles.txtButton}> Simpan </Text> */}
                            <MaterialIcons name="check" color="#008cff" size={35} />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Nama"
                        placeholderTextColor="#666"
                        value={editTitle}
                        onChangeText={setEditTitle}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Deskripsi"
                        placeholderTextColor="#666"
                        value={editDesc}
                        onChangeText={setEditDesc}
                    />
                    <View style={styles.first}>
                        <View style={styles.sec}>
                            <MaterialIcons name="square" color="#FF3B30" size={20} />
                            <Text>Priority</Text>
                        </View>
                        <View style={styles.sec}>
                            <MaterialIcons name="square" color="#061af5" size={20} />
                            <Text>Normal</Text>
                        </View>
                        <View style={styles.sec}>
                            <MaterialIcons name="square" color="#4dc100" size={20} />
                            <Text>Optional</Text>
                        </View>
                    </View>
                </View>

                <FlatList
                    data={detail}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <View
                                style={{
                                    width: 4,
                                    backgroundColor: getColor(item.level),
                                    borderTopLeftRadius: 12,
                                    borderBottomLeftRadius: 12,
                                }}
                            />

                            <View style={[styles.taskCard, { flex: 1, marginLeft: 5 }]}>


                                <CheckBox
                                    value={item.status === 'completed'}
                                    onValueChange={() => toggleTodo(index)}
                                    tintColors={{ true: "#2196F3", false: "#000000" }}
                                />

                                <View style={styles.textContainer}>

                                    <Text
                                        style={[
                                            styles.taskText,
                                            item.status === 'completed' && {
                                                textDecorationLine: 'line-through',
                                                color: '#aaa',
                                            },
                                        ]}
                                    >
                                        {item.name}
                                    </Text>

                                    {item.desk ? (
                                        <Text
                                            style={[
                                                styles.descText,
                                                item.status === 'completed' && {
                                                    textDecorationLine: 'line-through',
                                                },
                                            ]}
                                        >
                                            {item.desk}
                                        </Text>
                                    ) : null}

                                    <Text style={styles.timeText}>
                                        ⏰ {new Date(item.deadline).toLocaleDateString()}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => navigation.navigate('addDetail')}
                >
                    <MaterialIcons name="add" color="#008cff" size={40} />
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    top: { fontSize: 20, fontWeight: "bold", marginBottom: 10, color: '#747474', justifyContent: "center" },
    wrap: { backgroundColor: '#fff', borderRadius: 15, borderBottomWidth: 1, marginBottom: 20, padding: 10 },
    first: { flexDirection: "row", gap: 30, justifyContent: "space-around", marginBottom: 15 },
    sec: { flexDirection: "column", alignItems: "center" },
    textContainer: {
        marginLeft: 10,
        flex: 1,
    },
    input: {
        color: '#000',
        borderColor: '#D0D5DD',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    txtInput: {
        color: '#000',
        fontSize: 17,
        fontWeight: "semibold",
    },
    txtButton: { fontSize: 17, color: '#008cff' },
    fab: {
        position: "absolute",
        bottom: 30,
        right: 10,
        width: 65,
        height: 65,
        borderRadius: 35,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 8,
    },
    taskText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#444"
    },
    descText: {
        fontSize: 14,
        color: "#777",
        marginTop: 4,
    },
    timeText: {
        fontSize: 13,
        color: "#008cff",
        marginTop: 6,
        fontWeight: "600",
    },
    taskCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    deleteButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FF3B30",
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
})
