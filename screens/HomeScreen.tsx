import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ExpenseItem } from "@/components/ExpenseItem";
import { useTheme } from "@/hooks/useTheme";
import { useExpenses } from "@/hooks/useExpenses";
import { useAuth } from "@/hooks/useAuth";
import { Spacing, BorderRadius } from "@/constants/theme";
import { Expense } from "@/store/expensesSlice";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const { expenses, isLoading, thisMonthTotal } = useExpenses();
  const { logOut } = useAuth();

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const renderExpense = ({ item }: { item: Expense }) => (
    <ExpenseItem expense={item} />
  );

  const ListHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.headerTitleRow}>
          <ThemedText type="h3">MoneyCoach</ThemedText>
        </View>
        <Pressable
          onPress={logOut}
          style={({ pressed }) => [
            styles.logoutButton,
            {
              backgroundColor: theme.backgroundSecondary,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Feather name="log-out" size={18} color={theme.text} />
        </Pressable>
      </View>

      <View
        style={[styles.summaryCard, { backgroundColor: theme.backgroundDefault }]}
      >
        <ThemedText
          type="small"
          style={[styles.summaryLabel, { color: theme.textSecondary }]}
        >
          Total Spent This Month
        </ThemedText>
        <ThemedText type="h1" style={[styles.summaryAmount, { color: theme.primary }]}>
          {formatCurrency(thisMonthTotal)}
        </ThemedText>
        <View style={styles.summaryMeta}>
          <Feather name="calendar" size={14} color={theme.textSecondary} />
          <ThemedText
            type="small"
            style={[styles.summaryPeriod, { color: theme.textSecondary }]}
          >
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </ThemedText>
        </View>
      </View>

      <ThemedText type="h4" style={styles.sectionTitle}>
        Recent Expenses
      </ThemedText>
    </View>
  );

  const ListEmpty = () => (
    <View style={styles.emptyContainer}>
      <Feather
        name="inbox"
        size={48}
        color={theme.textSecondary}
        style={styles.emptyIcon}
      />
      <ThemedText
        type="body"
        style={[styles.emptyText, { color: theme.textSecondary }]}
      >
        No expenses yet
      </ThemedText>
      <ThemedText
        type="small"
        style={[styles.emptySubtext, { color: theme.textSecondary }]}
      >
        Tap the + button to add your first expense
      </ThemedText>
    </View>
  );

  if (isLoading && expenses.length === 0) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={renderExpense}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingTop: insets.top + Spacing.lg,
            paddingBottom: tabBarHeight + Spacing.xl,
          },
        ]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingHorizontal: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xl,
  },
  summaryLabel: {
    marginBottom: Spacing.xs,
  },
  summaryAmount: {
    marginBottom: Spacing.sm,
  },
  summaryMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryPeriod: {
    marginLeft: Spacing.xs,
  },
  sectionTitle: {
    marginBottom: Spacing.md,
  },
  separator: {
    height: Spacing.sm,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: Spacing["4xl"],
  },
  emptyIcon: {
    marginBottom: Spacing.lg,
    opacity: 0.5,
  },
  emptyText: {
    marginBottom: Spacing.xs,
  },
  emptySubtext: {
    textAlign: "center",
    opacity: 0.7,
  },
});
