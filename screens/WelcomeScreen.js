import React, { useEffect, useRef } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Lottie from "lottie-react-native";
import { colors } from "../constants/colors";

const WelcomeScreen = ({ navigation }) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    lottieRef.current.play();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Sky</Text>

      <View style={styles.lottieContainer}>
        <Lottie
          resizeMode="cover"
          ref={lottieRef}
          source={require("../assets/images/97044-finance-surfer.json")}
        />
      </View>

      <Text style={styles.mainText}>The money app for Africans.</Text>

      <View style={styles.btnsContainer}>
        <Pressable
          onPress={() => navigation.navigate("registerScreen")}
          android_ripple={{ color: colors.orange }}
          style={styles.btnContainer}
        >
          <Text style={styles.btnText}>Open An Account</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("loginScreen")}
          android_ripple={{ color: "dimgrey" }}
          style={[styles.btnContainer, { backgroundColor: colors.lightGrey }]}
        >
          <Text style={styles.btnText}>Already have an account? Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },

  lottieContainer: {
    width: height > 600 ? 300 : 260,
    height: height > 600 ? 300 : 260,
    borderRadius: height > 600 ? 150 : 130,
    backgroundColor: colors.lightGrey,
    overflow: "hidden",
    marginBottom: height > 600 ? "25%" : 20,
  },

  logoText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: height > 600 ? "25%" : 20,
  },

  mainText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  btnsContainer: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },

  btnContainer: {
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 5,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
