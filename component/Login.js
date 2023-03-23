import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    View,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { auth } from "../firebase";
  import { useNavigation } from "@react-navigation/native";
  
  const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const navigation = useNavigation();
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate("NavBotton", { screen: "NavBottom" });
        }
      });
      return unsubscribe;
    }, []);
  
    const handleSignUp = () => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Registered in with:", user.email);
        })
        .catch((error) => alert(error.message));
    };
  
    const handleLogin = () => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Logged in with:", user.email);
        })
        .catch((error) => alert(error.message));
    };
  
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
        <Image source={require("../assets/lol.png")} style={styles.imageLogin} />
          <TextInput
            placeholder="Adresse Mail"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Mot de passe"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Connexion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Inscription</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#003882",
    },
    inputContainer: {
      width: "80%",
    },
    input: {
      backgroundColor: "white",
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 10,
    },
    buttonContainer: {
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    button: {
      backgroundColor: "white",
      width: "100%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    buttonOutline: {
      backgroundColor: "white",
      marginTop: 10,
      borderColor: "white",
      borderWidth: 2,
    },
    buttonText: {
      color: "#003882",
      fontWeight: 700,
      fontSize: 16,
    },
    buttonOutlineText: {
      color: "#003882",
      fontWeight: 700,
      fontSize: 16,
    },
    imageLogin: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 5,
    paddingLeft: 320,
    paddingBottom: 300,
      },
  });