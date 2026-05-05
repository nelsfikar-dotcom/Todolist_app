import MaterialIcons from "@react-native-vector-icons/material-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, TouchableOpacity, View, Text, TextInput, StyleSheet, Platform, Button } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from '@react-native-community/datetimepicker';



export default function Add() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [activity, setActivity] = useState('');
  const [description, setDescription] = useState('');

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
   const [type, setType] = useState('Normal');

  const showDatepicker = () => {
    setShow(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSave = () => {
    if (activity.trim().length > 0) {
      navigation.navigate('Task', {
        newTask: {
          title: activity,
          desc: description,
          date: date.toISOString(),
          type: type
        }
      });
      setActivity('');
      setDescription('');
      setDate(new Date());
      setType('Normal');
    } else {
      Alert.alert("Error", "Tuliskan aktivitas terlebih dahulu!");
    }
  };



  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" color="#008cff" size={40} />
          <Text style={{ fontSize: 17, color: '#008cff' }}>Kembali</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Apa yang ingin kamu lakukan?</Text>

        <Text style={styles.nama}>Nama Tugas:</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: tidur"
          placeholderTextColor="#666"
          value={activity}
          onChangeText={setActivity}
          autoFocus={true}
        />

        <Text style={styles.nama}>Deskripsi tugas:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Isi deskripsi tugas (opsional)"
          placeholderTextColor="#666"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
        />

        <SafeAreaView >
          <View style={styles.deadLine}>
            <Text style={styles.textDL}>PILIH DEADLINE TO-DO </Text>
            <Button onPress={showDatepicker} title="Tanggal!!!" />
          </View>

          <Text style={styles.textDL}>DEADLINE : {date.toLocaleDateString()}</Text>
          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <View style={{ flexDirection: "row", marginVertical: 10}}>
                            <TouchableOpacity onPress={() => setType('Priority')}>
                                <View style={{flexDirection: "row", alignItems:"center", marginRight: 15}}>
                                    <View style={{ width: 15, height: 15, backgroundColor: '#FF3B30', marginRight: 3}}/>
                                    <Text> Prioritas </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setType('Normal')}>
                                <View style={{flexDirection: "row", alignItems:"center", marginRight: 15}}>
                                    <View style={{ width: 15, height: 15, backgroundColor: '#007AFF', marginRight: 3}}/>
                                    <Text> Normal </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setType('Optional')}>
                                <View style={{flexDirection: "row", alignItems:"center", marginRight: 15}}>
                                    <View style={{ width: 15, height: 15, backgroundColor: '#34C759', marginRight: 3}}/>
                                    <Text> Opsional </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
        </SafeAreaView>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Simpan To-do</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { padding: 10 },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  content: { padding: 20 },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  nama: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff'
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  deadLine: { marginBottom: 20 },
  textDL: { fontSize: 20, marginBottom: 15, fontWeight: "bold" },
  button: { backgroundColor: '#008cff', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});