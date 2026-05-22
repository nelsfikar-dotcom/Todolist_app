import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomBar from './src/component/Bottombar';
import Add from './src/screen/add';
import detailTask from './src/screen/taskDetail/detailTask';
import AddTD from './src/screen/taskDetail/addTaskDetail';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>

        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >

          <Stack.Screen
            name="Main"
            component={BottomBar}
          />

          <Stack.Screen
            name="Add"
            component={Add}
          />
          
          <Stack.Screen
            name="detail"
            component={detailTask}
          />

          <Stack.Screen
            name="addDetail"
            component={AddTD}
          />

        </Stack.Navigator>

      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;