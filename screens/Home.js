import { Pressable, StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Spend from "../components/homeScreen/Spend";
import Save from "../components/homeScreen/Save";
import Borrow from "../components/homeScreen/Borrow";
import { colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../store/auth";

const Tab = createMaterialTopTabNavigator();

const Home = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const currentUser = authCtx.currentUser;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Pressable
            onPress={() => {
              navigation.navigate("accountDetails");
            }}
          >
            <Ionicons
              style={{ marginRight: 7 }}
              name="person-circle-outline"
              size={40}
              color="#fff"
            />
          </Pressable>

          <Text style={styles.text}>Hi, {currentUser?.fname}</Text>
        </View>
        <AntDesign name="piechart" size={24} color="#fff" />
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: colors.lightGrey },
          tabBarActiveTintColor: colors.orange,
          tabBarInactiveTintColor: "dimgrey",
        }}
        sceneContainerStyle={{ backgroundColor: colors.darkGrey }}
      >
        <Tab.Screen name="spend" component={Spend} />
        <Tab.Screen name="save" component={Save} />
        <Tab.Screen name="borrow" component={Borrow} />
      </Tab.Navigator>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 16,
  },
});
