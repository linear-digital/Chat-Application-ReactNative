import { ThemedText } from "@/components/ThemedText";
import { useAuthContext } from "@/context/AuthContext";
import { Link, useNavigation, useRouter } from "expo-router";

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import io, { Socket } from "socket.io-client";

// Define the type for message objects
interface Message {
  text: string;
}

const socket: Socket = io("https://8dcf-103-135-175-162.ngrok-free.app"); // Replace with your server address

export default function MessagePage() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const listRef = React.useRef<FlatList>(null);
  const { token } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/(auth)");
    }
  }, [token]);
  useEffect(() => {
    // Listen for incoming messages
    socket.on("receiveMessage", (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receiveMessage");
    };
  }, []);
  useEffect(() => {
    // Automatically scroll to the bottom when a new message is received
    if (listRef.current) {
      listRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const data: Message = { text: message };
      socket.emit("sendMessage", data); // Send message to server
      setMessage(""); // Clear input
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        ref={listRef}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          onKeyPress={(e) => {
            if (e.nativeEvent.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  message: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#d9f9b1",
    borderRadius: 5,
  },
  inputContainer: { flexDirection: "row", alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});
