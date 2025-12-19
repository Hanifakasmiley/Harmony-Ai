"""
Harmony AI - AI Analyzer Module
Analyzes daily logs and generates mental health insights
"""

from textblob import TextBlob
import re

class AIAnalyzer:
    """AI-powered analyzer for mental health data"""
    
    # Mood to base emotion mapping
    MOOD_EMOTIONS = {
        'happy': ('Joy', 0.8),
        'content': ('Content', 0.6),
        'calm': ('Peaceful', 0.5),
        'neutral': ('Neutral', 0.0),
        'tired': ('Fatigue', -0.2),
        'anxious': ('Anxiety', -0.4),
        'stressed': ('Stress', -0.5),
        'sad': ('Sadness', -0.6),
        'angry': ('Anger', -0.7),
        'depressed': ('Depression', -0.8)
    }
    
    # Keywords that indicate mental health concerns
    CONCERN_KEYWORDS = [
        'hopeless', 'worthless', 'alone', 'scared', 'panic',
        'cant sleep', "can't sleep", 'nightmare', 'crying',
        'overwhelmed', 'exhausted', 'giving up', 'no point',
        'hate myself', 'burden', 'empty', 'numb'
    ]
    
    # Positive keywords
    POSITIVE_KEYWORDS = [
        'grateful', 'happy', 'excited', 'hopeful', 'better',
        'improving', 'good day', 'relaxed', 'peaceful', 'proud',
        'accomplished', 'loved', 'supported', 'calm', 'energetic'
    ]

    def analyze_log(self, log_data):
        """
        Analyze a daily log entry and return AI analysis results
        
        Args:
            log_data: dict with keys: mood_level, stress_level, anxiety_level, sleep_hours, notes
        
        Returns:
            dict with: risk_score, sentiment_value, emotion_label
        """
        mood = str(log_data.get('mood_level', 'neutral')).lower()
        stress = int(log_data.get('stress_level', 5))
        anxiety = int(log_data.get('anxiety_level', 5))
        sleep = float(log_data.get('sleep_hours', 7))
        notes = str(log_data.get('notes', ''))
        
        # 1. Sentiment Analysis on notes
        sentiment_value = self._analyze_sentiment(notes)
        
        # 2. Emotion Detection
        emotion_label = self._detect_emotion(mood, notes, sentiment_value)
        
        # 3. Risk Score Calculation
        risk_score = self._calculate_risk_score(
            mood, stress, anxiety, sleep, notes, sentiment_value
        )
        
        return {
            'risk_score': round(risk_score, 2),
            'sentiment_value': round(sentiment_value, 2),
            'emotion_label': emotion_label
        }

    def _analyze_sentiment(self, text):
        """
        Analyze sentiment of text using TextBlob
        Returns value between -1 (negative) and 1 (positive)
        """
        if not text or text.strip() == '':
            return 0.0
        
        try:
            blob = TextBlob(text)
            base_sentiment = blob.sentiment.polarity
            
            # Adjust based on concern/positive keywords
            text_lower = text.lower()
            
            concern_count = sum(1 for kw in self.CONCERN_KEYWORDS if kw in text_lower)
            positive_count = sum(1 for kw in self.POSITIVE_KEYWORDS if kw in text_lower)
            
            # Adjust sentiment based on keywords
            keyword_adjustment = (positive_count - concern_count) * 0.1
            
            final_sentiment = base_sentiment + keyword_adjustment
            return max(-1.0, min(1.0, final_sentiment))  # Clamp to [-1, 1]
            
        except Exception as e:
            print(f"Sentiment analysis error: {e}")
            return 0.0

    def _detect_emotion(self, mood, notes, sentiment):
        """
        Detect primary emotion based on mood, notes, and sentiment
        """
        # First check mood mapping
        mood_lower = mood.lower().strip()
        if mood_lower in self.MOOD_EMOTIONS:
            return self.MOOD_EMOTIONS[mood_lower][0]
        
        # Analyze notes for emotion keywords
        notes_lower = notes.lower()
        
        emotion_keywords = {
            'Joy': ['happy', 'excited', 'great', 'wonderful', 'amazing'],
            'Content': ['good', 'fine', 'okay', 'content', 'satisfied'],
            'Peaceful': ['calm', 'relaxed', 'peaceful', 'serene'],
            'Anxiety': ['anxious', 'worried', 'nervous', 'panic', 'fear'],
            'Stress': ['stressed', 'overwhelmed', 'pressure', 'tense'],
            'Sadness': ['sad', 'down', 'unhappy', 'crying', 'tears'],
            'Anger': ['angry', 'frustrated', 'annoyed', 'irritated'],
            'Depression': ['hopeless', 'empty', 'numb', 'worthless'],
            'Fatigue': ['tired', 'exhausted', 'drained', 'sleepy']
        }
        
        for emotion, keywords in emotion_keywords.items():
            if any(kw in notes_lower for kw in keywords):
                return emotion
        
        # Fallback based on sentiment
        if sentiment > 0.3:
            return 'Content'
        elif sentiment < -0.3:
            return 'Distress'
        else:
            return 'Neutral'

    def _calculate_risk_score(self, mood, stress, anxiety, sleep, notes, sentiment):
        """
        Calculate mental health risk score (0-100)
        Higher score = higher risk
        """
        risk = 0
        
        # 1. Stress contribution (0-25 points)
        risk += (stress / 10) * 25
        
        # 2. Anxiety contribution (0-25 points)
        risk += (anxiety / 10) * 25
        
        # 3. Sleep contribution (0-20 points)
        # Optimal sleep is 7-9 hours
        if sleep < 5:
            risk += 20
        elif sleep < 6:
            risk += 15
        elif sleep < 7:
            risk += 10
        elif sleep > 10:
            risk += 10  # Oversleeping can indicate depression
        
        # 4. Mood contribution (0-15 points)
        mood_lower = mood.lower().strip()
        negative_moods = ['sad', 'depressed', 'anxious', 'angry', 'stressed']
        if mood_lower in negative_moods:
            risk += 15
        elif mood_lower in ['tired', 'neutral']:
            risk += 7
        
        # 5. Sentiment contribution (0-15 points)
        # Negative sentiment adds risk
        if sentiment < 0:
            risk += abs(sentiment) * 15
        
        # 6. Concern keywords in notes (bonus risk)
        notes_lower = notes.lower()
        concern_count = sum(1 for kw in self.CONCERN_KEYWORDS if kw in notes_lower)
        risk += min(concern_count * 5, 15)  # Max 15 bonus points
        
        # Ensure risk is between 0-100
        return max(0, min(100, risk))

    def get_risk_level(self, risk_score):
        """Convert risk score to risk level label"""
        if risk_score >= 75:
            return 'Critical'
        elif risk_score >= 60:
            return 'High'
        elif risk_score >= 40:
            return 'Moderate'
        else:
            return 'Low'
