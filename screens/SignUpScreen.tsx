import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  KeyboardAwareScrollView,
} from "react-native-keyboard-controller";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { Spacing, BorderRadius } from "@/constants/theme";
import { RootStackParamList } from "@/navigation/RootNavigator";

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { signUp, isLoading, error, isFirebaseConfigured } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setLocalError(null);

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setLocalError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    try {
      await signUp(email.trim(), password);
    } catch {
    }
  };

  const displayError = localError || error;

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
      <View style={styles.form}>
        <ThemedText type="h2" style={styles.title}>
          Create Account
        </ThemedText>
        <ThemedText
          type="body"
          style={[styles.subtitle, { color: theme.textSecondary }]}
        >
          Start tracking your expenses today
        </ThemedText>

        {!isFirebaseConfigured ? (
          <View
            style={[
              styles.errorContainer,
              { backgroundColor: `${theme.accent}15` },
            ]}
          >
            <ThemedText style={[styles.configText, { color: theme.accent }]}>
              Firebase not configured. Add your Firebase credentials to enable
              account creation.
            </ThemedText>
          </View>
        ) : null}

        {displayError && isFirebaseConfigured ? (
          <View
            style={[
              styles.errorContainer,
              { backgroundColor: `${theme.error}15` },
            ]}
          >
            <ThemedText style={[styles.errorText, { color: theme.error }]}>
              {displayError}
            </ThemedText>
          </View>
        ) : null}

        <View style={styles.inputContainer}>
          <ThemedText
            type="small"
            style={[styles.label, { color: theme.textSecondary }]}
          >
            Email
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            placeholder="Enter your email"
            placeholderTextColor={theme.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading && isFirebaseConfigured}
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText
            type="small"
            style={[styles.label, { color: theme.textSecondary }]}
          >
            Password
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            placeholder="Create a password"
            placeholderTextColor={theme.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading && isFirebaseConfigured}
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText
            type="small"
            style={[styles.label, { color: theme.textSecondary }]}
          >
            Confirm Password
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
              },
            ]}
            placeholder="Confirm your password"
            placeholderTextColor={theme.textSecondary}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!isLoading && isFirebaseConfigured}
          />
        </View>

        <Button
          onPress={handleSignUp}
          disabled={isLoading || !isFirebaseConfigured}
          style={[styles.button, { backgroundColor: theme.primary }]}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            "Create Account"
          )}
        </Button>

        <Pressable
          onPress={() => navigation.goBack()}
          disabled={isLoading}
          style={({ pressed }) => [
            styles.linkContainer,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <ThemedText style={{ color: theme.textSecondary }}>
            Already have an account?{" "}
          </ThemedText>
          <ThemedText style={{ color: theme.accent, fontWeight: "600" }}>
            Sign In
          </ThemedText>
        </Pressable>
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
  form: {
    width: "100%",
  },
  title: {
    marginBottom: Spacing.sm,
  },
  subtitle: {
    marginBottom: Spacing["2xl"],
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
  configText: {
    fontSize: 14,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  label: {
    marginBottom: Spacing.sm,
    fontWeight: "500",
  },
  input: {
    height: Spacing.inputHeight,
    borderWidth: 1,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
  },
  button: {
    marginTop: Spacing.lg,
    borderRadius: BorderRadius.xs,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing["2xl"],
  },
});
