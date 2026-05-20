import MaterialIcons from "@react-native-vector-icons/material-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, TouchableOpacity, View, Text, TextInput, StyleSheet, Platform, Button } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from '@react-native-community/datetimepicker';
import CheckBox from "@react-native-community/checkbox";


export default function AddTD() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<any>>();
    const [isSelected, setSelection] = useState(false);

    const [activity, setActivity] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);
    const [type, setType] = useState('Normal');

    const showMode = (currentMode: string) => {
        setShow(true);
    }

    const showTimepicker = () => {
        showMode('time');
    }

    const handleTimeChange = (event: any, selectedTime: any) => {
        if (selectedTime) {
            setTime(selectedTime);
        }
        if (Platform.OS === 'android') {
            setShow(false);
        }
    }

    const handleSave = () => {
        if (activity.trim().length > 0) {
            navigation.navigate('detail', {
                newDetail: {
                    title: activity,
                    desc: description,
                    time: time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                    type: type
                }
            });
            setActivity('');
            setDescription('');
            setTime(new Date());
            setType('Normal');
        }
    };

   

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={{ padding: 20 }}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate ('detail')}>
                    <MaterialIcons name="arrow-back" color="#008cff" size={40} />
                </TouchableOpacity>
                <Text style={styles.label}>Tambahkan detail tugas anda</Text>
                <Text style={styles.nama}>Nama detail tugas? :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Contoh: tidur"
                    placeholderTextColor="#666"
                    value={activity}
                    onChangeText={setActivity}
                />

                <Text style={styles.nama}>Deksripsi detail:</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Isi deskripsi (Opsioanl)"
                    placeholderTextColor="#666"
                    value={description}
                    onChangeText={setDescription}
                    multiline={true}
                    numberOfLines={4}
                />

                <SafeAreaView>
                    <View>
                        <Text style={styles.nama}>Waktu dimulai</Text>
                        <Button title="Pilih Waktu" onPress={showTimepicker} />
                        <Text style={styles.timeDisplay}>Jam :
                            {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                        {show && (
                            <View>
                                <DateTimePicker
                                    value={time}
                                    mode="time"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={handleTimeChange}
                                />
                                {Platform.OS === 'ios' && (
                                    <Button title="Tutup" onPress={() => setShow(false)} />
                                )}
                            </View>
                        )}
                        <View style={{ flexDirection: "column", marginVertical: 10}}>
                            <TouchableOpacity onPress={() => setType('Priority')}>
                                <View style={{flexDirection: "row", alignItems:"center", marginRight: 15}}>
                                    <View style={{ width: 15, height: 15, backgroundColor: '#FF3B30', marginRight: 3}}/>
                                    <CheckBox 
                                    value={type == 'Priority'}
                                    onValueChange={() => setType('Priority')}
                                    tintColors={{true: '#FF3B30', false: '#999'}}
                                    />
                                    <Text> Prioritas </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setType('Normal')}>
                                <View style={{flexDirection: "row", alignItems:"center", marginRight: 15}}>
                                    <View style={{ width: 15, height: 15, backgroundColor: '#007AFF', marginRight: 3}}/>
                                    <CheckBox
                                    value={type == 'Normal'}
                                    onValueChange={() => setType('Normal')}
                                    tintColors={{true: '#007AFF', false: '#999'}}
                                    />
                                    <Text> Normal </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setType('Optional')}>
                                <View style={{flexDirection: "row", alignItems:"center", marginRight: 15}}>
                                    <View style={{ width: 15, height: 15, backgroundColor: '#34C759', marginRight: 3}}/>
                                    <CheckBox
                                    value={type == 'Optional'}
                                    onValueChange={() => setType('Optional')}
                                    tintColors={{true: '#34C759', false: '#999'}}
                                    />
                                    <Text> Opsional </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Tambahkan detail tugas</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#ffffff', margin: 5 },
    label: { fontSize: 17, fontWeight: 'bold', marginBottom: 20, marginTop: 20 },
    nama: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
    input: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    backBtn: { flexDirection: 'row', alignItems: 'center' },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    button: { backgroundColor: '#008cff', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    cek: { flexDirection: "row", alignItems: "center" },
    timeDisplay: { fontSize: 18, fontWeight: '600', marginTop: 10 },
})