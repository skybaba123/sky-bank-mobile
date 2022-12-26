import {
  Alert,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../store/auth";
import { colors } from "../constants/colors";
import * as Clipboard from "expo-clipboard";

const AccountDetails = () => {
  const currentUser = useContext(AuthContext).currentUser;

  const copyUserName = async () => {
    await Clipboard.setStringAsync(currentUser.userName);
    Alert.alert("Copied", "Copied Username");
  };

  const copyAccountNumber = async () => {
    await Clipboard.setStringAsync(currentUser.accNum);
    Alert.alert("Copied", "Copied Account Number");
  };

  const copyEmail = async () => {
    await Clipboard.setStringAsync(currentUser.email);
    Alert.alert("Copied", "Copied Email Address");
  };

  return (
    <View style={styles.container}>
      <Ionicons
        style={{ marginRight: 7 }}
        name="person-circle-outline"
        size={60}
        color="#fff"
      />

      <Text style={styles.nameText}>
        {currentUser.fname} {currentUser.lname}
      </Text>

      <Pressable
        android_ripple={{ color: "grey" }}
        onPress={copyUserName}
        style={styles.button}
      >
        <View>
          <Text style={styles.buttonSmallText}>Your Username</Text>
          <Text style={styles.buttonBoldText}>@{currentUser.userName}</Text>
        </View>
        <View>
          <Text style={[styles.buttonBoldText, { color: "#48D38A" }]}>
            copy
          </Text>
        </View>
      </Pressable>

      <Pressable
        android_ripple={{ color: "grey" }}
        onPress={copyAccountNumber}
        style={styles.button}
      >
        <View>
          <Text style={styles.buttonSmallText}>Your Account Number</Text>
          <Text style={styles.buttonBoldText}>{currentUser.accNum}</Text>
        </View>
        <View>
          <Text style={[styles.buttonBoldText, { color: "#48D38A" }]}>
            copy
          </Text>
        </View>
      </Pressable>

      <Pressable
        android_ripple={{ color: "grey" }}
        onPress={copyEmail}
        style={styles.button}
      >
        <View>
          <Text style={styles.buttonSmallText}>Your Email Address</Text>
          <Text style={styles.buttonBoldText}>{currentUser.email}</Text>
        </View>
        <View>
          <Text style={[styles.buttonBoldText, { color: "#48D38A" }]}>
            copy
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default AccountDetails;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },

  nameText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 12,
  },

  button: {
    backgroundColor: colors.lightGrey,
    width: "90%",
    borderRadius: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: height > 600 ? 65 : 50,
    marginBottom: 12,
  },

  buttonSmallText: {
    color: "#fff",
  },

  buttonBoldText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
