# Geraudia's LSAT Journey 🌸

A beautiful, motivational, and fully accessible LSAT study tracking web app built with React and Supabase. Track your study progress, build streaks, and stay motivated with daily quotes and flower growth visualizations!

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/react-18.x-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🔐 **Secure Authentication** - Email/password authentication with Supabase
- 📊 **Study Tracking** - Log daily study hours with mood and notes
- 🔥 **Streak System** - Build consecutive study day streaks
- 🌸 **Flower Growth Animation** - Visual progress representation that evolves with your streak
- 📅 **Study Calendar** - Visual calendar highlighting all study days
- 📈 **Weekly Charts** - Beautiful charts showing study patterns using Recharts
- 💬 **Daily Motivational Quotes** - 50+ inspiring quotes to keep you motivated
- 🔔 **Push Notifications** - Daily reminders via OneSignal (works on iPhone even when app is closed)
- 🌓 **Dark/Light Mode** - Fully themed interface with system preference detection
- ♿ **Fully Accessible** - WCAG AA compliant with proper ARIA labels and keyboard navigation
- 📱 **Responsive Design** - Perfect experience on mobile, tablet, and desktop
- ⚡ **Optimized Performance** - React Query for efficient data caching and management

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 (JavaScript, not TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Database, Real-time)
- **Data Fetching**: TanStack React Query
- **Forms**: React Hook Form
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Calendar**: React Day Picker
- **Icons**: React Icons
- **Notifications**: React Hot Toast + OneSignal
- **Date Utilities**: date-fns

## 📁 Project Structure

```
src/
├── assets/              # Images, icons, etc.
├── components/          # Reusable UI components
│   └── ui/             # Base UI components (Button, Input, Card, Modal, Loading)
├── context/            # React Context providers
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── data/               # Static data (quotes)
│   └── quotes.json
├── features/           # Feature-based modules
│   ├── auth/          # Authentication (Login, Signup, ProtectedRoute)
│   ├── dashboard/     # Dashboard components (Stats, Calendar, Charts)
│   ├── logs/          # Study logging (StudyLogForm)
│   ├── quotes/        # Quote display (QuoteCard)
│   └── streak/        # Streak visualization (FlowerGrowth)
├── hooks/             # Custom React hooks
│   ├── useQuotes.js
│   ├── useStreak.js
│   └── useStudyLogs.js
├── lib/               # External service configurations
│   ├── notifications.js
│   └── supabase.js
├── pages/             # Page-level components
│   └── DashboardPage.jsx
├── routes/            # App routing
│   └── AppRoutes.jsx
├── utils/             # Helper functions
│   ├── dateUtils.js
│   ├── streakUtils.js
│   └── validation.js
├── App.jsx            # Main app component
├── index.css          # Global styles
└── main.jsx           # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account ([supabase.com](https://supabase.com))
- OneSignal account ([onesignal.com](https://onesignal.com)) - for push notifications

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd gerdia-lsat
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   Fill in your environment variables:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_ONESIGNAL_APP_ID=your_onesignal_app_id
   ```

### Database Setup (Supabase)

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Run the following SQL in Supabase SQL Editor** to create the required tables:

   ```sql
   -- Create profiles table
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     full_name TEXT,
     study_goal INTEGER DEFAULT 3,
     timezone TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create study_logs table
   CREATE TABLE study_logs (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) NOT NULL,
     study_date DATE NOT NULL,
     hours_studied DECIMAL(4,2) NOT NULL,
     mood TEXT,
     notes TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(user_id, study_date)
   );

   -- Enable Row Level Security
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE study_logs ENABLE ROW LEVEL SECURITY;

   -- Profiles policies
   CREATE POLICY "Users can view own profile" ON profiles
     FOR SELECT USING (auth.uid() = id);

   CREATE POLICY "Users can update own profile" ON profiles
     FOR UPDATE USING (auth.uid() = id);

   CREATE POLICY "Users can insert own profile" ON profiles
     FOR INSERT WITH CHECK (auth.uid() = id);

   -- Study logs policies
   CREATE POLICY "Users can view own logs" ON study_logs
     FOR SELECT USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert own logs" ON study_logs
     FOR INSERT WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can update own logs" ON study_logs
     FOR UPDATE USING (auth.uid() = user_id);

   CREATE POLICY "Users can delete own logs" ON study_logs
     FOR DELETE USING (auth.uid() = user_id);

   -- Create indexes for better performance
   CREATE INDEX study_logs_user_id_idx ON study_logs(user_id);
   CREATE INDEX study_logs_study_date_idx ON study_logs(study_date);
   CREATE INDEX study_logs_user_date_idx ON study_logs(user_id, study_date);

   -- Create updated_at trigger function
   CREATE OR REPLACE FUNCTION update_updated_at_column()
   RETURNS TRIGGER AS $$
   BEGIN
     NEW.updated_at = NOW();
     RETURN NEW;
   END;
   $$ language 'plpgsql';

   -- Add triggers for updated_at
   CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
     FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

   CREATE TRIGGER update_study_logs_updated_at BEFORE UPDATE ON study_logs
     FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
   ```

3. **Enable Email Auth** in Supabase Dashboard:
   - Go to Authentication → Providers
   - Enable Email provider
   - Configure email templates (optional)

### OneSignal Setup (Push Notifications)

1. **Create a OneSignal account** at [onesignal.com](https://onesignal.com)

2. **Create a new Web app**:

   - Choose "Web Push" platform
   - Select "Typical Site" integration
   - Add your site URL

3. **Get your App ID**:

   - Copy your OneSignal App ID
   - Add it to your `.env` file

4. **Configure notification settings**:

   - Set up default notification icon
   - Customize welcome notification
   - Configure notification schedule (daily reminders)

5. **Set up automated notifications** (optional):
   - Create a daily reminder campaign
   - Schedule for optimal study time
   - Include motivational messages

### Running the App

**Development mode:**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

**Build for production:**

```bash
npm run build
```

**Preview production build:**

```bash
npm run preview
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js` to customize colors:

```javascript
colors: {
  primary: { /* Your primary color palette */ },
  secondary: { /* Your secondary color palette */ },
}
```

### Motivational Quotes

Add more quotes in `src/data/quotes.json`:

```json
{
  "id": 51,
  "text": "Your custom motivational quote",
  "author": "Author Name"
}
```

### Flower Stages

Customize streak milestones in `src/utils/streakUtils.js`:

```javascript
export const getFlowerStage = (streak) => {
  if (streak === 0) return "seed";
  if (streak < 5) return "sprout"; // Adjust thresholds
  // ... customize stages
};
```

## ♿ Accessibility Features

- ✅ Semantic HTML5 elements throughout
- ✅ Proper ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ Color contrast meets WCAG AA standards
- ✅ Screen reader friendly
- ✅ Form validation with clear error messages
- ✅ Responsive text sizing

## 📱 PWA Support (Future Enhancement)

To make this a Progressive Web App:

1. Add `vite-plugin-pwa` to the project
2. Create a `manifest.json` file
3. Add service worker configuration
4. Enable offline functionality
5. Add "Add to Home Screen" prompt

## 🔒 Security Best Practices

- ✅ Row Level Security enabled on all tables
- ✅ Environment variables for sensitive data
- ✅ Input sanitization and validation
- ✅ Secure authentication with Supabase
- ✅ HTTPS enforced in production
- ✅ XSS protection through React's built-in escaping

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Netlify

1. Push code to GitHub
2. Connect repository in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables
6. Deploy!

## 📊 Performance Optimizations

- ✅ React Query for efficient data caching
- ✅ Lazy loading with React.lazy() ready
- ✅ Optimized bundle size with Vite
- ✅ Image optimization ready
- ✅ Code splitting by route
- ✅ Debounced input handlers where appropriate

## 🐛 Troubleshooting

**Build errors?**

- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

**Supabase connection issues?**

- Verify environment variables are set correctly
- Check Supabase project is not paused
- Ensure API URL and key are correct

**Notifications not working?**

- Verify OneSignal App ID is correct
- Check browser notification permissions
- Ensure HTTPS is enabled (required for notifications)

## 📝 License

MIT License - feel free to use this project for your own study tracking!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Motivational quotes compiled from various public domain sources
- Icons from React Icons
- UI inspiration from modern productivity apps

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for Geraudia's LSAT success journey! 🌸**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
