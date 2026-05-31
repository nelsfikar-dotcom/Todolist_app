import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
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
import MenuUtama from './src/screen';

const Stack = createNativeStackNavigator();

function App() {

  const [isLogin, setIsLogin] = useState(false);

  const [loading, setLoading] = useState(true);

  const [appState, setAppState] = useState(AppState.currentState);

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

    const interval = setInterval(() => {
      checkLogin();
    }, 3000); // Check setiap 500ms

    return () => clearInterval(interval);
  }, []);

  // Listen untuk perubahan AppState (ketika app kembali ke foreground)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: any) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // App kembali ke foreground, check login status lagi
      checkLogin();
    }
    setAppState(nextAppState);
  };

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