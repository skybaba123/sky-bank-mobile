import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  View,
  ScrollView,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import { colors } from "../constants/colors";
// import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../store/auth";
import { authenticate, storeUsers } from "../http/http";

const RegisterScreen = () => {
  const authCtx = useContext(AuthContext);

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [userNameInput, setUserName] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);

  const newUser = {
    fname: firstNameInput,
    lname: lastNameInput,
    userName: userNameInput,
    email: emailInput,
    accNum: "200" + Math.floor(1000000 + Math.random() * 9000000),
    transactions: [],
    password: passwordInput,
    accountBalance: 1000,
    savingBalance: 0,
    owe: 0,
  };

  const emptyForm =
    firstNameInput.trim().length === 0 &&
    lastNameInput.trim().length === 0 &&
    emailInput.trim().length === 0 &&
    passwordInput.trim().length === 0 &&
    userNameInput.trim().length === 0;

  const invalid =
    firstNameInput.trim().length === 0 ||
    lastNameInput.trim().length === 0 ||
    emailInput.trim().length === 0 ||
    userNameInput.trim().length === 0 ||
    passwordInput.trim().length === 0;

  const createNewAccount = async () => {
    if (emptyForm) {
      Alert.alert("Empty Fields", "Fields cannot be empty");
      return;
    }

    if (invalid) {
      Alert.alert("Check", "One or more fields is empty");
      return;
    }

    if (
      emailInput.trim().length < 5 ||
      !emailInput.includes("@") ||
      !emailInput.includes(".") ||
      emailInput.startsWith(".") ||
      emailInput.endsWith(".") ||
      emailInput.startsWith("@") ||
      emailInput.endsWith("@")
    ) {
      Alert.alert("Invalid Email", "Fill in a valid email");
      return;
    }

    if (passwordInput.trim().length < 8) {
      Alert.alert(
        "Invalid Password",
        "Password should be atleast 8 characters"
      );
      return;
    }

    setLoading(true);
    try {
      const token = await authenticate("signUp", emailInput, passwordInput);
      await AsyncStorage.setItem("USEREMAIL", emailInput);
      await AsyncStorage.setItem("TOKEN", token);
      authCtx.newAccountHandler(newUser);
      authCtx.loginHandler(token);
      storeUsers(newUser);
    } catch (error) {
      Alert.alert(
        "Something Went wrong",
        "Check your Information and try again"
      );
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color={colors.orange} size={40} />}
      <ScrollView>
        <KeyboardAvoidingView keyboardVerticalOffset={100} behavior="padding">
          <Text style={styles.label}>First Name</Text>
          <TextInput
            value={firstNameInput}
            onChangeText={(enteredText) => setFirstNameInput(enteredText)}
            placeholderTextColor="dimgrey"
            placeholder="Enter First Name"
            autoCapitalize={"none"}
            autoCorrect={false}
            style={styles.input}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            value={lastNameInput}
            onChangeText={(enteredText) => setLastNameInput(enteredText)}
            placeholderTextColor="dimgrey"
            placeholder="Enter Last Name"
            autoCapitalize={"none"}
            autoCorrect={false}
            style={styles.input}
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            value={emailInput}
            onChangeText={(enteredText) => setEmailInput(enteredText.trim())}
            placeholderTextColor="dimgrey"
            placeholder="youremail@here.com"
            autoCapitalize={"none"}
            autoCorrect={false}
            textContentType="emailAddress"
            style={styles.input}
          />

          <Text style={styles.label}>User Name</Text>
          <TextInput
            value={userNameInput}
            onChangeText={(enteredText) => setUserName(enteredText)}
            placeholderTextColor="dimgrey"
            placeholder="Enter UserName"
            autoCapitalize={"none"}
            autoCorrect={false}
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={passwordInput}
            onChangeText={(enteredText) => setPasswordInput(enteredText)}
            placeholderTextColor="dimgrey"
            placeholder="Enter password"
            autoCapitalize={"none"}
            autoCorrect={false}
            secureTextEntry={hidePass}
            textContentType={"password"}
            style={styles.input}
          />
          <Button
            onPress={() => setHidePass(!hidePass)}
            title="show/hide password"
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={createNewAccount}
          android_ripple={{ color: colors.lightGrey }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },

  label: {
    color: "#fff",
    marginBottom: 2,
  },

  input: {
    height: height > 600 ? 65 : 50,
    backgroundColor: colors.lightGrey,
    color: "#fff",
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 15,
    borderRadius: 5,
  },

  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 5,
    backgroundColor: colors.orange,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
