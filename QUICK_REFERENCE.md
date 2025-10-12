# 🚀 Quick Reference Guide

Fast lookup for common tasks and commands.

---

## ⚡ Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🔧 Environment Variables

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
VITE_ONESIGNAL_APP_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

---

## 📊 Database Quick Reference

### Tables

**profiles**

- `id` (UUID, PK, FK to auth.users)
- `full_name` (TEXT)
- `study_goal` (INTEGER)
- `timezone` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**study_logs**

- `id` (UUID, PK)
- `user_id` (UUID, FK to auth.users)
- `study_date` (DATE)
- `hours_studied` (DECIMAL)
- `mood` (TEXT)
- `notes` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Common Queries

```sql
-- Get all logs for a user
SELECT * FROM study_logs
WHERE user_id = 'xxx'
ORDER BY study_date DESC;

-- Get this month's logs
SELECT * FROM study_logs
WHERE user_id = 'xxx'
AND study_date >= date_trunc('month', CURRENT_DATE);

-- Calculate streak
SELECT calculate_streak('user-id-here');

-- Get user stats
SELECT * FROM user_study_stats
WHERE user_id = 'xxx';
```

---

## 🎨 Common Tailwind Classes

```css
/* Layouts */
flex items-center justify-center
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4

/* Spacing */
p-4 sm:p-6          /* Padding */
m-4 mb-6            /* Margin */
space-y-4           /* Vertical spacing */
gap-4               /* Grid/Flex gap */

/* Colors */
bg-primary-500 dark:bg-primary-400
text-gray-900 dark:text-white
border-gray-200 dark:border-gray-700

/* Typography */
text-sm sm:text-base lg:text-lg
font-medium font-semibold font-bold

/* Responsive */
sm:  /* >= 640px */
md:  /* >= 768px */
lg:  /* >= 1024px */
xl:  /* >= 1280px */

/* Custom utilities */
focus-ring           /* Focus outline */
smooth-transition    /* Smooth animations */
custom-scrollbar     /* Styled scrollbar */
```

---

## 🎣 Hook Usage Examples

### useAuth

```jsx
const { user, signIn, signOut } = useAuth();

// Sign in
await signIn("[email protected]", "password");

// Sign out
await signOut();
```

### useStudyLogs

```jsx
const { data: logs, isLoading } = useStudyLogs();

// With date range
const { data } = useStudyLogs("2024-01-01", "2024-12-31");
```

### useUpsertStudyLog

```jsx
const mutation = useUpsertStudyLog();

await mutation.mutateAsync({
  study_date: "2024-10-12",
  hours_studied: 3.5,
  mood: "great",
  notes: "Productive session",
});
```

### useStreak

```jsx
const { streak, streakMessage, flowerStage, totalHours } = useStreak();
```

### useQuotes

```jsx
const { currentQuote, refreshQuote } = useQuotes();

// Show daily quote
<p>{currentQuote.text}</p>

// Get new quote
<button onClick={refreshQuote}>New Quote</button>
```

---

## 🧩 Component Props Quick Ref

### Button

```jsx
<Button
  variant="primary|secondary|outline|ghost|danger"
  size="sm|md|lg"
  fullWidth={boolean}
  loading={boolean}
  icon={IconComponent}
  onClick={handler}
>
  Text
</Button>
```

### Input

```jsx
<Input
  label="Label"
  type="text|email|password|number"
  error={errorMessage}
  icon={IconComponent}
  required
  fullWidth
  {...register("fieldName")}
/>
```

### Modal

```jsx
<Modal
  isOpen={boolean}
  onClose={handler}
  title="Title"
  size="sm|md|lg|xl"
  footer={<>Buttons</>}
>
  Content
</Modal>
```

---

## 📦 Import Shortcuts

```javascript
// UI Components
import { Button, Input, Card, Modal, Loading } from "./components/ui";

// Context
import { useAuth } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";

// Hooks
import { useStudyLogs, useUpsertStudyLog } from "./hooks/useStudyLogs";
import { useStreak } from "./hooks/useStreak";
import { useQuotes } from "./hooks/useQuotes";

// Utils
import { formatDate, getTodayDate } from "./utils/dateUtils";
import { calculateStreak } from "./utils/streakUtils";
import { validateEmail } from "./utils/validation";

// Icons
import { FiSave, FiEdit, FiTrash } from "react-icons/fi";

// Supabase
import { supabase } from "./lib/supabase";

// Notifications
import toast from "react-hot-toast";
```

---

## 🎯 Common Tasks

### Add a New Page

1. Create `src/pages/NewPage.jsx`
2. Add route in `src/routes/AppRoutes.jsx`:

```jsx
<Route path="/new" element={<NewPage />} />
```

### Add a New Feature

1. Create folder: `src/features/feature-name/`
2. Add components
3. Export from feature folder
4. Import in pages

### Create a Custom Hook

```javascript
// src/hooks/useCustomHook.js
import { useState, useEffect } from "react";

export const useCustomHook = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Logic here
  }, []);

  return { data };
};
```

### Add Database Table

1. Write SQL in Supabase SQL Editor
2. Enable RLS
3. Add policies
4. Create helper functions in `lib/supabase.js`
5. Create custom hook

### Style Dark Mode

```jsx
className = "bg-white dark:bg-gray-800 text-gray-900 dark:text-white";
```

---

## 🔔 Notification Templates

```javascript
// Success
toast.success("Action completed! 🎉");

// Error
toast.error("Something went wrong!");

// Loading
toast.loading("Processing...");

// Promise
toast.promise(saveData(), {
  loading: "Saving...",
  success: "Saved!",
  error: "Failed to save",
});
```

---

## 🐛 Debug Checklist

- [ ] Check browser console for errors
- [ ] Verify environment variables loaded
- [ ] Check network tab for failed requests
- [ ] Verify Supabase connection
- [ ] Check user is authenticated
- [ ] Review React Query devtools
- [ ] Check localStorage (theme, etc.)
- [ ] Clear cache and hard reload

---

## 📱 Testing Checklist

- [ ] Sign up new user
- [ ] Log in existing user
- [ ] Log study session
- [ ] View calendar
- [ ] Check weekly chart
- [ ] Toggle dark mode
- [ ] Test on mobile
- [ ] Verify notifications
- [ ] Test form validation
- [ ] Check accessibility (keyboard nav)

---

## 🚀 Deployment Quick Steps

**Vercel:**

```bash
git push origin main
# Auto-deploys if connected
```

**Manual:**

```bash
npm run build
# Upload dist/ folder to host
```

**Environment Variables:**

- Add in Vercel/Netlify dashboard
- Redeploy after changes

---

## 📊 Performance Checks

```bash
# Bundle size
npm run build
# Check dist/ folder size

# Lighthouse audit
# Open DevTools → Lighthouse → Analyze
```

---

## 🔑 Keyboard Shortcuts

**VS Code:**

- `Ctrl+P` - Quick file open
- `Ctrl+Shift+F` - Search in files
- `Ctrl+` - Terminal
- `F2` - Rename symbol
- `Ctrl+D` - Multi-cursor

**Browser DevTools:**

- `F12` - Open DevTools
- `Ctrl+Shift+C` - Inspect element
- `Ctrl+Shift+M` - Mobile view
- `Ctrl+R` - Reload
- `Ctrl+Shift+R` - Hard reload

---

## 💾 Backup & Recovery

**Database Backup:**

- Supabase auto-backups daily
- Manual export from dashboard
- Download as CSV/SQL

**Code Backup:**

- Push to GitHub regularly
- Use branches for experiments
- Tag releases

---

## 📞 Quick Links

- **Supabase Dashboard**: https://app.supabase.com
- **OneSignal Dashboard**: https://app.onesignal.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com/docs
- **React Query Docs**: https://tanstack.com/query

---

**Print this page and keep it handy while developing! 📌**
