import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProp, useNavigation} from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CheckBox from "@react-native-community/checkbox";
import { task } from "../db/tasks/type";

type ListParams = {
  list: {
    newTask?: {
      title: string;
      desc: string;
      date: string;
      type: string;
    };
    updatedTask?: { 
      id: string;
      title: string;
      desc: string;
    };
  };
  add: undefined;
  
};

const dummyTasks: task[] = [
  {
    id: 1,
    name: "Belajar React Native",
    desk: "Membuat halaman login dan register",
    deadline: "2026-05-25",
    status: "process",
    level: "normal",
    user_id: 1,
    created_at: "2026-05-23T10:00:00",
    updated_at: "2026-05-23T10:00:00",
  },
  {
    id: 2,
    name: "Mengerjakan UI Todo",
    desk: "Menambahkan fitur checkbox",
    deadline: "2026-05-27",
    status: "completed",
    level: "normal",
    user_id: 1,
    created_at: "2026-05-23T10:00:00",
    updated_at: "2026-05-23T10:00:00",
  },
  {
    id: 3,
    name: "Fix Navigation",
    desk: "Memperbaiki bug goBack()",
    deadline: "2026-05-30",
    status: "cancel",
    level: "priority",
    user_id: 2,
    created_at: "2026-05-23T10:00:00",
    updated_at: "2026-05-23T10:00:00",
  },
];


export default function List() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<any>>();

  const handleDelete = (id: number) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const [tasks, setTasks] = useState<task[]>(dummyTasks);

  useEffect(() => {
    setTasks(dummyTasks);
  }, []);

  const toggleTask = (id: number) => {
    const newTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status:
              task.status === 'completed'
                ? 'process'
                : 'completed',
          }
        : task
    );

    setTasks(newTasks);
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

    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={{ marginHorizontal: 20, flex: 1, marginTop: insets.top }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
          <MaterialIcons name="list" color="#000" size={40} />
          <Text style={styles.title}> Task List :</Text>

        </View>
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
        {/* <ScrollView> */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", marginBottom: 10 }}>

              {/* garis warna */}
              <View style={{
                width: 4,
                backgroundColor: getColor(item.level),
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12
              }} />

              {/* <TouchableOpacity
                style={{ flex: 1, marginLeft: 5 }}
                onPress={() => navigation.navigate('detail')}
              > */}
              <View style={[styles.taskCard, { flex: 1, marginLeft: 5 }]}>
                <CheckBox
                  value={item.status === 'completed'}
                  onValueChange={() => toggleTask(item.id)}
                />

                <View style={styles.textContainer}>
                  <Text style={[
                    styles.taskText,
                    item.status == 'completed' && {
                      textDecorationLine: 'line-through',
                      color: '#aaa'
                    }
                  ]}>
                    {item.name}
                  </Text>

                  {item.desk ? (
                    <Text style={styles.descText}>{item.desk}</Text>
                  ) : null}

                  <Text style={styles.dateText}>
                    🗓️{new Date(item.deadline).toLocaleDateString()}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('detail', { task: item })}>
                    <MaterialIcons name="edit" color="#fff" size={20} />

                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <MaterialIcons name="delete" color="#fff" size={20} />
                    {/* <Text style={styles.buttonText}> Hapus</Text> */}
                  </TouchableOpacity>
                </View>
              </View>
              {/* </TouchableOpacity> */}

            </View>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#000000' }}>
              Belum ada aktivitas. Klik + untuk menambah.
            </Text>
          }
        />
        {/* </ScrollView> */}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('Add')}
        >
          <MaterialIcons name="add" color="#008cff" size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 20,
    color: "#333"
  },
  taskCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  first: { flexDirection: "row", gap: 30, justifyContent: "space-around", marginBottom: 20 },
  sec: { flexDirection: "column", alignItems: "center" },
  textContainer: {
    marginLeft: 10,
    flex: 1,
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
  dateText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
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
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#008cff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 5
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF3B30",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});