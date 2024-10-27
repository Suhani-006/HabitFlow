import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Create = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [repeatMode, setRepeatMode] = useState("daily");
  const [selectedDays, setSelectedDays] = useState([]);

  const colors = [
    "#FF5733",
    "#FFD700",
    "#5D76A9",
    "#1877F2",
    "#32CD32",
    "#CCCCFF",
    "#4169E1",
  ];
  const days = ["M", "Tue", "W", "Thu", "F", "Sat", "Sun"];

  const toggleDaySelection = (day) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  async function addHabit() {
    try {
      const habitDetails = {
        title: title,
        color: selectedColor,
        repeatMode: repeatMode,
        reminder: true,
      };

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        habitDetails
      );
      console.log("Response status:", response.status);

      if (response.status === 201) {
        setTitle("");
        setSelectedColor("");
        Alert.alert("Habit added successfully", "Enjoy Practising");
      }
    } catch (error) {
      console.error("Error adding habit:", error);
      Alert.alert("Error", "Could not add habit. Please try again.");
    }
  }

  return (
    <View style={{ padding: 10 }}>
      <Ionicons
        name="arrow-back"
        size={24}
        color="black"
        onPress={() => navigation.goBack()} // Navigate back on press
      />

      <Text style={{ fontSize: 20, marginTop: 10 }}>
        Create <Text style={{ fontSize: 20, fontWeight: "500" }}>Habit</Text>
      </Text>

      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
        placeholder="Title"
      />

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>Color</Text>
        <View style={styles.colorContainer}>
          {colors.map((item, index) => (
            <TouchableOpacity
              onPress={() => setSelectedColor(item)}
              key={index}
              activeOpacity={0.8}
            >
              {selectedColor === item ? (
                <AntDesign name="plussquare" size={30} color={item} />
              ) : (
                <FontAwesome name="square" size={30} color={item} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "500" }}>Repeat</Text>
      <View style={styles.repeatContainer}>
        <Pressable
          style={[
            styles.repeatButton,
            repeatMode === "daily" && styles.activeButton,
          ]}
          onPress={() => setRepeatMode("daily")}
        >
          <Text style={{ textAlign: "center" }}>Daily</Text>
        </Pressable>
        <Pressable
          style={[
            styles.repeatButton,
            repeatMode === "weekly" && styles.activeButton,
          ]}
          onPress={() => setRepeatMode("weekly")}
        >
          <Text style={{ textAlign: "center" }}>Weekly</Text>
        </Pressable>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "500" }}>On these days</Text>
      <View style={styles.daysContainer}>
        {days.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => toggleDaySelection(item)}
            style={[
              styles.dayButton,
              selectedDays.includes(item) && styles.selectedDay,
            ]}
          >
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.reminderContainer}>
        <Text style={{ fontSize: 17, fontWeight: "500" }}>Reminder</Text>
        <Text style={{ fontSize: 17, fontWeight: "500", color: "#2774AE" }}>
          Yes
        </Text>
      </View>

      <TouchableOpacity onPress={addHabit} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  input: {
    width: "95%",
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#E1EBEE",
  },
  colorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  repeatContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  repeatButton: {
    backgroundColor: "#AFDBF5",
    padding: 10,
    borderRadius: 6,
    flex: 1,
  },
  activeButton: {
    backgroundColor: "#00428c",
  },
  daysContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDay: {
    backgroundColor: "#00428c",
    color: "white",
  },
  reminderContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  saveButton: {
    marginTop: 25,
    backgroundColor: "#00428c",
    padding: 10,
    borderRadius: 8,
  },
  saveButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
