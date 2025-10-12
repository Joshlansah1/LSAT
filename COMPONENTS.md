# 📚 Component Documentation

A comprehensive guide to all components in Geraudia's LSAT Journey.

---

## 🎨 UI Components (`src/components/ui/`)

### Button

Fully accessible button component with multiple variants and loading states.

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `loading`: boolean
- `disabled`: boolean
- `icon`: React Icon component
- `iconPosition`: 'left' | 'right'
- `onClick`: function
- `ariaLabel`: string

**Example:**

```jsx
import { Button } from "./components/ui";
import { FiSave } from "react-icons/fi";

<Button
  variant="primary"
  size="lg"
  icon={FiSave}
  loading={isLoading}
  onClick={handleSave}
>
  Save Changes
</Button>;
```

---

### Input

Accessible input field with label, error handling, and icon support.

**Props:**

- `label`: string
- `type`: 'text' | 'email' | 'password' | 'number'
- `error`: string (error message)
- `helperText`: string
- `required`: boolean
- `disabled`: boolean
- `fullWidth`: boolean
- `icon`: React Icon component
- `placeholder`: string

**Example:**

```jsx
import { Input } from "./components/ui";
import { FiMail } from "react-icons/fi";

<Input
  label="Email Address"
  type="email"
  icon={FiMail}
  error={errors.email?.message}
  required
  fullWidth
  {...register("email")}
/>;
```

---

### Card

Container component with optional hover effects and padding options.

**Props:**

- `hover`: boolean (enable hover effect)
- `padding`: 'none' | 'sm' | 'normal' | 'lg'
- `onClick`: function
- `ariaLabel`: string

**Example:**

```jsx
import { Card } from "./components/ui";

<Card hover padding="lg">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>;
```

---

### Modal

Accessible modal dialog with backdrop and animations.

**Props:**

- `isOpen`: boolean
- `onClose`: function
- `title`: string
- `footer`: ReactNode
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `closeOnOverlayClick`: boolean
- `showCloseButton`: boolean

**Example:**

```jsx
import { Modal, Button } from "./components/ui";

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <Button onClick={handleConfirm}>Confirm</Button>
      <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
        Cancel
      </Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>;
```

---

### Loading

Loading spinner with optional fullscreen mode.

**Props:**

- `size`: 'sm' | 'md' | 'lg'
- `fullScreen`: boolean
- `message`: string

**Example:**

```jsx
import { Loading } from "./components/ui";

<Loading fullScreen message="Loading your journey..." />;
```

---

## 🔐 Authentication Components (`src/features/auth/`)

### LoginPage

Full login page with form validation.

**Features:**

- Email/password authentication
- Remember me checkbox
- Forgot password link
- Error handling with toast notifications
- Redirect after successful login

---

### SignupPage

User registration page with validation.

**Features:**

- Full name, email, password fields
- Password confirmation
- Terms and conditions checkbox
- Strong password validation
- Automatic login after signup

---

### ProtectedRoute

Route wrapper that requires authentication.

**Usage:**

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

---

## 📊 Dashboard Components (`src/features/dashboard/`)

### StatsGrid

Grid of statistic cards showing key metrics.

**Displays:**

- Current streak
- Total study hours
- Days studied this week
- Average hours per day

---

### StudyCalendar

Interactive calendar highlighting study days.

**Features:**

- Highlights days with logged study sessions
- Shows current month
- Navigation between months
- Responsive design
- Uses react-day-picker

**Props:**

- `studyLogs`: Array of study log objects

---

### WeeklyProgressChart

Bar chart showing study hours for the current week.

**Features:**

- Displays hours per day of week
- Highlights today's bar
- Shows total hours, days studied, average
- Responsive chart
- Uses Recharts library

---

## 📝 Study Log Components (`src/features/logs/`)

### StudyLogForm

Form for logging daily study sessions.

**Fields:**

- Study hours (number input, 0.5 increments)
- Mood selection (emoji buttons)
- Notes (textarea, optional)

**Features:**

- Validation with react-hook-form
- Auto-saves date as today
- Can update existing log
- Loading state during submission

**Props:**

- `onSubmit`: function (receives form data)
- `initialData`: object (for editing existing log)
- `isLoading`: boolean

---

## 🌸 Streak Components (`src/features/streak/`)

### FlowerGrowth

Animated flower visualization representing streak progress.

**Flower Stages:**

- 🌱 Seed (0 days)
- 🌿 Sprout (1-2 days)
- 🌸 Bud (3-6 days)
- 🌺 Bloom (7-29 days)
- 🌻 Garden (30+ days)

**Features:**

- Smooth animations with Framer Motion
- Stage description
- Progress indicator dots
- Sparkle effects for advanced stages

**Props:**

- `streak`: number (current streak count)

---

## 💬 Quote Components (`src/features/quotes/`)

### QuoteCard

Displays motivational quote with refresh option.

**Features:**

- Beautiful card design
- Decorative background patterns
- Quote text and author
- Refresh button for new quote
- Smooth animations on quote change

**Props:**

- `quote`: object { id, text, author }
- `onRefresh`: function
- `showRefreshButton`: boolean

---

## 🎣 Custom Hooks

### useAuth()

Access authentication context.

**Returns:**

```javascript
{
  user,              // Current user object
  profile,           // User profile data
  session,           // Current session
  loading,           // Loading state
  signUp,            // Sign up function
  signIn,            // Sign in function
  signOut,           // Sign out function
  updateProfile,     // Update profile function
  resetPassword,     // Reset password function
  refreshProfile,    // Refresh profile data
}
```

---

### useTheme()

Access theme context.

**Returns:**

```javascript
{
  theme,        // 'light' | 'dark'
  isDark,       // boolean
  toggleTheme,  // Toggle theme function
  setTheme,     // Set specific theme function
}
```

---

### useStudyLogs()

Fetch study logs with React Query.

**Parameters:**

- `startDate`: string (optional, YYYY-MM-DD)
- `endDate`: string (optional, YYYY-MM-DD)

**Returns:**

```javascript
{
  data,         // Array of study logs
  isLoading,    // Loading state
  error,        // Error object
  refetch,      // Manual refetch function
}
```

---

### useStreak()

Calculate and manage streak data.

**Returns:**

```javascript
{
  streak,            // Current streak count
  streakMessage,     // Motivational message
  flowerStage,       // Current flower stage
  totalHours,        // Total study hours
  studyDays,         // Total study days
  averageHours,      // Average hours per day
  hasStudiedToday,   // Boolean
  weekStudyDays,     // Days studied this week
  isLoading,         // Loading state
  error,             // Error object
}
```

---

### useQuotes()

Manage motivational quotes.

**Returns:**

```javascript
{
  currentQuote,      // Current quote object
  allQuotes,         // All available quotes
  getDailyQuote,     // Get consistent daily quote
  getRandomQuote,    // Get random quote
  refreshQuote,      // Set new random quote
  nextQuote,         // Get next quote in sequence
  getQuoteById,      // Get specific quote
  getMultipleQuotes, // Get N random quotes
}
```

---

### useUpsertStudyLog()

Create or update study log (mutation).

**Returns:**

```javascript
{
  mutate,         // Mutation function
  mutateAsync,    // Async mutation function
  isPending,      // Loading state
  isSuccess,      // Success state
  error,          // Error object
}
```

**Usage:**

```javascript
const upsertMutation = useUpsertStudyLog();

const handleSubmit = async (formData) => {
  await upsertMutation.mutateAsync({
    study_date: "2024-10-12",
    hours_studied: 3.5,
    mood: "great",
    notes: "Focused on logical reasoning",
  });
};
```

---

## 🛠️ Utility Functions

### Date Utils (`src/utils/dateUtils.js`)

- `formatDate(date, format)` - Format date to string
- `getTodayDate()` - Get today in YYYY-MM-DD
- `getStartOfDay(date)` - Get start of day timestamp
- `getEndOfDay(date)` - Get end of day timestamp
- `daysBetween(start, end)` - Calculate days between dates
- `isToday(date)` - Check if date is today
- `getCurrentWeekRange()` - Get this week's date range
- `getCurrentMonthRange()` - Get this month's date range

---

### Streak Utils (`src/utils/streakUtils.js`)

- `calculateStreak(logs)` - Calculate consecutive study days
- `getStreakMessage(streak)` - Get motivational message
- `getFlowerStage(streak)` - Get flower stage for streak
- `getTotalStudyHours(logs)` - Sum all study hours
- `getStudyDaysCount(logs)` - Count unique study days
- `getAverageStudyHours(logs)` - Calculate average
- `studiedToday(logs)` - Check if studied today

---

### Validation Utils (`src/utils/validation.js`)

- `validateEmail(email)` - Validate email format
- `validatePassword(password)` - Validate password strength
- `validateStudyHours(hours)` - Validate study hours input
- `validateRequired(value, name)` - Validate required field
- `formatErrorMessage(error)` - Format Supabase errors
- `sanitizeInput(input)` - Sanitize user input

---

## 🎯 Context Providers

### AuthProvider

Wraps app to provide authentication state and methods.

**Usage:**

```jsx
<AuthProvider>
  <App />
</AuthProvider>
```

---

### ThemeProvider

Manages dark/light theme with localStorage persistence.

**Usage:**

```jsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

---

## 🔔 Notification Functions (`src/lib/notifications.js`)

- `initializeNotifications()` - Initialize OneSignal
- `setNotificationUserId(userId)` - Set user ID for targeting
- `setNotificationTags(tags)` - Set user tags for segmentation
- `areNotificationsEnabled()` - Check if notifications enabled
- `getNotificationPermission()` - Get permission status

---

## 📦 Supabase Functions (`src/lib/supabase.js`)

- `supabase` - Supabase client instance
- `getUserProfile(userId)` - Get user profile
- `updateUserProfile(userId, updates)` - Update profile
- `getStudyLogs(userId, start, end)` - Get study logs
- `upsertStudyLog(log)` - Create/update study log
- `deleteStudyLog(logId)` - Delete study log
- `getTodayStudyLog(userId)` - Get today's log

---

## 🎨 Styling

### Tailwind Classes

Common utility classes used throughout the app:

- **Focus Ring**: `focus-ring` - Consistent focus outline
- **Smooth Transition**: `smooth-transition` - Smooth animations
- **Custom Scrollbar**: `custom-scrollbar` - Styled scrollbars

### Theme Variables

CSS variables in `index.css`:

- `--color-text-base` - Base text color
- `--color-text-muted` - Muted text color
- `--color-bg-primary` - Primary background
- `--color-bg-secondary` - Secondary background

---

## 🚀 Best Practices

### Component Organization

- One component per file
- Export default for main component
- Group related components in feature folders
- Use index.js for exports

### Naming Conventions

- PascalCase for components
- camelCase for functions
- UPPER_CASE for constants
- kebab-case for file names (except components)

### Accessibility

- Always provide aria-label for icon buttons
- Use semantic HTML (button, nav, main, etc.)
- Ensure keyboard navigation works
- Test with screen reader when possible

### Performance

- Use React Query for data fetching
- Memoize expensive calculations with useMemo
- Use React.lazy for code splitting (when needed)
- Optimize images and assets

---

**For more information, see the main README.md file.**
