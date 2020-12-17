import {BACKEND_URL} from "@env";
import "react-native-gesture-handler";
import React, { useEffect, useMemo, useReducer } from "react";

import { NavigationContainer } from "@react-navigation/native";

import RootStackScreen from "./components/RootStackScreen";
import AppTabs from "./components/AppTabs";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "./components/context";
import SplashScreen from "./components/SplashScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, View } from "react-native";
import DrawerContent from "./components/DrawerContent";

import { ProfileStackScreen, SettingsStackScreen } from "./components/Headers";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      // style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={AppTabs} />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
      <Drawer.Screen name="Settings" component={SettingsStackScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {
  
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: (username, password) => {
        var user;
        // fetch api call to check username and password
        let requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        };
        try {
          fetch(BACKEND_URL+"auth/login", requestOptions).then(
            async (response) => {
              await AsyncStorage.setItem(
                "user",
                await response.json().then((payload)=>{
                  return JSON.stringify(payload.data);
                })
              );
              console.log(await AsyncStorage.getItem('user'));
            }
          );
        } catch (e) {
          console.log(e);
        }
        user = AsyncStorage.getItem("user");
        dispatch({ type: "LOGIN", id: username, token: user });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("user");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {},
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let user;
      user = null;
      try {
        user = await AsyncStorage.getItem("user");
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "RETRIEVE_TOKEN", token: user });
    }, 1000);
  }, []);
  if (loginState.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken ? <DrawerNavigator /> : <RootStackScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "blue",
    fontSize: 50
  }
});*/
