import { Alert, Button, Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
import CheckBox from "@react-native-community/checkbox";
import { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';

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
    const login = () => {

        if (!email || !password) {
            Alert.alert("Error", "Email dan password wajib diisi");
            return;
        }

        if (
            email === "Fikar123@gmail.com" &&
            password === "123456"
        ) {
            Alert.alert("Success", "Login berhasil");

            navigation.navigate("Dashboard");
        } else {
            Alert.alert("Error", "Email atau password salah");
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

            <View style={{ flexDirection: 'row', alignItems:'center' , gap: 10, marginBottom: 13 }}>
                <CheckBox
                    value={checked}
                    onValueChange={setChecked}
                    tintColors={{ true: '#007AFF', false: '#999' }} />
                <Text> Remember me</Text>
                <Text style={{ color: '#0750ef' }}> Forgot Password ?</Text>
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
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }} >Or With</Text>
            <View style={{ width: '100%', marginBottom: 10 }}>
                <Button title='Continue with Google'></Button>
            </View>
            <View style={{ width: '100%', marginBottom: 0, }}>
                <Button title='Continue with Facebook'></Button>
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
            <Text style={{ color: '#0750ef', marginTop: 10 }}>Learn more</Text>
        </View>
    );
}
