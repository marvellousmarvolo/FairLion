import React from "react";
import env from "../env.js";
const { IMAGE_URL } = env;
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import UserButton from "./UserButton";
import FavouritesButton from "./FavouritesButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { render } from "react-dom";
import { formatDuration } from "../helpers/format.js";


export default function ItemSearch({
  navigation,
  besitzer,
  produktName,
  beschreibung,
  ausleihfrist,
  images,
  favored,
  kategorie,
  status,
  returnDate,
  articleId,
  user,
  borrower,
}) {

  let duration = formatDuration(ausleihfrist)
  return (
    <TouchableOpacity
      style={styles.itemStyle}
      onPress={async () =>{
        const userId = await AsyncStorage.getItem("userId");
        let screen;
        if (borrower) {          
          if (borrower == userId) {
            screen = "ReturnDetails";
          }
        }
        else {
          screen = "ViewDetails";
        }
        navigation.navigate(screen, {
          besitzer: besitzer,
          produktName: produktName,
          images: images,
          beschreibung: beschreibung,
          ausleihfrist: duration,
          kategorie: kategorie,
          status: status,
          articleId: articleId,
          favored: favored,
          returnDate: returnDate,
          user: user,
        })}
      }
    >
      <View>
        <Image
          style={styles.itemImage}
          source={{ uri: IMAGE_URL + images[0] }}
        />
      </View>
      <View style={styles.itemBottomView}>
        <View style={styles.items}>
          <Text style={styles.itemName} numberOfLines={1}>
            {produktName}
          </Text>
          <FavouritesButton articleId={articleId} favored={favored} />
        </View>
        <View style={styles.items}>
          <UserButton user={user} navigation={navigation} />

          <Text style={styles.itemTime} numberOfLines={1}>
            Frist: {duration}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  itemStyle: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignSelf: "stretch",
    width: Dimensions.get("window").width - 5,
    marginVertical: 3,
  },
  itemImage: { height: 90, width: 120 },
  items: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  itemButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E77F23",
    borderRadius: 50,
  },
  itemBottomView: {
    width: Dimensions.get("window").width - 125,
    paddingVertical: 5,
  },
  itemTime: {
    textAlign: "right",
    fontSize: 12,
    width: "45%",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    width: "85%",
  },
});
