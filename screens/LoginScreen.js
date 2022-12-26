import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  Dimensions,
  Button,
} from "react-native";
import { colors } from "../constants/colors";
import { authenticate } from "../http/http";
import { AuthContext } from "../store/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);

  const loginHandler = async () => {
    if (emailInput.length < 5 && passwordInput.length === 0) {
      Alert.alert(
        "Invalid input",
        "Provide a valid email and Password cannot be empty"
      );
      return;
    }

    if (emailInput.length < 5) {
      Alert.alert("Email error", "Provide a valid email");
      return;
    }

    if (passwordInput.length === 0) {
      Alert.alert("Password error", "Password cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const token = await authenticate(
        "signInWithPassword",
        emailInput,
        passwordInput
      );
      await AsyncStorage.setItem("TOKEN", token);
      await AsyncStorage.setItem("USEREMAIL", emailInput);
      authCtx.loginHandler(token);
      authCtx.getCurrentUserHandler(emailInput);
    } catch (error) {
      Alert.alert(
        "Login Failed",
        "Kindly check your credentials and your internet connection"
      );
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView keyboardVerticalOffset={100} behavior="padding">
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            onChangeText={(enteredText) => setEmailInput(enteredText.trim())}
            value={emailInput}
            placeholderTextColor="dimgrey"
            placeholder="youremail@here.com"
            autoCapitalize={"none"}
            autoCorrect={false}
            textContentType="emailAddress"
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            onChangeText={(enteredText) => setPasswordInput(enteredText.trim())}
            value={passwordInput}
            placeholderTextColor="dimgrey"
            placeholder={"Enter password"}
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

      {loading && <ActivityIndicator color={colors.orange} size={40} />}

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={loginHandler}
          android_ripple={{ color: colors.lightGrey }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },

  label: {
    color: "#fff",
  },

  input: {
    height: height > 600 ? 65 : 50,
    backgroundColor: colors.lightGrey,
    color: "#fff",
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 17,
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
