import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
// import { useRoute } from "@react-navigation/native";
import { useContext, useState } from "react";
import { colors } from "../constants/colors";
import { AuthContext } from "../store/auth";
import axios from "axios";

const MakePayment = () => {
  const [amountInput, setAmountInput] = useState("");
  const [accNumberInput, setAccNumberInput] = useState("");
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const reciepient = authCtx.users.find(
    (user) => user.accNum === accNumberInput
  );

  //   const route = useRoute();

  const amountInputChangeHandler = (enteredText) => {
    setAmountInput(Number(enteredText));
  };

  const accNumberInputChangeHandler = (enteredText) => {
    setAccNumberInput(enteredText);
  };

  const sendMoney = async () => {
    if (authCtx.currentUser.accountBalance <= amountInput) {
      Alert.alert(
        "Insufficient",
        "You do not have enough balance to complete this transaction"
      );
      return;
    }

    if (amountInput < 50) {
      Alert.alert("!", "Cannot send below N50");
      return;
    }

    if (authCtx.currentUser.accNum === accNumberInput) {
      Alert.alert("Chill!!", "You can't send money to your self");
      return;
    }

    try {
      setLoading(true);
      if (reciepient) {
        const percent = 0.1 * amountInput;
        reciepient.accountBalance += amountInput;
        authCtx.currentUser.accountBalance -= amountInput;
        authCtx.currentUser.accountBalance -= percent;
        authCtx.currentUser.savingBalance += percent;

        if (reciepient.transactions === undefined) {
          reciepient.transactions = [
            {
              sender:
                authCtx.currentUser.fname + " " + authCtx.currentUser.lname,
              time: new Date().toLocaleTimeString(),
              date: new Date().toDateString(),
              amount: `+${amountInput}`,
              status: "green",
              id: Math.floor(1000000 + Math.random() * 9000000),
            },
          ];
        } else {
          reciepient.transactions.unshift({
            sender: authCtx.currentUser.fname + " " + authCtx.currentUser.lname,
            time: new Date().toLocaleTimeString(),
            date: new Date().toDateString(),
            amount: `+${amountInput}`,
            status: "green",
            id: Math.floor(1000000 + Math.random() * 9000000),
          });
        }

        if (authCtx.currentUser.transactions === undefined) {
          authCtx.currentUser.transactions = [
            {
              sender: "Spend + Save",
              time: new Date().toLocaleTimeString(),
              date: new Date().toDateString(),
              amount: `${percent}`,
              status: "red",
              id: Math.floor(1000000 + Math.random() * 9000000),
            },

            {
              sender: reciepient.fname + " " + reciepient.lname,
              time: new Date().toLocaleTimeString(),
              date: new Date().toDateString(),
              amount: `${amountInput}`,
              status: "red",
              id: Math.floor(1000000 + Math.random() * 9000000),
            },
          ];
        } else {
          authCtx.currentUser.transactions.unshift({
            sender: reciepient.fname + " " + reciepient.lname,
            time: new Date().toLocaleTimeString(),
            date: new Date().toDateString(),
            amount: `${amountInput}`,
            status: "red",
            id: Math.floor(1000000 + Math.random() * 9000000),
          });

          authCtx.currentUser.transactions.unshift({
            sender: "Spend + Save",
            time: new Date().toLocaleTimeString(),
            date: new Date().toDateString(),
            amount: `${percent}`,
            status: "red",
            id: Math.floor(1000000 + Math.random() * 9000000),
          });
        }

        await axios.put(
          "https://skybank-56868-default-rtdb.firebaseio.com/users.json",
          authCtx.users
        );

        authCtx.updateUsers();

        Alert.alert("Payment successful", "Your Transaction has gone through");
        setAccNumberInput("");
        setAmountInput("");

        // console.log(authCtx.currentUser.transactions);
        // console.log(reciepient.transactions);
      } else {
        Alert.alert(
          "Invalid user",
          "No reciepient was found with this account number"
        );
      }
    } catch (error) {
      Alert.alert(
        "Somthing went wrong",
        "Please check your internet connection and try again"
      );
      console.log(error);
    }

    setLoading(false);
    authCtx.updateUsers();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        keyboardType="phone-pad"
        style={styles.input}
        placeholderTextColor="dimgrey"
        placeholder="Enter Amount"
        value={amountInput}
        onChangeText={amountInputChangeHandler}
      />
      <Text style={styles.label}>Account Number</Text>
      <TextInput
        maxLength={10}
        keyboardType="phone-pad"
        style={styles.input}
        placeholderTextColor="dimgrey"
        placeholder="Enter Account Number"
        value={accNumberInput}
        onChangeText={accNumberInputChangeHandler}
      />

      <View style={styles.buttonContainer}>
        {loading && <ActivityIndicator size={40} />}
        <Pressable
          onPress={sendMoney}
          android_ripple={{ color: colors.orange }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Make Payment</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MakePayment;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
  },

  label: {
    color: "#fff",
    marginBottom: 5,
  },

  input: {
    height: 50,
    backgroundColor: colors.lightGrey,
    marginBottom: 10,
    fontSize: 16,
    paddingLeft: 12,
    borderRadius: 5,
    color: "#fff",
  },

  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },

  button: {
    height: 50,
    borderRadius: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
