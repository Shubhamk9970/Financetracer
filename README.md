# MoneyCoach - AI-Powered Personal Finance App

A minimal MVP personal finance tracking app with AI-powered insights, built with React Native and Firebase.

## Features

- **User Authentication**: Email/password sign up and sign in with Firebase Auth
- **Expense Tracking**: Add expenses with amount, category, and notes
- **Real-time Sync**: Expenses saved to Firestore and synced across devices
- **AI Insights**: Mock AI generates spending insights and tips based on your habits
- **Clean UI**: Simple, intuitive interface focused on quick expense entry

## Tech Stack

- React Native (TypeScript)
- Expo SDK 54
- React Navigation 7
- Redux Toolkit (State Management)
- Firebase Auth (Authentication)
- Firebase Firestore (Database)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select an existing one
3. Add a Web app to get your configuration values
4. Enable **Email/Password** authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password provider
5. Create a **Firestore Database**:
   - Go to Firestore Database
   - Create database in test mode (or set up security rules)

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in your Firebase config:

```bash
cp .env.example .env
```

Edit `.env` with your Firebase values:

```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Firestore Security Rules (Recommended)

For production, update your Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /expenses/{expenseId} {
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null 
        && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

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

## Project Structure

```
├── App.tsx                 # Root component with providers
├── config/
│   └── firebase.ts         # Firebase initialization
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
│   ├── SignInScreen.tsx    # Login screen
│   ├── SignUpScreen.tsx    # Registration screen
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

## Mock AI Insights

The app generates context-aware insights based on:
- Category spending patterns
- Weekly spending totals
- General financial tips

In a production app, replace `utils/mockAI.ts` with actual AI API calls.

## Building for Production

### Android APK

For a standalone APK build, you'll need to:

1. Install EAS CLI: `npm install -g eas-cli`
2. Configure EAS: `eas build:configure`
3. Build APK: `eas build -p android --profile preview`

Or use the classic Expo build:
```bash
expo build:android -t apk
```

## Notes

- This is an MVP built for hackathon demo purposes
- Mock AI is used instead of external API to avoid rate limits
- For production, implement proper error handling and offline support
- Consider adding expense editing/deletion functionality

## License

MIT
