import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProp, useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import BottomBar from "../component/Bottombar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CheckBox from "@react-native-community/checkbox";


type ListParams = {
  list: {
    newTask?: {
      title: string;
      desc: string;
      date: string;
      type: string;
    }
  };
  add: undefined;
};

export default function List() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<RouteProp<ListParams, 'list'>>();
  const [isSelected, setSelection] = useState(false);
  const [type, setType] = useState('Normal');

  const [tasks, setTasks] = useState<{ id: string; title: string; desc: string; date: string; type: string; completed: boolean; }[]>([]);

  useEffect(() => {
    if (route.params?.newTask) {
      const { title, desc, date, type } = route.params.newTask;

      const newTaskObj = {
        id: Date.now().toString(),
        title: title,
        desc: desc,
        date: date,
        type: type,
        completed: false
      };

      setTasks((prev) => [...prev, newTaskObj]);

      navigation.setParams({ newTask: undefined });
    }
  }, [route.params?.newTask]);

  const toggleTask = (id) => {
    const newTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );
    setTasks(newTasks);
  };

  const getColor = (type) => {
    switch (type) {
      case 'Priority':
        return '#FF3B30';
      case 'Optional':
        return '#34C759';
      case 'Normal':
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
        {/* <ScrollView> */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", marginBottom: 10 }}>

              {/* garis warna */}
              <View style={{
                width: 4,
                backgroundColor: getColor(item.type),
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12
              }} />

              {/* card */}
              <TouchableOpacity
                style={{ flex: 1, marginLeft: 5 }}
                onPress={() => navigation.navigate('detail')}
              >
                <View style={styles.taskCard}>
                  <CheckBox
                    value={item.completed}
                    onValueChange={() => toggleTask(item.id)}
                    tintColors={{ true: "#2196F3", false: "#000000" }}
                  />

                  <View style={styles.textContainer}>
                    <Text style={[
                      styles.taskText,
                      item.completed && {
                        textDecorationLine: 'line-through',
                        color: '#aaa'
                      }
                    ]}>
                      {item.title}
                    </Text>

                    {item.desc ? (
                      <Text style={styles.descText}>{item.desc}</Text>
                    ) : null}

                    <Text style={styles.dateText}>
                      🗓️{new Date(item.date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

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
          onPress={() => navigation.navigate('add')}
        >
          <MaterialIcons name="add" color="#008cff" size={40} />
        </TouchableOpacity>
      </View>

      <BottomBar />
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
    alignItems: "flex-start",
    marginBottom: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
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
});