import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const { signIn, isLoading, error, isFirebaseConfigured } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLocalError(null);
    if (!email.trim() || !password.trim()) {
      setLocalError("Please enter email and password");
      return;
    }
    try {
      await signIn(email.trim(), password);
    } catch {
    }
  };

  const displayError = localError || error;

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
        {!isFirebaseConfigured ? (
          <View
            style={[
              styles.errorContainer,
              { backgroundColor: `${theme.accent}15` },
            ]}
          >
            <ThemedText style={[styles.configText, { color: theme.accent }]}>
              Firebase not configured. Add your Firebase credentials to .env file to
              enable authentication.
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
            placeholder="Enter your password"
            placeholderTextColor={theme.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading && isFirebaseConfigured}
          />
        </View>

        <Button
          onPress={handleSignIn}
          disabled={isLoading || !isFirebaseConfigured}
          style={[styles.button, { backgroundColor: theme.primary }]}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            "Sign In"
          )}
        </Button>

        <Pressable
          onPress={() => navigation.navigate("SignUp")}
          disabled={isLoading}
          style={({ pressed }) => [
            styles.linkContainer,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <ThemedText style={{ color: theme.textSecondary }}>
            Don't have an account?{" "}
          </ThemedText>
          <ThemedText style={{ color: theme.accent, fontWeight: "600" }}>
            Sign Up
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
  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing["4xl"],
  },
  logo: {
    width: 80,
    height: 80,
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
