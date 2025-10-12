# 🌺 Garden Collection System

## Overview

The Garden Collection is a gamification feature that rewards consistent study streaks. Every 7 days of consecutive studying, you unlock a new flower for your personal garden!

## How It Works

### Unlocking Flowers

- **Day 7**: 🌻 Sunflower - Your first flower!
- **Day 14**: 🌹 Rose - Beauty and dedication
- **Day 21**: 🌷 Tulip - Three weeks strong
- **Day 28**: 🌺 Hibiscus - One month milestone
- **Day 35**: 🪷 Lotus - Peace and growth
- **Day 42**: 🌼 Daisy - Six weeks of learning
- **Day 49**: 🏵️ Rosette - Seven weeks achievement
- **Day 56**: 💐 Bouquet - Two months celebration
- **Day 63**: 🪻 Hyacinth - Nine weeks of excellence
- **Day 70**: 🌸 Cherry Blossom - Ten weeks mastery
- **Day 77**: 🥀 Wilted Rose - "Beauty in perseverance"
- **Day 84**: 🪴 Potted Plant - Three months strong
- **Day 91**: 🌾 Sheaf of Rice - Harvest season
- **Day 98**: 🍀 Four Leaf Clover - "Lucky dedication!"
- **Day 100**: 🏆 Trophy Garden - "100 days of excellence!" 🎉

## Features

### 🌱 Current Growth Stage

- Shows your current flower stage (seed → sprout → bud → bloom → garden)
- Animated flower with breathing effect
- Sparkles for advanced stages

### 🌺 Garden Collection Button

- Appears once you unlock your first flower (7-day streak)
- Shows count of collected flowers
- Click to view/hide your garden

### 🔮 Next Flower Preview

- Shows which flower you'll unlock next
- Displays days remaining
- Motivates you to keep going

### 🏡 Garden Display

- Beautiful grid layout of all collected flowers
- Each flower shows:
  - Animated emoji
  - Name and color
  - Unlock day
  - Special description (for milestone flowers)
- Hover to see flower animations
- Progress bar to next unlock
- "Master Gardener" badge when all flowers are collected

## User Experience

### Visual Feedback

- **Initial state**: Shows only current growth stage
- **7+ day streak**: "View My Garden" button appears
- **Click garden button**: Expands to show full collection
- **Hover flowers**: Individual flowers animate on hover
- **New unlock**: Celebration with spring animation

### Motivation System

1. **Short-term**: Daily streak growth (seed to bloom)
2. **Medium-term**: Weekly flower unlocks (7-day milestones)
3. **Long-term**: Complete garden collection (100 days)

### Progress Tracking

- Progress indicators show current stage
- Next flower preview keeps goal visible
- Progress bar shows % to next unlock
- Total collection count displayed on button

## Technical Implementation

### Utils Functions

- `getCollectedFlowers(streak)`: Returns array of unlocked flowers
- `getNextFlower(streak)`: Returns next flower to unlock with days remaining
- `getFlowerStage(streak)`: Returns current growth stage

### Component Features

- Framer Motion animations for smooth transitions
- AnimatePresence for show/hide garden
- Responsive grid layout (3-5 columns based on screen size)
- Dark mode support with gradient backgrounds
- Accessible with hover states and transitions

## Gamification Benefits

### Engagement

- Visual progress representation
- Collection mechanics (gotta catch 'em all!)
- Milestone celebrations
- Long-term goals (100 days)

### Retention

- Daily check-in incentive
- Weekly unlock anticipation
- Collection completion drive
- Achievement unlocking

### Motivation

- Clear visual progress
- Regular rewards (every 7 days)
- Special milestone flowers
- Master Gardener status

## Future Enhancements (Optional)

### Potential Additions

- 🌟 Seasonal flowers (different flowers per season)
- 🎨 Customizable garden backgrounds
- 📊 Garden statistics (total gardens completed, favorite flower)
- 🎁 Special event flowers (holidays, personal milestones)
- 🔄 Flower trading/sharing with friends
- 🏅 Garden achievements (speed collector, perfect gardener)
- 🌈 Rare flowers for perfect weeks (7/7 days)

### Advanced Features

- Garden themes (tropical, zen, cottage, etc.)
- Flower arrangements/layouts
- Garden journal/diary
- Time-lapse garden growth video
- Share garden on social media

---

**Remember**: The garden is a reflection of your dedication to learning. Every flower represents a week of consistent effort toward your LSAT goals! 🌺
