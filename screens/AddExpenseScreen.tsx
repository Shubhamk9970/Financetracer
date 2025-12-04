import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Modal,
  FlatList,
  ScrollView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import {
  KeyboardAwareScrollView,
} from "react-native-keyboard-controller";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { useExpenses } from "@/hooks/useExpenses";
import { Spacing, BorderRadius, Categories, CategoryIcons } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootNavigator";

export default function AddExpenseScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { createExpense } = useExpenses();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(Categories[0]);
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const handleAmountChange = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) return;
    if (parts[1] && parts[1].length > 2) return;
    setAmount(cleaned);
  };

  const handleSave = async () => {
    setError(null);

    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    try {
      await createExpense(numAmount, category, note.trim());
      navigation.goBack();
    } catch (err) {
      setError("Failed to save expense. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderCategoryItem = ({ item }: { item: string }) => (
    <Pressable
      onPress={() => {
        setCategory(item);
        setShowCategoryPicker(false);
      }}
      style={({ pressed }) => [
        styles.categoryItem,
        {
          backgroundColor:
            category === item ? `${theme.primary}20` : theme.backgroundDefault,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.categoryItemContent}>
        <View
          style={[
            styles.categoryIcon,
            { backgroundColor: theme.backgroundSecondary },
          ]}
        >
          <Feather
            name={CategoryIcons[item] as any}
            size={20}
            color={category === item ? theme.primary : theme.text}
          />
        </View>
        <ThemedText
          type="body"
          style={[
            styles.categoryItemText,
            { color: category === item ? theme.primary : theme.text },
          ]}
        >
          {item}
        </ThemedText>
      </View>
      {category === item ? (
        <Feather name="check" size={20} color={theme.primary} />
      ) : null}
    </Pressable>
  );

  const content = (
    <View
      style={[
        styles.scrollContent,
        {
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: insets.bottom + Spacing["2xl"],
        },
      ]}
    >
      {error ? (
        <View
          style={[
            styles.errorContainer,
            { backgroundColor: `${theme.error}15` },
          ]}
        >
          <ThemedText style={[styles.errorText, { color: theme.error }]}>
            {error}
          </ThemedText>
        </View>
      ) : null}

      <View style={styles.amountContainer}>
        <ThemedText
          type="small"
          style={[styles.label, { color: theme.textSecondary }]}
        >
          Amount
        </ThemedText>
        <View style={styles.amountInputWrapper}>
          <ThemedText type="h1" style={styles.currencySymbol}>
            $
          </ThemedText>
          <TextInput
            style={[
              styles.amountInput,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            placeholder="0.00"
            placeholderTextColor={theme.textSecondary}
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
            editable={!isLoading}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <ThemedText
          type="small"
          style={[styles.label, { color: theme.textSecondary }]}
        >
          Category
        </ThemedText>
        <Pressable
          onPress={() => setShowCategoryPicker(true)}
          disabled={isLoading}
          style={({ pressed }) => [
            styles.categorySelector,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <View style={styles.categorySelectorContent}>
            <View
              style={[
                styles.categoryIcon,
                { backgroundColor: theme.backgroundSecondary },
              ]}
            >
              <Feather
                name={CategoryIcons[category] as any}
                size={18}
                color={theme.text}
              />
            </View>
            <ThemedText type="body">{category}</ThemedText>
          </View>
          <Feather name="chevron-down" size={20} color={theme.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.inputContainer}>
        <ThemedText
          type="small"
          style={[styles.label, { color: theme.textSecondary }]}
        >
          Note (optional)
        </ThemedText>
        <TextInput
          style={[
            styles.noteInput,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              color: theme.text,
            },
          ]}
          placeholder="Add a note..."
          placeholderTextColor={theme.textSecondary}
          value={note}
          onChangeText={setNote}
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          editable={!isLoading}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={handleSave}
          disabled={isLoading}
          style={[styles.saveButton, { backgroundColor: theme.primary }]}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            "Save Expense"
          )}
        </Button>

        <Pressable
          onPress={() => navigation.goBack()}
          disabled={isLoading}
          style={({ pressed }) => [
            styles.cancelButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <ThemedText
            type="body"
            style={[styles.cancelText, { color: theme.textSecondary }]}
          >
            Cancel
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );

  const scrollViewComponent =
    Platform.OS === "web" ? (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {content}
      </ScrollView>
    ) : (
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {content}
      </KeyboardAwareScrollView>
    );

  return (
    <ThemedView style={styles.container}>
      {scrollViewComponent}

      <Modal
        visible={showCategoryPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCategoryPicker(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowCategoryPicker(false)}
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.backgroundRoot },
            ]}
          >
            <View style={styles.modalHeader}>
              <ThemedText type="h4">Select Category</ThemedText>
              <Pressable
                onPress={() => setShowCategoryPicker(false)}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              >
                <Feather name="x" size={24} color={theme.text} />
              </Pressable>
            </View>
            <FlatList
              data={Categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item}
              ItemSeparatorComponent={() => (
                <View
                  style={[styles.separator, { backgroundColor: theme.border }]}
                />
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
  },
  errorContainer: {
    padding: Spacing.md,
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.lg,
  },
  errorText: {
    fontSize: 14,
    textAlign: "center",
  },
  amountContainer: {
    marginBottom: Spacing["2xl"],
  },
  label: {
    marginBottom: Spacing.sm,
    fontWeight: "500",
  },
  amountInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencySymbol: {
    marginRight: Spacing.sm,
  },
  amountInput: {
    flex: 1,
    height: 64,
    borderWidth: 1,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.lg,
    fontSize: 32,
    fontWeight: "600",
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  categorySelector: {
    height: Spacing.inputHeight,
    borderWidth: 1,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categorySelectorContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  noteInput: {
    height: 100,
    borderWidth: 1,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: Spacing.xl,
  },
  saveButton: {
    borderRadius: BorderRadius.xs,
  },
  cancelButton: {
    alignItems: "center",
    paddingVertical: Spacing.lg,
  },
  cancelText: {
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(128, 128, 128, 0.2)",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
  },
  categoryItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryItemText: {
    marginLeft: Spacing.sm,
  },
  separator: {
    height: 1,
  },
});
