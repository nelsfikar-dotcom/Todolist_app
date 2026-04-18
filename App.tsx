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

import homePage from './src/screen/add';
import Home from './src/screen/add';
import LoginPage from './src/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import regisPage from './src/regis';
import { NavigationContainer } from '@react-navigation/native';
import menuUtama from './src/screen';
import home from "./src/screen/add";
import add from "./src/screen/list";
import List from './src/screen/list';
import Add from './src/screen/add';
import detailTask from './src/screen/taskDetail/detailTask';
import AddTD from './src/screen/taskDetail/addTaskDetail';


function layoutStack () {
  const Stack = createNativeStackNavigator (); 
    return (
      <Stack.Navigator initialRouteName='Dashboard' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Dashboard" component={menuUtama}/>
        <Stack.Screen name="add" component={Add}/>
        <Stack.Screen name="Task" component={List}/>
        <Stack.Screen name="Regis" component={regisPage}/>
        <Stack.Screen name="detail" component={detailTask}/>
        <Stack.Screen name="addDetail" component={AddTD}/>
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