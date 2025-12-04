# MoneyCoach - AI-Powered Personal Finance App

## Overview

MoneyCoach is a minimal MVP personal finance tracking application built for hackathon submission. It features Firebase authentication, real-time expense tracking with Firestore, and mock AI-powered spending insights.

## Current State

**Version:** 1.0.0 (MVP)
**Status:** Ready for demo

### Implemented Features:
- Email/password authentication (Firebase Auth)
- Add expenses with amount, category, and notes
- Real-time expense sync (Firestore)
- Dashboard with total monthly spending
- Mock AI insights based on spending patterns
- Bottom tab navigation

### Tech Stack:
- React Native with Expo SDK 54
- TypeScript
- React Navigation 7
- Redux Toolkit
- Firebase (Auth + Firestore)

## Project Architecture

```
├── App.tsx                 # Root with providers (Redux, Navigation)
├── config/
│   └── firebase.ts         # Firebase SDK initialization
├── store/
│   ├── index.ts            # Redux store
│   ├── authSlice.ts        # Authentication state
│   ├── expensesSlice.ts    # Expenses state
│   └── insightsSlice.ts    # AI insights state
├── hooks/
│   ├── useAuth.ts          # Auth operations hook
│   ├── useExpenses.ts      # CRUD + Firestore sync
│   └── useTheme.ts         # Theme provider
├── utils/
│   └── mockAI.ts           # Mock AI insight generator
├── navigation/
│   ├── RootNavigator.tsx   # Auth/Main switching
│   └── MainTabNavigator.tsx # Bottom tabs
├── screens/
│   ├── SignInScreen.tsx
│   ├── SignUpScreen.tsx
│   ├── HomeScreen.tsx      # Dashboard
│   ├── AddExpenseScreen.tsx
│   └── InsightsScreen.tsx
└── components/
    ├── ExpenseItem.tsx
    ├── InsightCard.tsx
    └── [shared UI components]
```

## Recent Changes

**December 4, 2025:**
- Initial MVP build
- Firebase Auth integration
- Firestore expense storage
- Mock AI insights system
- Bottom tab navigation
- Clean UI with green/blue color scheme

## User Preferences

- Clean, minimal UI
- No animations (hackathon speed priority)
- Focus on core features only
- Quick expense entry workflow

## Environment Variables Required

```
EXPO_PUBLIC_FIREBASE_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID
```

## Running the App

1. Set up Firebase project with Email/Password auth enabled
2. Create Firestore database
3. Add environment variables
4. Run `npm run dev`

## Category Icons (Feather)

- Food & Dining: coffee
- Transportation: truck
- Shopping: shopping-bag
- Entertainment: tv
- Bills & Utilities: file-text
- Other: more-horizontal
