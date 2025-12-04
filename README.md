# MoneyCoach - AI-Powered Personal Finance App

A demo personal finance tracking app with AI-powered insights, built with React Native and Expo for hackathon submission.

## Features

- **Demo Mode**: Start instantly with guest access - no sign up required
- **Expense Tracking**: Add expenses with amount, category, and notes
- **Dashboard**: View total spending and expense history
- **AI Insights**: Smart financial tips based on your spending patterns
- **Clean UI**: Simple, intuitive interface focused on quick expense entry

## Tech Stack

- React Native (TypeScript)
- Expo SDK 54
- React Navigation 7
- Redux Toolkit (State Management)

## Running the App

### Development (Expo Go)

```bash
npm run dev
```

Scan the QR code with Expo Go app on your phone.

### Web Preview

```bash
npm run web
```

---

## Building Android APK

### Option 1: Using EAS Build (Recommended)

EAS (Expo Application Services) is the official way to build standalone apps.

#### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

#### Step 2: Login to Expo

```bash
eas login
```

Create a free account at https://expo.dev if you don't have one.

#### Step 3: Configure EAS Build

```bash
eas build:configure
```

This creates an `eas.json` file. For APK (not AAB), update it:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

#### Step 4: Build the APK

```bash
eas build -p android --profile preview
```

The build runs on Expo's servers. When complete, you'll get a download link for your APK.

---

### Option 2: Local Development Build

If you want to build locally on your machine:

#### Prerequisites

1. Install Android Studio: https://developer.android.com/studio
2. Set up Android SDK and accept licenses
3. Add Android SDK to your PATH

#### Steps

```bash
# Generate native Android project
npx expo prebuild --platform android

# Navigate to android folder
cd android

# Build debug APK
./gradlew assembleDebug

# OR build release APK
./gradlew assembleRelease
```

The APK will be at:
- Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release: `android/app/build/outputs/apk/release/app-release.apk`

---

### Option 3: Expo Go (Testing Only)

For testing on physical devices without building:

1. Install "Expo Go" from Play Store
2. Run `npm run dev`
3. Scan the QR code with Expo Go

Note: Expo Go is for development only, not for distribution.

---

## Quick Build Summary

| Method | Time | Where it builds | Output |
|--------|------|-----------------|--------|
| EAS Build | ~15 min | Expo servers | Download link |
| Local Build | ~5-10 min | Your machine | APK file |
| Expo Go | Instant | N/A | Testing only |

## Project Structure

```
├── App.tsx                 # Root component with providers
├── store/
│   ├── index.ts            # Redux store configuration
│   ├── authSlice.ts        # Authentication state
│   ├── expensesSlice.ts    # Expenses state
│   └── insightsSlice.ts    # AI insights state
├── hooks/
│   ├── useAuth.ts          # Authentication hook
│   ├── useExpenses.ts      # Expenses CRUD hook
│   └── useTheme.ts         # Theme hook
├── utils/
│   └── mockAI.ts           # Mock AI insight generator
├── navigation/
│   ├── RootNavigator.tsx   # Auth/Main navigation
│   └── MainTabNavigator.tsx # Bottom tab navigation
├── screens/
│   ├── SignInScreen.tsx    # Welcome/demo screen
│   ├── HomeScreen.tsx      # Dashboard with expenses
│   ├── AddExpenseScreen.tsx # Add expense form
│   └── InsightsScreen.tsx  # AI insights list
└── components/
    ├── ExpenseItem.tsx     # Expense list item
    ├── InsightCard.tsx     # AI insight card
    └── ...                 # Shared UI components
```

## Expense Categories

- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Other

## Notes

- This is a demo app - data is stored locally and resets on app restart
- Mock AI is used for insights (no external API required)
- Built for hackathon demonstration purposes

## License

MIT
