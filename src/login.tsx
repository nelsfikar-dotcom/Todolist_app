import { Alert, Button, Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
import CheckBox from "@react-native-community/checkbox";
import { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { auth } from './db/auth/service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './db/api';

type List = {
    add: undefined;
    Dashboard: undefined;
    Task: undefined;
    Regis: undefined;
};

export default function LoginPage() {
    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation<NavigationProp<List>>();



    const login = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Semua field wajib diisi");
            return;
        }

        if (!checked) {
            Alert.alert("Error", "Setujui Remember me terlebih dahulu");
            return;
        }

        try {
            console.log("DATA LOGIN =>", {
                email,
                password
            });

            console.log("SEBELUM TEST");

            const test = await api.get('/');

            console.log("SESUDAH TEST");
            console.log("TEST API =", test.data);

            const response = await auth.login({
                email,
                password
            });

            console.log(response);

            await AsyncStorage.setItem(
                "user", JSON.stringify(response.data)
            );

            console.log("LOGIN SUCCES => ", response);

            Alert.alert("Succes", response.message);



        } catch (e: any) {
            console.log("LOGIN ERROR ", e);
            console.log("LOGIN ERROR RESPONSE", e);
            console.log("LOGIN ERROR DATA", e.response?.data)
            console.log("LOGIN ERROR MESSAGE", e.message);

            Alert.alert(
                "Error",
                e.response?.data?.message || e.message || "Login gagal"
            );
        }

    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, backgroundColor: '#EDF1F3' }}>
            <Image
                source={require('./assets/images/tdl.png')}
                style={{ width: 80, height: 70, }} />
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Welcome Back</Text>
            <Text style={{ marginBottom: 40 }}>Enter your email and Password to log-in</Text>

            <TextInput
                placeholder='Email'
                placeholderTextColor='#d1d1d1'
                style={{
                    color: '#000',
                    borderRadius: 10,
                    backgroundColor: '#fcfefe',
                    width: '100%',
                    marginBottom: 10,
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                    borderWidth: 1,
                    borderColor: '#ddd'
                }}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder='Password'
                placeholderTextColor='#d1d1d1'
                secureTextEntry
                style={{
                    color: '#000',
                    borderRadius: 10,
                    backgroundColor: '#fcfefe',
                    width: '100%',
                    marginBottom: 10,
                    paddingHorizontal: 15
                }}
                value={password}
                onChangeText={setPassword}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 10, marginBottom: 13 }}>
                <CheckBox
                    value={checked}
                    onValueChange={setChecked}
                    tintColors={{ true: '#007AFF', false: '#999' }} />
                <Text> Remember me</Text>
            </View>
            <View style={{ width: '100%' }}>

                <TouchableOpacity
                    onPress={login}
                    style={{
                        paddingVertical: 10,
                        marginBottom: 10,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "#2fb59d"
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={{ marginTop: 120 }}>
                Don't have an account ?

                <Text
                    style={{ color: '#0750ef' }}
                    onPress={() => navigation.navigate('Regis')}
                >
                    {" "}Sign Up
                </Text>
            </Text>
        </View>
    );
}
