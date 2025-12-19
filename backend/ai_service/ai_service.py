"""
Harmony AI - AI Analysis Service
Monitors daily logs and generates AI analysis records
"""

import mysql.connector
from mysql.connector import Error
from datetime import datetime, timedelta
from ai_analyzer import AIAnalyzer
from config import DB_CONFIG

class AIService:
    """Service to process daily logs and create AI analysis"""
    
    def __init__(self):
        self.analyzer = AIAnalyzer()
        self.connection = None
    
    def connect_db(self):
        """Establish database connection"""
        try:
            self.connection = mysql.connector.connect(**DB_CONFIG)
            if self.connection.is_connected():
                print("✅ Connected to MySQL database")
                return True
        except Error as e:
            print(f"❌ Database connection error: {e}")
            return False
    
    def disconnect_db(self):
        """Close database connection"""
        if self.connection and self.connection.is_connected():
            self.connection.close()
            print("Database connection closed")
    
    def get_unanalyzed_logs(self):
        """Get daily logs that don't have corresponding AI analysis"""
        query = """
            SELECT d.log_id, d.user_id, d.mood_level, d.stress_level, 
                   d.anxiety_level, d.sleep_hours, d.notes, d.log_date
            FROM dailylogs d
            LEFT JOIN ai_analysis a ON d.user_id = a.user_id 
                AND DATE(d.log_date) = DATE(a.created_at)
            WHERE a.analysis_id IS NULL
            ORDER BY d.log_date DESC
        """
        try:
            cursor = self.connection.cursor(dictionary=True)
            cursor.execute(query)
            logs = cursor.fetchall()
            cursor.close()
            return logs
        except Error as e:
            print(f"Error fetching logs: {e}")
            return []
    
    def get_all_logs_for_user(self, user_id):
        """Get all daily logs for a specific user"""
        query = """
            SELECT log_id, user_id, mood_level, stress_level, 
                   anxiety_level, sleep_hours, notes, log_date
            FROM dailylogs
            WHERE user_id = %s
            ORDER BY log_date DESC
        """
        try:
            cursor = self.connection.cursor(dictionary=True)
            cursor.execute(query, (user_id,))
            logs = cursor.fetchall()
            cursor.close()
            return logs
        except Error as e:
            print(f"Error fetching user logs: {e}")
            return []

    def save_analysis(self, user_id, analysis_result):
        """Save AI analysis result to database"""
        query = """
            INSERT INTO ai_analysis (user_id, risk_score, sentiment_value, emotion_label)
            VALUES (%s, %s, %s, %s)
        """
        try:
            cursor = self.connection.cursor()
            cursor.execute(query, (
                user_id,
                analysis_result['risk_score'],
                analysis_result['sentiment_value'],
                analysis_result['emotion_label']
            ))
            self.connection.commit()
            analysis_id = cursor.lastrowid
            cursor.close()
            print(f"  ✅ Analysis saved (ID: {analysis_id})")
            return analysis_id
        except Error as e:
            print(f"  ❌ Error saving analysis: {e}")
            return None
    
    def process_log(self, log):
        """Process a single daily log and generate analysis"""
        print(f"\n📊 Analyzing log #{log['log_id']} for user #{log['user_id']}")
        print(f"   Mood: {log['mood_level']}, Stress: {log['stress_level']}, "
              f"Anxiety: {log.get('anxiety_level', 'N/A')}, Sleep: {log['sleep_hours']}h")
        
        # Run AI analysis
        result = self.analyzer.analyze_log(log)
        
        print(f"   → Risk Score: {result['risk_score']}")
        print(f"   → Sentiment: {result['sentiment_value']}")
        print(f"   → Emotion: {result['emotion_label']}")
        
        # Save to database
        return self.save_analysis(log['user_id'], result)
    
    def process_all_unanalyzed(self):
        """Process all daily logs that haven't been analyzed yet"""
        logs = self.get_unanalyzed_logs()
        
        if not logs:
            print("✓ No new logs to analyze")
            return 0
        
        print(f"\n🔍 Found {len(logs)} unanalyzed logs")
        
        processed = 0
        for log in logs:
            if self.process_log(log):
                processed += 1
        
        print(f"\n✅ Processed {processed}/{len(logs)} logs")
        return processed
    
    def analyze_user_logs(self, user_id):
        """Analyze all logs for a specific user (re-analyze)"""
        logs = self.get_all_logs_for_user(user_id)
        
        if not logs:
            print(f"No logs found for user #{user_id}")
            return []
        
        results = []
        for log in logs:
            result = self.analyzer.analyze_log(log)
            result['log_id'] = log['log_id']
            result['log_date'] = log['log_date']
            results.append(result)
        
        return results
    
    def run_once(self):
        """Run analysis once and exit"""
        if not self.connect_db():
            return False
        
        try:
            self.process_all_unanalyzed()
            return True
        finally:
            self.disconnect_db()


def main():
    """Main entry point"""
    print("=" * 50)
    print("🧠 Harmony AI - Analysis Service")
    print("=" * 50)
    
    service = AIService()
    service.run_once()
    
    print("\n✅ Analysis complete!")


if __name__ == "__main__":
    main()
