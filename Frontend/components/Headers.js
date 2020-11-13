import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import BorrowedScreen from "./BorrowedScreen";
import StockScreen from "./StockScreen";
import SearchScreen from "./SearchScreen";
import RequestsScreen from "./RequestsScreen";
import FriendsScreen from "./FriendsScreen";
import RegisterScreen from "./RegisterScreen";

const inactiveTintColor = "#333740";
const BurrowedStack = createStackNavigator();
const StockStack = createStackNavigator();
const SearchStack = createStackNavigator();
const RequestStack = createStackNavigator();
const FriendsStack = createStackNavigator();
const RegisterStack = createStackNavigator();

const FriendsStackScreen = () => (
  <FriendsStack.Navigator>
    <FriendsStack.Screen
      name="Freunde"
      component={FriendsScreen}
      options={{
        title: "Freunde",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
        headerRight: () => (
          <MaterialIcons
            name="add"
            size={28}
            style={styles.rightIcon}
            onPress={() => alert("This is a button!")}
          />
        ),

        headerLeft: () => (
          <MaterialIcons
            name="menu"
            size={28}
            style={styles.leftIcon}
          />
        ),
      }}
    />
  </FriendsStack.Navigator>
);

const RequestsStackScreen = () => (
  <RequestStack.Navigator>
    <RequestStack.Screen
      name="Anfragen"
      component={RequestsScreen}
      options={{
        title: "Lager",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },

        headerLeft: () => (
          <MaterialIcons
            name="menu"
            size={28}
            style={styles.leftIcon}
          />
        ),
      }}
    />
  </RequestStack.Navigator>
);

const BurrowedStackScreen = () => (
  <BurrowedStack.Navigator>
    <BurrowedStack.Screen
      name="Ausgeliehen"
      component={BorrowedScreen}
      options={{
        title: "Ausgeliehen",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
        headerLeft: () => (
          <MaterialIcons
            name="menu"
            size={28}
            style={styles.leftIcon}
          />
        ),
      }}
    />
  </BurrowedStack.Navigator>
);
const StockStackScreen = () => (
  <StockStack.Navigator>
    <StockStack.Screen
      name="Lager"
      component={StockScreen}
      options={{
        title: "Lager",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
        headerRight: () => (
          <MaterialIcons
            name="add"
            size={28}
            style={styles.rightIcon}
          />
        ),
        headerLeft: () => (
          <MaterialIcons
            name="menu"
            size={28}
            style={styles.leftIcon}
          />
        ),
      }}
    />
  </StockStack.Navigator>
);
const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name="Suche"
      component={SearchScreen}
      options={{
        title: "Suche",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
        headerRight: () => (
          <MaterialCommunityIcons
            name="dns-outline"
            size={28}
            style={styles.rightIcon}
          />
        ),
        headerLeft: () => (
          <MaterialIcons
            name="menu"
            size={28}
            style={styles.leftIcon}
          />
        ),
      }}
    />
  </SearchStack.Navigator>
);

const RegisterStackScreen = () => (
  <RegisterStack.Navigator>
    <RegisterStack.Screen
      name="Registrieren"
      component={RegisterScreen}
      options={{
        title: "Registrieren",
        headerStyle: {
          backgroundColor: inactiveTintColor,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Roboto",
        },
        headerLeft: () => (
          <Ionicons
            name="md-arrow-back"
            size={28}
            style={styles.leftIcon}
          />
        ),
      }}
    />
  </RegisterStack.Navigator>
);

const styles = StyleSheet.create({
  leftIcon: {
    color: "#fff",
    marginLeft: 15,
  },
  rightIcon: {
    color: "#fff",
    marginRight: 15,
  },
});

export {
  BurrowedStackScreen,
  StockStackScreen,
  SearchStackScreen,
  RequestsStackScreen,
  FriendsStackScreen,
  RegisterStackScreen,
};
