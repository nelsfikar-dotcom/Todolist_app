/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import homePage from './src/home';
import Home from './src/home';
import LoginPage from './src/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import regisPage from './src/regis';
import { NavigationContainer } from '@react-navigation/native';
import menuUtama from './src';


function layoutStack () {
  const Stack = createNativeStackNavigator (); 
    return (
      <Stack.Navigator initialRouteName='dashboard' screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={LoginPage}/>
        <Stack.Screen name="register" component={regisPage}/>
        <Stack.Screen name="dashboard" component={menuUtama}/>
        
      </Stack.Navigator>
    );
}



function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
      <NavigationContainer>
        {layoutStack()}
      </NavigationContainer>
  );
}

function AppContent() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>HALO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;