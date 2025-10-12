# 🎯 OneSignal - Quick Reference Card

## 🚀 SETUP CHECKLIST

### Right Now (10 minutes):
- [ ] 1. Go to [onesignal.com](https://onesignal.com) → Sign up
- [ ] 2. Create new app: "Geraudia LSAT Journey"
- [ ] 3. Select Web Push platform
- [ ] 4. Enable Safari Web Push (for iPhone!)
- [ ] 5. Copy App ID from Settings → Keys & IDs
- [ ] 6. Add to `.env`: `VITE_ONESIGNAL_APP_ID=your-app-id`
- [ ] 7. Restart dev server: `Ctrl+C` then `npm run dev`
- [ ] 8. Open app → Allow notifications
- [ ] 9. Send test from OneSignal dashboard
- [ ] 10. Verify notification appears! ✅

### Next (5 minutes):
- [ ] 11. Messages → Automated → New Automated Message
- [ ] 12. Time-based → Every day at 5:00 PM
- [ ] 13. Timezone: (GMT+0:00) Africa/Accra
- [ ] 14. Message: "Time to study! 🌸"
- [ ] 15. Save & Enable

### Later (When deploying):
- [ ] 16. Deploy to Vercel/Netlify
- [ ] 17. Update OneSignal with production URL
- [ ] 18. Test on Geraudia's iPhone (Safari only!)
- [ ] 19. Add to Home Screen for best experience
- [ ] 20. Done! 🎉

---

## 📱 IPHONE REQUIREMENTS

✅ **iOS 16.4 or newer** (March 2023+)
✅ **Safari browser only** (not Chrome)
✅ **HTTPS in production** (Vercel/Netlify provide this)
✅ **Add to Home Screen** (recommended)
✅ **Works when app is closed** 🎊

---

## 🏷️ AUTO-SENT TAGS

Your app automatically sends these tags to OneSignal:

| Tag | Example | Updates When |
|-----|---------|--------------|
| `user_name` | "Geraudia" | On login |
| `current_streak` | "7" | After logging study |
| `last_study_date` | "2024-10-12" | After logging study |
| `total_hours` | "45.5" | After logging study |
| `streak_level` | "consistent" | When streak changes |
| `has_logged_today` | "true" | Daily at midnight resets |

---

## 💬 MESSAGE TEMPLATES

### Daily 5pm Reminder
```
Title: Time to study! 🌸
Message: Your LSAT flower is waiting for today's sunshine! Let's keep that {{tags.current_streak}} day streak growing! 🌻
```

### Morning Motivation (Optional)
```
Title: Good morning, Geraudia! ☀️
Message: Plan when you'll study today. Keep the momentum going! 💪
```

### Missed Study Alert (Optional)
```
Title: Still time to study! ⏰
Message: Don't lose your {{tags.current_streak}} day streak! Even 30 minutes counts!
Filter: has_logged_today = false
```

### Milestone Celebration (Optional)
```
Title: MILESTONE! 🏆
Message: {{tags.current_streak}} DAY STREAK! You're unstoppable! 🔥
Filter: current_streak = 7, 14, 30, 100
```

---

## 🔧 COMMON COMMANDS

### Restart Dev Server
```bash
# Press Ctrl+C to stop, then:
npm run dev
```

### Check if OneSignal is Working
```javascript
// Open browser console (F12) and type:
OneSignal.isPushNotificationsEnabled()
// Should return: Promise {<pending>} → true
```

### Send Test Notification
OneSignal Dashboard → Messages → New Push → Send to All Users

---

## 🐛 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| No notification prompt | Restart dev server, verify App ID in `.env` |
| Prompt appears but nothing happens | Check browser console (F12) for errors |
| Allowed but not receiving | Check OneSignal Dashboard → Audience → All Users (should show 1 user) |
| Can't find App ID | OneSignal → Settings → Keys & IDs |
| Not working on iPhone | Must use Safari, HTTPS in production, Add to Home Screen |

---

## 📚 DOCUMENTATION FILES

1. **START HERE**: `ONESIGNAL_QUICKSTART.md` (10-min setup)
2. **FULL GUIDE**: `ONESIGNAL_SETUP.md` (complete documentation)
3. **SUMMARY**: `ONESIGNAL_INTEGRATION_SUMMARY.md` (what was done)
4. **THIS FILE**: `ONESIGNAL_QUICK_REFERENCE.md` (quick lookup)

---

## 🎯 WHAT'S ENABLED

✅ OneSignal initialization (automatic)
✅ Welcome notification when user subscribes
✅ User tagging (automatic)
✅ Ready for automated messages
✅ Works on iPhone iOS 16.4+
✅ Works when app is closed
✅ Personalized messages with user data

---

## 🚀 PRODUCTION DEPLOYMENT

When ready to deploy:

1. **Deploy to Vercel/Netlify** (HTTPS automatic)
2. **Update OneSignal**:
   - Settings → Platforms → Web Push
   - Add production URL
3. **Test on iPhone**:
   - Open in Safari
   - Add to Home Screen
   - Allow notifications
4. **Verify**:
   - Send test message
   - Should appear even when app closed!

---

## 💡 PRO TIPS

1. **Don't over-notify**: 1-2 per day max
2. **Use segments**: Different messages for different users
3. **A/B test**: See what motivates Geraudia more
4. **Personalize**: Use {{tags.user_name}} and {{tags.current_streak}}
5. **Smart delivery**: Only send if `has_logged_today` is false
6. **Celebrate milestones**: Make streaks feel special!

---

## 🔗 QUICK LINKS

- OneSignal Dashboard: [app.onesignal.com](https://app.onesignal.com)
- Documentation: [documentation.onesignal.com](https://documentation.onesignal.com)
- iOS Guide: [onesignal.com/blog/ios-web-push](https://onesignal.com/blog/ios-web-push-notifications/)

---

**Need help?** Check the full guide in `ONESIGNAL_SETUP.md` or browser console for errors!

**Ready to start?** Follow `ONESIGNAL_QUICKSTART.md` now! 🚀
