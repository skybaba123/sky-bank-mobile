import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Borrow = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.contrytText}>You owe</Text>
      <View style={styles.balContainer}>
        <Text style={styles.balText}>₦0.00</Text>
        <MaterialCommunityIcons
          name="dots-horizontal-circle"
          size={30}
          color="dimgrey"
        />
      </View>

      <View></View>
    </View>
  );
};

export default Borrow;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  balContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  contrytText: {
    color: "dimgrey",
    marginBottom: 5,
  },

  balText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#3DD2F1",
  },
});
