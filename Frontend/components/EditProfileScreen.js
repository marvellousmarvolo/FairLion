import env from "../env.js";
const { BACKEND_URL, IMAGE_URL } = env;
import AsyncStorage from "@react-native-community/async-storage";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ImageChooser from "./ImageChooser";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Alert, DevSettings } from "react-native";

const EditProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [PLZ, setPLZ] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [image, setImage] = useState("");

  const getUser = async () => {
    try {
      setUsername(await AsyncStorage.getItem("username"));
      setPhone(await AsyncStorage.getItem("phone"));
      setStreet(await AsyncStorage.getItem("street"));
      setPLZ(await AsyncStorage.getItem("zipCode"));
      setCity(await AsyncStorage.getItem("city"));
      setCountry(await AsyncStorage.getItem("country"));
      setAboutMe(await AsyncStorage.getItem("info"));
      var imageUri = await AsyncStorage.getItem("image");
      imageUri = imageUri.substring(IMAGE_URL.length, imageUri.length);
      setImage(imageUri);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUser();
    });
    return unsubscribe;
  }, [navigation]);



  const handleImages = (imageUris) => {
    if (imageUris) {
      var images = [];
      for (const uri of imageUris) {
        var mime = uri.split(".").pop().toLowerCase();
        const ext = mime;
        if (mime === "jpg") mime = "jpeg";
        const name = Math.floor(
          Math.random() * Math.floor(999999999999999999999)
        );
        images.push({
          uri: uri,
          name: name + "." + ext,
          type: "image/" + mime,
        });
      }
      if (images[0] != image) {
        setImage(images[0]);
      }
    }
  };

  const handleEdit = async () => {

    const oldUsername = await AsyncStorage.getItem("username");
    const oldPhone = await AsyncStorage.getItem("phone");
    const oldStreet = await AsyncStorage.getItem("street");
    const oldZipCode = await AsyncStorage.getItem("zipCode");
    const oldCity = await AsyncStorage.getItem("city");
    const oldCountry = await AsyncStorage.getItem("country");
    const oldInfo = await AsyncStorage.getItem("info");

    const formdata = new FormData();

    if (username !== oldUsername && username.length >= 4 && username.length <= 15) {
      formdata.append("username", username);
    }
    if (phone !== oldPhone) {
      formdata.append("phone", phone);
    }
    if (street !== oldStreet) {
      formdata.append("street", street);
    }
    if (PLZ !== oldZipCode) {
      formdata.append("zipCode", PLZ);
    }
    if (city !== oldCity) {
      formdata.append("city", city);
    }
    if (country !== oldCountry) {
      formdata.append("country", country);
    }
    if (aboutMe !== oldInfo) {
      formdata.append("info", aboutMe);
    }
    if (image) {
      formdata.append("image", image);
    }

    let res;
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      body: formdata,
    };
    try {
      res = await fetch(
        BACKEND_URL + `users/${await AsyncStorage.getItem("userId")}`,
        requestOptions
      );
    } catch (err) {
      console.log(err);
    }
    if (res.status === 201) {
      const resJson = await res.json();
      const data = resJson.data;
      AsyncStorage.multiSet([
        ["userId", data._id],
        ["username", data.username],
        ["email", data.email],
        ["phone", data.phone],
        ["street", data.street],
        ["zipCode", data.zipCode],
        ["city", data.city],
        ["country", data.country],
        ["info", data.info],
        ["image", IMAGE_URL + data.image],
      ]);
      Alert.alert(
        "Update erfolgreich",
        resJson.message,

        [
          {
            text: "Ok",
            //onPress: () => DevSettings.reload(),
          },
        ],
        { cancelable: false }
      );
    } else {
      const errMess = await res.json();
      Alert.alert("Update gescheitert ", errMess.message);
    }
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <ImageChooser handleImages={handleImages} aspect={[1, 1]} />

      <View style={styles.userInfo}>
        <View style={styles.inputView}>
          <TextInput
            value={username}
            style={styles.inputText}
            placeholder="Username"
            placeholderTextColor="#7E7E7E"
            autoCapitalize="none"
            onChangeText={(value) => setUsername(value)}
          />
        </View>

        <View style={styles.inputViewLast}>
          <TextInput
            value={phone}
            style={styles.inputText}
            placeholder="Gib deine neue Telefonnummer ein"
            placeholderTextColor="#7E7E7E"
            autoCapitalize="none"
            keyboardType="phone-pad"
            onChangeText={(value) => setPhone(value)}
          />
        </View>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.inputView}>
          <TextInput
            value={street}
            style={styles.inputText}
            placeholder="Straße und Hausnummer"
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => setStreet(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            value={PLZ}
            style={styles.inputText}
            placeholder="PLZ"
            placeholderTextColor="#7E7E7E"
            keyboardType="phone-pad"
            onChangeText={(value) => setPLZ(value)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            value={city}
            style={styles.inputText}
            placeholder="Ort"
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => setCity(value)}
          />
        </View>

        <View style={styles.pickerView}>
          <Text style={styles.text}>Wähle ein Land:</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={country}
              style={styles.picker}
              itemStyle={styles.pickerItems}
              mode={"dropdown"}
              onValueChange={(itemValue, itemIndex) =>
                setCountry(itemValue)
              }
            >
              <Picker.Item label="Deutschland" value="de" />
              <Picker.Item label="Österreich" value="au" />
              <Picker.Item label="Schweiz" value="ch" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.userPersonalInfo}>
        <View style={styles.inputAboutMeView}>
          <TextInput
            value={aboutMe}
            style={styles.inputText}
            placeholder="Über mich..."
            placeholderTextColor="#7E7E7E"
            onChangeText={(value) => setAboutMe(value)}
          />
        </View>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.signUpBtn} onPress={handleEdit}>
          <Text style={styles.loginText}>Speichern</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ScrollView: {
    width: "100%",
    height: "100%",
  },
  userInfo: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  userPersonalInfo: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
  inputView: {
    width: "100%",
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
    height: 50,
    justifyContent: "center",
  },
  inputViewLast: {
    width: "100%",
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
    height: 50,
    justifyContent: "center",
  },
  inputText: {
    fontSize: 14,
    height: 50,
    color: "#000",
    marginLeft: 20,
  },
  inputAboutMeView: {
    width: "100%",
    height: 150,
  },
  signUpBtn: {
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
  loginText: {
    color: "#fff",
    fontSize: 20,
  },
  pickerView: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomColor: "#C6C6C8",
    borderBottomWidth: 0.5,
    ...Platform.select({
      ios: {
        height: 88,
        paddingHorizontal: 20,
      },
      android: {
        height: 50,
        paddingHorizontal: 15,
      },
      default: {
        height: 50,
        paddingHorizontal: 15,
      },
    }),
  },
  pickerContainer: {
    //flex: 1,
    width: "65%",
    height: "100%",
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: 88,
    fontSize: 14,
    color: "#000",
  },
  pickerItems: {
    fontSize: 14,
    height: 88,
    color: "#000",
  },
  text: {
    width: "35%",
    fontSize: 14,
    color: "#7E7E7E",
    alignContent: "center",
  },
});
