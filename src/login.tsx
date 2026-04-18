import { Alert, Button, Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
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
    const navigation = useNavigation<NavigationProp<List>>();
    const login = () => {
        if (email == "Fikar123@gmail.com")
            Alert.alert("login berhasil");
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, backgroundColor: '#EDF1F3' }}>
            <Image
                source={require('./assets/images/tdl.png')}
                style={{ width: 80, height: 70, }} />
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Welcome Back</Text>
            <Text style={{ marginBottom: 40 }}>Enter your email and Password to log-in</Text>

            <TextInput placeholder='Email' style={{
                borderRadius: 10,
                backgroundColor: '#fcfefe',
                width: '100%',
                marginBottom: 10,
                borderColor: '#f75ec4',


            }}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput placeholder='Password' style={{
                borderRadius: 10,
                backgroundColor: '#fcfefe',
                width: '100%',
                marginBottom: 10

            }}

            />
            <View style={{ flexDirection: 'row', gap: 10 }}>
                <Checkbox
                    value={checked}
                    onValueChange={setChecked}
                    color={checked ? '#185fed' : undefined} />
                <Text> Remember me</Text>
                <Text style={{ color: '#0750ef', marginBottom: 15 }}> Forgot Password ?</Text>
            </View>
            <View style={{ width: '100%' }}>

                <TouchableOpacity style={{ paddingVertical: 10, marginBottom: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: "#2fb59d" }}>
                    <Text>
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
            <Text style={{ marginTop: 120 }}>Don't have an account ?
                <Text style={{ color: '#0750ef' }}
                // onPress={() => navigation.navigate('regisPage')}
                >Sign Up</Text>
            </Text>
            <Text style={{ color: '#0750ef', marginTop: 10 }}>Learn more</Text>
        </View>
    );
}
