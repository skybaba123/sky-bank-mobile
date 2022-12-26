import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../../store/auth";
import numeral from "numeral";
import { Entypo } from "@expo/vector-icons";

const NoTransaction = () => {
  return (
    <View style={styles.noTransaction}>
      <AntDesign
        style={{ marginBottom: 15 }}
        name="infocirlce"
        size={40}
        color="dimgrey"
      />
      <Text
        style={[
          styles.noTransactionText,
          { fontWeight: "bold", marginBottom: 15 },
        ]}
      >
        Nothing to see yet.
      </Text>
      <Text style={[styles.noTransactionText, { marginBottom: 15 }]}>
        Send or receive some money and we'll ahow you your transactions here.
      </Text>
      <Pressable style={styles.statement} android_ripple={{ color: "white" }}>
        <Text style={[styles.noTransactionText]}>Request Statement</Text>
      </Pressable>
    </View>
  );
};

const Transaction = ({ sender, time, date, status, amount }) => {
  const formattedNumber = numeral(amount).format("0,0.00");

  return (
    <Pressable style={styles.item} android_ripple={{ color: colors.lightGrey }}>
      <View style={styles.innerContainer}>
        <Entypo
          style={{ marginRight: 12 }}
          name="scribd"
          size={24}
          color={colors.orange}
        />
        <View>
          <Text style={styles.itemText}>{sender}</Text>
          <Text style={styles.itemSmallText}>
            {time}:{date}
          </Text>
        </View>
      </View>

      <Text style={[styles.itemText, { color: status }]}>
        {formattedNumber}
      </Text>
    </Pressable>
  );
};

const Spend = () => {
  const authCtx = useContext(AuthContext);
  const currentUser = authCtx.currentUser;
  const formattedNumber = numeral(currentUser?.accountBalance).format("0,0.00");
  const transactions = currentUser?.transactions;
  const newTransaction = transactions?.slice(0, 10);

  const renderList = ({ item }) => {
    return (
      <Transaction
        sender={item.sender}
        time={item.time}
        date={item.date}
        status={item.status}
        amount={item.amount}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.contrytText}>Nigerian Naira</Text>

      <View style={styles.balContainer}>
        <Text style={styles.balText}>
          ₦{currentUser ? formattedNumber : <ActivityIndicator color="#fff" />}
        </Text>
        <MaterialCommunityIcons
          name="dots-horizontal-circle"
          size={30}
          color="dimgrey"
        />
      </View>

      <View style={styles.actionContainer}>
        <Pressable style={styles.action} android_ripple={{ color: "white" }}>
          <FontAwesome
            style={{ marginRight: 10 }}
            name="exchange"
            size={20}
            color="dimgrey"
          />
          <Text style={[styles.actionText, { color: "dimgrey" }]}>Convert</Text>
        </Pressable>
        <Pressable style={styles.action} android_ripple={{ color: "white" }}>
          <Ionicons
            style={{ marginRight: 10 }}
            name="add-circle"
            size={24}
            color="#fff"
          />
          <Text style={[styles.actionText, { color: "#fff" }]}>Add Money</Text>
        </Pressable>
      </View>

      {!transactions ? (
        <NoTransaction />
      ) : (
        <FlatList
          data={newTransaction}
          renderItem={renderList}
          keyExtractor={() => Math.floor(1000000 + Math.random() * 9000000)}
          maxToRenderPerBatch={1}
          windowSize={1}
        />
      )}
    </View>
  );
};

export default Spend;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
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
    color: "#00E4E8",
  },

  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  action: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    height: 45,
    backgroundColor: colors.lightGrey,
    paddingLeft: 15,
    borderRadius: 5,
  },

  actionText: {
    fontWeight: "bold",
  },

  noTransaction: {
    alignItems: "center",
  },

  noTransactionText: {
    color: "#fff",
    textAlign: "center",
  },

  statement: {
    backgroundColor: colors.lightGrey,
    borderRadius: 5,
    paddingHorizontal: 20,
    height: 45,
    justifyContent: "center",
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
