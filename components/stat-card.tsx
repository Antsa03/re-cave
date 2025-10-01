import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CardProps = {
  title: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress?: () => void;
};

/**
 * Composant Card pour afficher des statistiques
 */
export function StatCard({ title, value, icon, color, onPress }: CardProps) {
  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      style={[styles.container, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <Ionicons name={icon} size={24} color="white" />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </Component>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  value: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginTop: 8,
  },
  title: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 4,
  },
});
