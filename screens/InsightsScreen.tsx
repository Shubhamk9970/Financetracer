import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { InsightCard } from "@/components/InsightCard";
import { useTheme } from "@/hooks/useTheme";
import { RootState } from "@/store";
import { AIInsight } from "@/utils/mockAI";
import { Spacing } from "@/constants/theme";

export default function InsightsScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();
  const { items: insights } = useSelector(
    (state: RootState) => state.insights
  );

  const renderInsight = ({ item }: { item: AIInsight }) => (
    <InsightCard insight={item} />
  );

  const ListHeader = () => (
    <View style={styles.header}>
      <ThemedText type="h3">AI Insights</ThemedText>
      <ThemedText
        type="body"
        style={[styles.subtitle, { color: theme.textSecondary }]}
      >
        Smart tips based on your spending
      </ThemedText>
    </View>
  );

  const ListEmpty = () => (
    <View style={styles.emptyContainer}>
      <View
        style={[styles.emptyIconContainer, { backgroundColor: `${theme.accent}15` }]}
      >
        <Feather name="zap" size={32} color={theme.accent} />
      </View>
      <ThemedText
        type="body"
        style={[styles.emptyText, { color: theme.textSecondary }]}
      >
        No insights yet
      </ThemedText>
      <ThemedText
        type="small"
        style={[styles.emptySubtext, { color: theme.textSecondary }]}
      >
        Add some expenses to get personalized AI insights
      </ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={insights}
        renderItem={renderInsight}
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
  listContent: {
    paddingHorizontal: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  subtitle: {
    marginTop: Spacing.xs,
  },
  separator: {
    height: Spacing.md,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: Spacing["4xl"],
  },
  emptyIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  emptyText: {
    marginBottom: Spacing.xs,
  },
  emptySubtext: {
    textAlign: "center",
    opacity: 0.7,
  },
});
