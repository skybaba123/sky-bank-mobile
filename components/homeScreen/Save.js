import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../../store/auth";
import numeral from "numeral";

const Save = () => {
  const authCtx = useContext(AuthContext);
  const currentUser = authCtx.currentUser;
  const formattedNumber = numeral(currentUser?.savingBalance).format("0,0.00");

  return (
    <View style={styles.container}>
      <Text style={styles.contrytText}>NGN Savings</Text>
      <View style={styles.balContainer}>
        <Text style={styles.balText}>₦{formattedNumber}</Text>
        <MaterialCommunityIcons
          name="dots-horizontal-circle"
          size={30}
          color="dimgrey"
        />
      </View>

      <Pressable style={styles.action} android_ripple={{ color: "white" }}>
        <Ionicons
          style={{ marginRight: 10 }}
          name="add-circle"
          size={24}
          color="#fff"
        />
        <Text style={[styles.actionText, { color: "#48D38A" }]}>
          Add Pocket
        </Text>
      </Pressable>

      <Text
        style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: 16,
          marginBottom: 10,
        }}
      >
        Your Pockets
      </Text>

      <Pressable
        android_ripple={{ color: "#48D38A" }}
        style={styles.spendContainer}
      >
        <View>
          <Text
            style={{
              color: "#48D38A",
              fontWeight: "bold",
              fontSize: 16,
              marginBottom: 5,
            }}
          >
            10%
            <Text style={{ color: "dimgrey", fontWeight: "normal" }}>
              {"  "}Spend & Save
            </Text>
          </Text>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            ₦{formattedNumber}
          </Text>
        </View>
        <FontAwesome5 name="piggy-bank" size={40} color="#48D38A" />
      </Pressable>
    </View>
  );
};

export default Save;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  balContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  contrytText: {
    color: "dimgrey",
    marginBottom: 5,
  },

  balText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#48D38A",
  },

  action: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    height: 45,
    backgroundColor: colors.lightGrey,
    paddingLeft: 15,
    borderRadius: 5,
    marginBottom: 10,
  },

  actionText: {
    fontWeight: "bold",
  },

  spendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    paddingVertical: 12,
    borderBottomColor: colors.lightGrey,
    borderTopColor: colors.lightGrey,
  },
});
