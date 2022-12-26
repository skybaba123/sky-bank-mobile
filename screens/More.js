import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { AuthContext } from "../store/auth";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const More = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const currentUser = authCtx.currentUser;

  const logoutHandler = () => {
    setLoading(true);
    setTimeout(() => {
      authCtx.logoutHandler();
      AsyncStorage.removeItem("USEREMAIL");
      AsyncStorage.removeItem("TOKEN");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("accountDetails");
          }}
          style={styles.item}
          android_ripple={{ color: colors.lightGrey }}
        >
          <View style={styles.innerContainer}>
            <Ionicons
              style={{ marginRight: 7 }}
              name="person-circle-outline"
              size={60}
              color="#fff"
            />
            <View>
              <Text style={styles.itemText}>
                {currentUser?.fname} {currentUser?.lname}
              </Text>
              <Text style={styles.itemSmallText}>Account Details</Text>
            </View>
          </View>

          <FontAwesome5 name="angle-right" size={24} color="dimgrey" />
        </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator color={colors.orange} size={40} />
        ) : (
          <Pressable
            onPress={logoutHandler}
            android_ripple={{ color: colors.lightGrey }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
  },

  buttonText: {
    color: colors.orange,
    fontWeight: "bold",
    fontSize: 17,
  },

  categoryText: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 17,
  },

  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  itemSmallText: {
    color: "dimgrey",
    fontSize: 11,
  },
});
