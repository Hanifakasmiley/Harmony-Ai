"""
Harmony AI - AI Service REST API
Provides endpoints for triggering and retrieving AI analysis
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from ai_analyzer import AIAnalyzer
from ai_service import AIService
from config import SERVICE_PORT

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

analyzer = AIAnalyzer()

@app.route('/')
def home():
    return jsonify({
        'service': 'Harmony AI Analysis Service',
        'version': '1.0.0',
        'status': 'running',
        'endpoints': {
            '/analyze': 'POST - Analyze a single log entry',
            '/analyze/user/<user_id>': 'GET - Get analysis for user',
            '/process': 'POST - Process all unanalyzed logs',
            '/health': 'GET - Health check'
        }
    })

@app.route('/health')
def health():
    return jsonify({'status': 'healthy', 'service': 'ai-analyzer'})

@app.route('/analyze', methods=['POST'])
def analyze_log():
    """
    Analyze a single log entry
    
    Expected JSON body:
    {
        "mood_level": "Happy",
        "stress_level": 5,
        "anxiety_level": 4,
        "sleep_hours": 7,
        "notes": "Feeling good today"
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        result = analyzer.analyze_log(data)
        result['risk_level'] = analyzer.get_risk_level(result['risk_score'])
        
        return jsonify({
            'success': True,
            'analysis': result
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/analyze/user/<int:user_id>')
def analyze_user(user_id):
    """Get AI analysis for all logs of a specific user"""
    try:
        service = AIService()
        if not service.connect_db():
            return jsonify({'error': 'Database connection failed'}), 500
        
        results = service.analyze_user_logs(user_id)
        service.disconnect_db()
        
        # Add risk level to each result
        for r in results:
            r['risk_level'] = analyzer.get_risk_level(r['risk_score'])
        
        return jsonify({
            'success': True,
            'user_id': user_id,
            'count': len(results),
            'analyses': results
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/process', methods=['POST'])
def process_logs():
    """Process all unanalyzed daily logs"""
    try:
        service = AIService()
        if not service.connect_db():
            return jsonify({'error': 'Database connection failed'}), 500
        
        processed = service.process_all_unanalyzed()
        service.disconnect_db()
        
        return jsonify({
            'success': True,
            'processed_count': processed,
            'message': f'Processed {processed} logs'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/analyze/realtime', methods=['POST'])
def realtime_analysis():
    """
    Real-time analysis without saving to database
    Used for showing instant feedback when user submits a log
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        result = analyzer.analyze_log(data)
        risk_level = analyzer.get_risk_level(result['risk_score'])
        
        # Generate feedback message
        if result['risk_score'] >= 75:
            feedback = "We notice you might be going through a difficult time. Please consider reaching out to a counselor."
        elif result['risk_score'] >= 60:
            feedback = "Your stress levels seem elevated. Remember to take breaks and practice self-care."
        elif result['risk_score'] >= 40:
            feedback = "You're doing okay, but there's room for improvement. Keep tracking your progress!"
        else:
            feedback = "Great job! Your mental wellness indicators look positive. Keep it up!"
        
        return jsonify({
            'success': True,
            'analysis': {
                **result,
                'risk_level': risk_level,
                'feedback': feedback
            }
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    print("=" * 50)
    print("🧠 Harmony AI - Analysis API Server")
    print(f"   Running on http://localhost:{SERVICE_PORT}")
    print("=" * 50)
    app.run(host='0.0.0.0', port=SERVICE_PORT, debug=True)
