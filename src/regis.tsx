import { Alert, Button, Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
import CheckBox from "@react-native-community/checkbox";
import { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type List = {
    add: undefined;
    Dashboard: undefined;
    Task: undefined;
    Regis: undefined;
    Login: undefined;
};

export default function RegisterPage() {
    const [checked, setChecked] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigation = useNavigation<NavigationProp<List>>();

    const register = () => {

        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Error", "Semua field wajib diisi");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Password tidak sama");
            return;
        }

        if (!checked) {
            Alert.alert("Error", "Setujui terms terlebih dahulu");
            return;
        }

        Alert.alert("Success", "Register berhasil");

        navigation.navigate("Login");
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                backgroundColor: '#EDF1F3'
            }}
        >

            <Image
                source={require('./assets/images/tdl.png')}
                style={{ width: 80, height: 70 }}
            />

            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
                Create Account
            </Text>

            <Text style={{ marginBottom: 30 }}>
                Create your new account
            </Text>

            <TextInput
                placeholder='Full Name'
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
                value={name}
                onChangeText={setName}
            />

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
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                    borderWidth: 1,
                    borderColor: '#ddd'
                }}
                value={password}
                onChangeText={setPassword}
            />

            <TextInput
                placeholder='Confirm Password'
                placeholderTextColor='#d1d1d1'
                secureTextEntry
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
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 15,
                    width: '100%'
                }}
            >
                <CheckBox
                    value={checked}
                    onValueChange={setChecked}
                    tintColors={{ true: '#007AFF', false: '#999' }}
                />

                <Text>
                    I agree to Terms & Conditions
                </Text>
            </View>

            <View style={{ width: '100%' }}>
                <TouchableOpacity
                    onPress={register}
                    style={{
                        paddingVertical: 12,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "#2fb59d",
                        marginBottom: 15
                    }}
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>

            <Text>
                Already have an account?

                <Text
                    style={{ color: '#0750ef' }}
                    onPress={() => navigation.navigate("Login")}
                >
                    {" "}Login
                </Text>
            </Text>

            <Text style={{ color: '#0750ef', marginTop: 15 }}>
                Learn more
            </Text>

        </View>
    );
}