import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, CategoryIcons } from "@/constants/theme";
import { AIInsight } from "@/utils/mockAI";

interface InsightCardProps {
  insight: AIInsight;
}

export function InsightCard({ insight }: InsightCardProps) {
  const { theme } = useTheme();

  const getTypeColor = () => {
    switch (insight.type) {
      case "warning":
        return theme.error;
      case "tip":
        return theme.primary;
      case "info":
      default:
        return theme.accent;
    }
  };

  const getTypeIcon = (): keyof typeof Feather.glyphMap => {
    switch (insight.type) {
      case "warning":
        return "alert-triangle";
      case "tip":
        return "thumbs-up";
      case "info":
      default:
        return "info";
    }
  };

  const typeColor = getTypeColor();
  const categoryIcon = insight.category
    ? CategoryIcons[insight.category] || "tag"
    : null;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundDefault,
          borderLeftColor: typeColor,
        },
      ]}
    >
      <View style={styles.header}>
        <View
          style={[styles.iconContainer, { backgroundColor: `${typeColor}15` }]}
        >
          <Feather name={getTypeIcon()} size={18} color={typeColor} />
        </View>
        <View
          style={[styles.badge, { backgroundColor: `${typeColor}15` }]}
        >
          <ThemedText
            type="small"
            style={[styles.badgeText, { color: typeColor }]}
          >
            AI Insight
          </ThemedText>
        </View>
      </View>

      <ThemedText type="body" style={styles.message}>
        {insight.message}
      </ThemedText>

      {insight.category ? (
        <View style={styles.categoryContainer}>
          <Feather
            name={categoryIcon as any}
            size={14}
            color={theme.textSecondary}
          />
          <ThemedText
            type="small"
            style={[styles.categoryText, { color: theme.textSecondary }]}
          >
            {insight.category}
          </ThemedText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  message: {
    marginBottom: Spacing.sm,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xs,
  },
  categoryText: {
    marginLeft: Spacing.xs,
    opacity: 0.7,
  },
});
