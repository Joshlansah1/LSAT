# 💡 Tips & Best Practices

A guide to getting the most out of Geraudia's LSAT Journey!

---

## 📚 For Users (Geraudia)

### Building Your Streak

**Start Small**

- Don't pressure yourself for hours of study initially
- Even 30 minutes counts - log it!
- Consistency > Duration

**Set Realistic Goals**

- Aim for 2-3 hours daily at first
- Gradually increase as you build the habit
- Remember: the app tracks your average automatically

**Never Break the Chain**

- The streak is powerful motivation
- Set a daily reminder
- Study at the same time each day

### Using Study Logs Effectively

**Be Honest About Your Mood**

- Track how you feel - it helps identify patterns
- "Tired" days are OK - they're part of the journey
- Review your moods weekly to optimize study times

**Notes Are Valuable**

- Write what topics you covered
- Note what clicked and what didn't
- Record questions to revisit
- Track practice test scores

**Example Good Notes:**

```
"Logical Reasoning: Necessary vs Sufficient conditions finally clicked!
Completed 3 practice sections. Struggled with parallel reasoning -
review tomorrow."
```

### Staying Motivated

**Check Your Stats Daily**

- Watch your total hours grow
- Celebrate week milestones
- Share your progress with friends

**Use the Quotes**

- Read the daily quote when you log in
- Screenshot favorites for tough days
- Refresh when you need a boost

**Watch Your Flower Grow**

- Each stage is an achievement
- Screenshot your garden stage (30+ days!)
- Share it on social media

### Maintaining Your Streak

**Plan for Busy Days**

- Study early in the day when possible
- Even 15 minutes keeps the streak alive
- Log it immediately - don't forget!

**Weekend Strategy**

- Use weekends for longer sessions
- Review the week's progress
- Plan next week's focus areas

**Handling Breaks**

- If you miss a day, don't give up!
- Start a new streak immediately
- Focus on beating your previous best

---

## 🎨 For Developers

### Customization Ideas

**Theme Colors**
Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#your-color-here',
    // ... other shades
  }
}
```

**Flower Emojis**
Change in `src/features/streak/FlowerGrowth.jsx`:

```javascript
const stageConfig = {
  seed: { emoji: '🌰', ... },  // Use different emoji
  // ...
}
```

**Streak Thresholds**
Adjust in `src/utils/streakUtils.js`:

```javascript
export const getFlowerStage = (streak) => {
  if (streak === 0) return "seed";
  if (streak < 5) return "sprout"; // Change from 3 to 5
  // ...
};
```

**Add More Quotes**
Edit `src/data/quotes.json`:

```json
{
  "id": 51,
  "text": "Your new quote here",
  "author": "Author Name"
}
```

### Adding New Features

**New Study Field (e.g., Score)**

1. Update database:

```sql
ALTER TABLE study_logs ADD COLUMN practice_score INTEGER;
```

2. Update form:

```jsx
// In StudyLogForm.jsx
<Input label="Practice Score" type="number" {...register("practice_score")} />
```

3. Update display in dashboard

**Achievement Badges**

1. Create achievements table
2. Create useAchievements hook
3. Add badge display component
4. Show notification on unlock

**Study Categories**

1. Add categories table
2. Add category selector to log form
3. Filter logs by category
4. Show category breakdown in stats

### Performance Tips

**Lazy Load Routes**

```javascript
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

<Route
  path="/dashboard"
  element={
    <Suspense fallback={<Loading fullScreen />}>
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    </Suspense>
  }
/>;
```

**Optimize Images**

- Use WebP format
- Add lazy loading
- Compress before uploading

**Bundle Analysis**

```bash
npm install --save-dev vite-plugin-bundle-visualizer
```

Add to `vite.config.js` to analyze bundle size

---

## 🔔 Notification Best Practices

### For Users

**Timing**

- Set notifications for your natural study time
- Not too early or late
- Consistent time each day

**Response**

- Click notification to open app
- Study immediately or schedule
- Don't ignore repeatedly

### For Developers

**Message Templates**

```javascript
// Motivational
"Time to grow your garden! 🌸 [X] day streak!";

// Encouraging
"You haven't studied yet today. Keep that [X] day streak alive!";

// Milestone
"Amazing! You've studied for [X] days straight! 🎉";
```

**Scheduling**

- Send daily reminder at user's preferred time
- Send weekly progress summary
- Send congratulations on milestones

**User Segmentation**

```javascript
// Tag users by streak level
OneSignal.sendTags({
  streak_level:
    streak >= 30 ? "master" : streak >= 7 ? "consistent" : "beginner",
  last_study_date: "2024-10-12",
});
```

---

## 📊 Data Insights

### Track Your Patterns

**Best Study Times**

- Notice when you log "great" moods
- That's your optimal study time
- Schedule important topics then

**Weekly Trends**

- Review the weekly chart regularly
- Identify your productive days
- Plan accordingly

**Progress Over Time**

- Compare monthly totals
- Track average hours increasing
- Notice improvement in consistency

### Goal Setting

**SMART Goals**

- Specific: "Study 3 hours daily"
- Measurable: Track in app
- Achievable: Start with 2 hours
- Relevant: Focus on weak areas
- Time-bound: "30-day streak"

**Milestone Rewards**

- 7-day streak: Treat yourself
- 30-day streak: Celebrate!
- 100 hours: Major milestone
- Share achievements

---

## 🎯 Study Strategies

### Daily Routine

**Morning** (If you're a morning person)

1. Log in and read motivational quote
2. Check yesterday's notes
3. Study 1-2 hours
4. Log session immediately

**Evening** (If you prefer evenings)

1. Review daily quote
2. Study 2-3 hours
3. Log session with detailed notes
4. Plan tomorrow's topics

**Consistency Template**

```
Same time daily → Better habit formation
Same location → Mental association
Same duration → Sustainable routine
Log immediately → Maintain streak
```

### Using Study Notes

**What to Track**

- Topics covered
- Time per section
- Difficulty level
- Aha moments
- Questions for review
- Practice test scores

**Review Strategy**

- Read last 3 days of notes each morning
- Weekly review on Sunday
- Identify patterns in struggles
- Celebrate improvements

---

## 🔧 Troubleshooting Tips

### Common User Issues

**"I forgot to log yesterday!"**

- Unfortunately, streak resets
- Start fresh today
- Set a reminder to prevent this
- Consider logging immediately after study

**"Chart shows incorrect data"**

- Refresh the page
- Check you logged correctly
- Verify date is correct
- Check browser console for errors

**"Notifications not working on iPhone"**

- Add app to home screen
- Enable notifications in Settings
- Check browser permissions
- Ensure HTTPS (in production)

**"Dark mode not saving"**

- Clear browser cache
- Check localStorage is enabled
- Try incognito/private mode
- Update browser

### Developer Issues

**"Supabase queries failing"**

- Check RLS policies
- Verify user is authenticated
- Check table permissions
- Review Supabase logs

**"Build errors"**

- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`
- Check all imports are correct
- Verify environment variables

**"OneSignal not initializing"**

- Check App ID is correct
- Verify domain in OneSignal settings
- Test on HTTPS (localhost is OK)
- Check browser console

---

## 🌟 Advanced Tips

### Power User Features

**Keyboard Shortcuts** (Future Enhancement)

- `Ctrl/Cmd + L`: Open log modal
- `Ctrl/Cmd + Q`: New quote
- `Ctrl/Cmd + D`: Toggle dark mode

**Data Export**

- Use Supabase dashboard
- Export study_logs table
- Analyze in Excel/Sheets
- Create custom reports

**API Integration** (Future)

- Connect to calendar apps
- Sync with productivity tools
- Automate daily reminders
- Share to social media

### Customization for Personal Style

**Emoji Preferences**
Change any emojis in the app:

- Flower stages
- Mood selections
- Notifications
- Success messages

**Color Schemes**
Create your own theme:

- Edit Tailwind colors
- Use brand colors
- Match personal aesthetic
- Maintain accessibility

**Motivation Messages**
Customize in `src/utils/streakUtils.js`:

```javascript
export const getStreakMessage = (streak) => {
  if (streak === 0) return "Your custom message!";
  // ...
};
```

---

## 📱 Mobile Tips

### iPhone Users

**Add to Home Screen**

1. Open app in Safari
2. Tap Share button
3. Select "Add to Home Screen"
4. Now it works like native app!

**Notification Setup**

- Must add to home screen first
- Enable notifications when prompted
- Works even when Safari is closed

**Offline Usage** (Future PWA)

- Add service worker
- Cache essential data
- Work offline
- Sync when online

### Responsive Usage

**Mobile Layout**

- Optimized for one-hand use
- Large touch targets
- Swipe-friendly
- Bottom navigation (future)

**Tablet Layout**

- Two-column dashboard
- Larger charts
- Side panel for details
- Landscape optimized

---

## 🎓 Study Tips for LSAT Success

### Time Management

- Quality > Quantity
- Take breaks (Pomodoro technique)
- Review > Cram
- Practice tests regularly

### Using the App for LSAT

- Log each study session
- Note section types studied
- Track practice test scores in notes
- Review mood patterns around tests

### Consistency is Key

- Daily study beats weekend cramming
- Use streak as accountability
- Share progress with study group
- Celebrate small wins

---

## 💪 Staying Motivated Long-Term

### Week 1-2: Building Habit

- Focus on logging daily
- Don't worry about hours
- Read quotes daily
- Celebrate first streak

### Week 3-4: Gaining Momentum

- Increase study duration
- Track mood patterns
- Set weekly goals
- Watch flower grow to bloom

### Month 2+: Maintaining Excellence

- Review monthly progress
- Adjust study strategies
- Share achievements
- Help others get started

### Avoiding Burnout

- Rest days are OK (log 0.5 hours)
- Vary study topics
- Use quotes for inspiration
- Remember your why

---

**Remember: Progress over perfection. Every study session counts! 🌸**
