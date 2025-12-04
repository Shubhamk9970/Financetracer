import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  KeyboardAwareScrollView,
} from "react-native-keyboard-controller";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { Spacing, BorderRadius } from "@/constants/theme";

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const { continueAsGuest } = useAuth();

  const content = (
    <View
      style={[
        styles.scrollContent,
        {
          paddingTop: insets.top + Spacing["3xl"],
          paddingBottom: insets.bottom + Spacing["2xl"],
        },
      ]}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <ThemedText type="h1" style={styles.title}>
          MoneyCoach
        </ThemedText>
        <ThemedText
          type="body"
          style={[styles.subtitle, { color: theme.textSecondary }]}
        >
          Your AI-powered finance assistant
        </ThemedText>
      </View>

      <View style={styles.form}>
        <View
          style={[
            styles.demoContainer,
            { backgroundColor: `${theme.primary}10` },
          ]}
        >
          <ThemedText style={[styles.demoTitle, { color: theme.primary }]}>
            Demo Mode
          </ThemedText>
          <ThemedText style={[styles.demoText, { color: theme.textSecondary }]}>
            This is a demo app for hackathon submission. Tap below to explore all features with sample data.
          </ThemedText>
        </View>

        <Button
          onPress={continueAsGuest}
          style={[styles.button, { backgroundColor: theme.primary }]}
        >
          Continue as Guest
        </Button>

        <View style={styles.featuresContainer}>
          <ThemedText type="h4" style={styles.featuresTitle}>
            Features
          </ThemedText>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: theme.primary }]} />
            <ThemedText style={{ color: theme.textSecondary }}>
              Track your daily expenses
            </ThemedText>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: theme.primary }]} />
            <ThemedText style={{ color: theme.textSecondary }}>
              Categorize spending by type
            </ThemedText>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: theme.primary }]} />
            <ThemedText style={{ color: theme.textSecondary }}>
              Get AI-powered financial insights
            </ThemedText>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.featureDot, { backgroundColor: theme.primary }]} />
            <ThemedText style={{ color: theme.textSecondary }}>
              View dashboard with spending summary
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );

  if (Platform.OS === "web") {
    return (
      <ThemedView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          {content}
        </ScrollView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {content}
      </KeyboardAwareScrollView>
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
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing["3xl"],
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: Spacing.lg,
  },
  title: {
    marginBottom: Spacing.sm,
  },
  subtitle: {
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  demoContainer: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xl,
    alignItems: "center",
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: Spacing.sm,
  },
  demoText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  button: {
    borderRadius: BorderRadius.xs,
  },
  featuresContainer: {
    marginTop: Spacing["3xl"],
  },
  featuresTitle: {
    marginBottom: Spacing.lg,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.md,
  },
});
