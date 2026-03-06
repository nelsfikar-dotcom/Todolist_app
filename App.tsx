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
import home from "./src/home";
import add from "./src/add";


function layoutStack () {
  const Stack = createNativeStackNavigator (); 
    return (
      <Stack.Navigator initialRouteName='Dashboard' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Dashboard" component={menuUtama}/>
        <Stack.Screen name="Home" component={home}/>
        <Stack.Screen name="Add" component={add}/>
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