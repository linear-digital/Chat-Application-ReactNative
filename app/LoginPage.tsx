import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "expo-router";

interface LoginProps {
  navigation: any; // Adjust based on your navigation setup
}

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigation: any = useNavigation();
  const handleLogin = async () => {
    navigation.replace("(message)");
    // if (!email || !password) {
    //   Alert.alert("Error", "Please fill in both fields.");
    //   return;
    // }

    // try {
    //   setLoading(true);
    //   const response = await axios.post("https://your-api-endpoint.com/login", {
    //     email,
    //     password,
    //   });

    //   setLoading(false);

    //   // Assuming the API returns a token on successful login
    //   if (response.status === 200) {
    //     const { token, user } = response.data;

    //     // Save token to secure storage (optional) and navigate to the home screen
    //     Alert.alert("Success", "Login successful!");
    //     navigation.replace("Home"); // Adjust navigation if needed
    //   } else {
    //     Alert.alert("Error", "Invalid credentials.");
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   Alert.alert("Error", "Something went wrong. Please try again.");
    //   console.error(error);
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={loading}
      />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate("Register")} // Navigate to registration page
      >
        Don't have an account? Sign up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  link: {
    marginTop: 15,
    color: "#007bff",
    textAlign: "center",
  },
});
