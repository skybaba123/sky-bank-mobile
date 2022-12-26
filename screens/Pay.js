import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Pay = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.categoryText}>Send Money</Text>
      <Pressable
        onPress={() => navigation.navigate("payment", { incoming: "username" })}
        style={styles.item}
        android_ripple={{ color: colors.lightGrey }}
      >
        <View style={styles.innerContainer}>
          <Entypo
            style={{ marginRight: 12 }}
            name="scribd"
            size={24}
            color={colors.orange}
          />
          <View>
            <Text style={styles.itemText}>Send To @username</Text>
            <Text style={styles.itemSmallText}>
              Send to any Sky account, for free
            </Text>
          </View>
        </View>

        <FontAwesome5 name="angle-right" size={24} color="dimgrey" />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("payment", { incoming: "account" })}
        style={styles.item}
        android_ripple={{ color: colors.lightGrey }}
      >
        <View style={styles.innerContainer}>
          <Feather
            style={{ marginRight: 12 }}
            name="send"
            size={24}
            color={colors.orange}
          />
          <View>
            <Text style={styles.itemText}>Send To Bank Account</Text>
            <Text style={styles.itemSmallText}>
              Send To a Local Bank Account
            </Text>
          </View>
        </View>

        <FontAwesome5 name="angle-right" size={24} color="dimgrey" />
      </Pressable>
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
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
