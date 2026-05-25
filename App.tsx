import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBar from './src/component/Bottombar';
import Add from './src/screen/add';
import detailTask from './src/screen/taskDetail/detailTask';
import AddTD from './src/screen/taskDetail/addTaskDetail';
import LoginPage from './src/login';
import RegisterPage from './src/regis';

const Stack = createNativeStackNavigator();

function App() {

  const [isLogin, setIsLogin] = useState(false);

  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {

    try {

      const user = await AsyncStorage.getItem("user");

      console.log("USER => ", user);

      if (user) {

        setIsLogin(true);

      } else {

        setIsLogin(false);
      }

    } catch (e) {

      console.log(e);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    checkLogin();

  }, []);

  if (loading) {
    return null;
  }

  return (

    <SafeAreaProvider>

      <NavigationContainer>

        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >

          {
            isLogin ? (

              <>
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
              </>

            ) : (

              <>
                <Stack.Screen
                  name="Login"
                  component={LoginPage}
                />

                <Stack.Screen
                  name="Regis"
                  component={RegisterPage}
                />
              </>
            )
          }

        </Stack.Navigator>

      </NavigationContainer>

    </SafeAreaProvider>
  );
}

export default App;