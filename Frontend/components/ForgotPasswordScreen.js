import env from "../env.js";
const { BACKEND_URL, IMAGE_URL } = env;
import React, { useState } from "react";
import { Alert } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

export const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    occured: false,
    label: "",
  });

  const submitEmail = () => {
    if (!email)
      return setError({ occured: true, label: "Feld darf nicht leer sein." });
    fetch(BACKEND_URL + "auth" + "/" + "pwreset", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert("Erfolg","Wir haben dir dein neues Passwort per Email zugeschickt.");
          navigation.goBack();
        } else {
          setError({
            occured: true,
            label:
              "Da ist etwas schief gelaufen. Versuche es bitte später noch einmal.",
          });
        }
      })
      .catch((err) => {
        setError({
          occured: true,
          label:
            "Da ist etwas schief gelaufen. Versuche es bitte später noch einmal.",
        });
      });
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={styles.view}>
        <View style={styles.textContainer}>
          <Text style={styles.baseText}>Geben Sie Ihre Email Adresse ein, um Ihr Passwort zurückzusetzen:</Text>
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email Adresse"
            placeholderTextColor="#7E7E7E"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(value) => setEmail(value)}
          />
        </View>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.submitBtn} onPress={submitEmail}>
          <Text style={styles.submitText}>Absenden</Text>
        </TouchableOpacity>
      </View>

      {error.occured && Alert.alert("Fehler",error.label)}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    marginTop: 30,
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    width: "100%",
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    paddingVertical: 15,
  },
  baseText: {
    fontSize: 14,
    marginHorizontal: 20,
  },
  inputView: {
    width: "100%",
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
    height: 50,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 16,
    height: 50,
    color: "#000",
    marginLeft: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtn: {
    width: "60%",
    backgroundColor: "#E77F23",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  submitText: {
    color: "#fff",
    fontSize: 20,
  },
});
