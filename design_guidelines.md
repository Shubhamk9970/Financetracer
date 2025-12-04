# MoneyCoach - Design Guidelines

## Architecture Decisions

### Authentication
**Required** - The app uses Firebase email/password authentication.

**Implementation:**
- Email/password sign-in flow (no SSO needed for hackathon MVP)
- Sign In screen with email field, password field, "Sign In" button, and "Create Account" link
- Sign Up screen with email field, password field, confirm password field, and "Create Account" button
- Auto-navigate to Home screen after successful authentication
- Include basic error messages for invalid credentials
- No "Forgot Password" flow needed for MVP
- No profile/settings screen needed for MVP

### Navigation
**Bottom Tab Navigation** - The app has 3 distinct feature areas.

**Structure:**
- Tab 1: Home (Dashboard) - View expenses and total spent
- Tab 2: Add (Floating Action Button style) - Core action
- Tab 3: Insights - View AI-generated spending tips

**Auth Stack:**
- Sign In → Sign Up (navigable via link)
- After auth: Navigate to Tab Navigator

## Screen Specifications

### Sign In Screen
**Purpose:** User enters credentials to access their account

**Layout:**
- No header (full screen)
- Content centered vertically with logo/app name at top
- Form fields stacked with comfortable spacing
- Top inset: `insets.top + Spacing.xl`
- Bottom inset: `insets.bottom + Spacing.xl`

**Components:**
- App logo or "MoneyCoach" title (large, bold)
- Email input field with email keyboard type
- Password input field with secure text entry
- "Sign In" primary button (full-width)
- "Don't have an account? Sign Up" text link below button

### Sign Up Screen
**Purpose:** New user creates an account

**Layout:**
- Default navigation header with back button
- Form centered vertically
- Top inset: `Spacing.xl`
- Bottom inset: `insets.bottom + Spacing.xl`

**Components:**
- Email input field
- Password input field
- Confirm password input field
- "Create Account" primary button (full-width)
- "Already have an account? Sign In" text link

### Home (Dashboard) Screen
**Purpose:** Overview of spending with total and expense list

**Layout:**
- Transparent header with "MoneyCoach" title
- Scrollable content area
- Top inset: `headerHeight + Spacing.xl`
- Bottom inset: `tabBarHeight + Spacing.xl`

**Components:**
- Summary card at top showing:
  - "Total Spent" label
  - Large formatted amount (e.g., "$1,234.56")
  - Period indicator (e.g., "This Month")
- Expense list below:
  - Each expense as a card with category icon, description, amount
  - Sorted by date (most recent first)
- Empty state: "No expenses yet. Tap + to add your first expense."

### Add Expense Screen
**Purpose:** User inputs a new expense

**Layout:**
- Default navigation header with "Add Expense" title and Cancel/Save buttons in header
- Scrollable form content
- Top inset: `Spacing.xl`
- Bottom inset: `tabBarHeight + Spacing.xl`

**Components:**
- Large amount input field at top (numeric keyboard, prominent)
- Category picker/dropdown with options:
  - Food & Dining
  - Transportation
  - Shopping
  - Entertainment
  - Bills & Utilities
  - Other
- Note/description text input (optional, multi-line)
- Header buttons:
  - Left: "Cancel" text button
  - Right: "Save" text button (primary color)

### Insights Screen
**Purpose:** Display AI-generated spending insights

**Layout:**
- Transparent header with "Insights" title
- Scrollable content area
- Top inset: `headerHeight + Spacing.xl`
- Bottom inset: `tabBarHeight + Spacing.xl`

**Components:**
- Insight cards stacked vertically:
  - Card background with subtle border
  - AI icon or indicator at top
  - Insight message text (e.g., "You spent too much on food this week!")
  - Category tag if applicable
- Empty state: "Add some expenses to see insights!"

## Design System

### Color Palette
**Primary Color:** `#4CAF50` (Green - represents money/finance positivity)
**Accent Color:** `#2196F3` (Blue - for highlights and links)
**Error Color:** `#F44336` (Red - for warnings)
**Background:** `#F5F5F5` (Light gray)
**Card Background:** `#FFFFFF` (White)
**Text Primary:** `#212121` (Dark gray)
**Text Secondary:** `#757575` (Medium gray)

### Typography
**Headings:**
- Large Title: 28pt, Bold (Dashboard total)
- Title: 20pt, Semibold (Screen titles)
- Subtitle: 16pt, Medium (Section headers)

**Body:**
- Body: 16pt, Regular (Descriptions, notes)
- Caption: 14pt, Regular (Labels, secondary info)

**Input Fields:**
- Input Text: 16pt, Regular
- Amount Input: 32pt, Bold

### Spacing
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px

### Component Specifications

**Primary Button:**
- Background: Primary color
- Text: White, 16pt, Semibold
- Height: 48px
- Border radius: 8px
- No shadow
- Press state: 80% opacity

**Input Fields:**
- Background: White
- Border: 1px solid `#E0E0E0`
- Border radius: 8px
- Height: 48px
- Padding: 12px horizontal
- Focus state: Border color changes to Primary

**Expense Card:**
- Background: White
- Border radius: 12px
- Padding: 16px
- No shadow (flat design for speed)
- Layout: Row with icon (left), text (center), amount (right)

**Insight Card:**
- Background: White
- Border: 1px solid Accent color
- Border radius: 12px
- Padding: 20px
- No shadow

**Tab Bar:**
- Background: White
- Height: 60px
- Active tab: Primary color
- Inactive tab: Text secondary color
- Icons: Feather icons from @expo/vector-icons
  - Home: "home"
  - Add: "plus-circle" (larger, 36px)
  - Insights: "lightbulb"

### Category Icons
Use Feather icons for expense categories:
- Food & Dining: "coffee"
- Transportation: "truck"
- Shopping: "shopping-bag"
- Entertainment: "tv"
- Bills & Utilities: "file-text"
- Other: "more-horizontal"

### Visual Feedback
- All buttons: 80% opacity on press
- All touchable cards: 95% opacity on press
- No complex animations (hackathon speed priority)
- Form validation: Show error text below invalid fields in Error color

### Assets
**No custom assets required** - Use system icons only for MVP speed.