import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, CategoryIcons } from "@/constants/theme";
import { Expense } from "@/store/expensesSlice";

interface ExpenseItemProps {
  expense: Expense;
  onPress?: () => void;
}

export function ExpenseItem({ expense, onPress }: ExpenseItemProps) {
  const { theme } = useTheme();

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const iconName = CategoryIcons[expense.category] || "more-horizontal";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: theme.backgroundDefault, opacity: pressed ? 0.95 : 1 },
      ]}
    >
      <View
        style={[styles.iconContainer, { backgroundColor: theme.backgroundSecondary }]}
      >
        <Feather name={iconName as any} size={20} color={theme.text} />
      </View>

      <View style={styles.content}>
        <ThemedText type="body" style={styles.category} numberOfLines={1}>
          {expense.category}
        </ThemedText>
        {expense.note ? (
          <ThemedText
            type="small"
            style={[styles.note, { color: theme.textSecondary }]}
            numberOfLines={1}
          >
            {expense.note}
          </ThemedText>
        ) : null}
      </View>

      <View style={styles.amountContainer}>
        <ThemedText type="body" style={[styles.amount, { color: theme.error }]}>
          -{formatCurrency(expense.amount)}
        </ThemedText>
        <ThemedText
          type="small"
          style={[styles.date, { color: theme.textSecondary }]}
        >
          {formatDate(expense.createdAt)}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
    marginRight: Spacing.md,
  },
  category: {
    fontWeight: "500",
    marginBottom: 2,
  },
  note: {
    opacity: 0.7,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontWeight: "600",
    marginBottom: 2,
  },
  date: {
    opacity: 0.7,
  },
});
