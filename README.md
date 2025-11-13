# 🧠 Hermony AI - Mental Health Monitoring & Support System

An AI-powered web application that helps users understand, track, and improve their mental well-being through daily mood tracking, AI analysis, personalized recommendations, and professional counseling support.

## 🌟 Features

### 1. **Daily Mood & Stress Logging** 📊
- Log mood, stress levels, and sleep hours daily
- Track emotional patterns over time
- Quick data entry with emoji selectors
- Personal notes and journal entries

### 2. **AI-Based Analysis** 🤖
- Sentiment analysis of user input
- Emotion detection (8+ emotion types)
- Risk scoring and pattern recognition
- Keyword extraction and trend analysis
- NLP-powered mental health insights

### 3. **Personalized Recommendations** 💡
- AI-generated wellness activities based on mood/stress
- Meditation exercises
- Sleep hygiene tips
- Stress reduction activities
- Physical exercise routines
- Breathing techniques
- Journaling prompts

### 4. **Counselor Management** 👨‍⚕️
- Browse therapist profiles
- View specializations and experience
- Schedule therapy sessions
- Manage appointments
- Session notes and history

### 5. **Feedback & Progress Tracking** 📈
- Rate and review counseling sessions
- Track emotional stability improvements
- Progress milestones
- Therapy outcome analytics
- Improvement metrics visualization

### 6. **Crisis Detection & Emergency Support** 🚨
- Real-time crisis alert logging
- Severity classification (Low/Medium/High/Critical)
- Emergency contact directory
- Immediate counselor notifications
- Multiple crisis type support:
  - Suicidal ideation
  - Self-harm risk
  - Severe anxiety/depression
  - Psychotic symptoms
  - Substance abuse
  - Violent ideation

## 🗄️ Database Structure

10 IndexedDB Tables:
1. **daily_logs** - Daily mood and stress entries
2. **users** - User profiles and preferences
3. **counsellors** - Therapist information
4. **sessions** - Therapy appointment records
5. **feedback** - Session ratings and comments
6. **progress** - User improvement tracking
7. **recommendations** - Personalized wellness activities
8. **ai_analysis** - NLP analysis results
9. **crisis_alerts** - Emergency case logs
10. **emergency_contacts** - Quick-access emergency directory

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Database:** IndexedDB (Client-side storage)
- **Framework:** Bootstrap 5.3.0
- **Visualization:** Chart.js
- **Icons:** Font Awesome 6.5.0
- **Processing:** Native Web APIs, NLP

## 📁 Project Structure

```
Hermony/
├── index.html              # Dashboard & Main page
├── login.html              # User authentication
├── feature1.html           # Daily Mood & Stress Logging
├── feature2.html           # Counselor Management
├── feature3.html           # Recommendations
├── feature4.html           # Feedback & Progress
├── feature5.html           # AI Analysis
├── feature6.html           # Crisis Detection
├── assets/
│   ├── css/
│   │   ├── style.css       # Main styling
│   │   └── modern-style.css # Enhanced styling
│   └── js/
│       ├── main.js         # Core database & logic
│       └── charts.js       # Visualization scripts
├── documentation/
│   ├── PROJECT_COMPLETENESS_VERIFICATION.md
│   └── FEATURE_MAPPING_DOCUMENTATION.md
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Local storage enabled
- JavaScript enabled

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/hermony-ai.git
cd hermony-ai
```

2. **Open in browser:**
   - Option A: Double-click `index.html`
   - Option B: Open with VS Code Live Server extension
   - Option C: Use Python's simple server:
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Create account & start using:**
   - Click "Get Started" or go to `login.html`
   - Fill user profile
   - Start logging daily mood
   - Explore all features

## 📊 Data Management

### Storage
- All data stored locally in IndexedDB
- No server required
- Persists across browser sessions
- Private and secure

### Export Data
- Download mood logs as CSV
- Export analysis reports
- Backup emergency contacts

### Data Privacy
- No cloud storage (unless you add it)
- No external API calls
- Complete user privacy control
- GDPR compliant

## 🤖 AI Features

### Sentiment Analysis
- Detects emotional tone of text input
- Scores: Positive, Neutral, Negative
- Tracks sentiment trends

### Emotion Detection
- Identifies 8+ emotion categories
- Maps emotions to well-being
- Provides emotion-specific recommendations

### Risk Scoring
- Analyzes for crisis indicators
- 0-100 scale risk assessment
- Triggers emergency protocols when needed

### Pattern Recognition
- Identifies mood cycles
- Detects stress triggers
- Recognizes improvement patterns

## 📱 Responsive Design

- **Mobile:** Optimized for phones (320px+)
- **Tablet:** Enhanced layout for iPads (768px+)
- **Desktop:** Full-featured experience (1024px+)
- Touch-friendly interface
- Accessible navigation

## 🔐 Security Features

- Client-side processing only
- No sensitive data transmission
- User authentication (local)
- Data encryption at rest (IndexedDB)
- Session management

## 📚 Documentation

- **PROJECT_COMPLETENESS_VERIFICATION.md** - Complete feature & database verification
- **FEATURE_MAPPING_DOCUMENTATION.md** - Detailed code references for all components

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🆘 Support

### Getting Help
- Check documentation files
- Review feature pages
- Explore sample data

### Common Issues

**Q: Data not persisting?**
- Check if IndexedDB is enabled in browser
- Clear browser cache and reload
- Check browser storage settings

**Q: Features not loading?**
- Verify JavaScript is enabled
- Check browser console for errors
- Try different browser

**Q: Emergency feature not working?**
- Ensure crisis alerts are enabled
- Check if emergency contacts are added
- Verify severity level selection

## 🎯 Roadmap

### v1.0 (Current)
- [x] Daily mood logging
- [x] AI analysis
- [x] Recommendations
- [x] Counselor management
- [x] Progress tracking
- [x] Crisis detection

### v1.1 (Planned)
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Mobile app (React Native)
- [ ] Cloud backup option
- [ ] Wearable device integration
- [ ] Voice journal entries

### v2.0 (Future)
- [ ] Backend server integration
- [ ] Real therapist platform
- [ ] Video consultation support
- [ ] Community features
- [ ] Advanced AI models
- [ ] Integration with health apps

## 👨‍💻 Author

**Hanif**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Bootstrap 5 team for the framework
- Chart.js for visualization library
- Font Awesome for icons
- Mental health professionals for guidance

## 📞 Contact & Support

For questions, feedback, or support:
- Open an issue on GitHub
- Email: your.email@example.com
- Visit: [Your Website]

---

**Made with ❤️ for mental health support**

*Last Updated: November 13, 2025*
