# Harmony AI - AI Analysis Service

Python-based AI service that analyzes daily logs and generates mental health insights.

## Features

- **Sentiment Analysis**: Uses TextBlob NLP to analyze journal notes
- **Emotion Detection**: Identifies emotions from mood and text patterns
- **Risk Scoring**: Calculates mental health risk (0-100) based on multiple factors
- **Real-time Analysis**: API endpoint for instant feedback

## Setup

### 1. Install Python
Download from https://python.org (Python 3.8+)

### 2. Install Dependencies
```bash
cd backend/ai_service
pip install -r requirements.txt
python -m textblob.download_corpora
```

### 3. Configure Database
Edit `config.py` with your MySQL settings:
```python
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'harmony_db',
    'port': 3306
}
```

## Usage

### Option 1: Run API Server (Recommended)
```bash
run_service.bat
```
Or: `python api.py`

API runs on http://localhost:5000

### Option 2: Run Analysis Once
```bash
run_analysis.bat
```
Or: `python ai_service.py`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Service info |
| `/health` | GET | Health check |
| `/analyze` | POST | Analyze single log entry |
| `/analyze/user/<id>` | GET | Get analysis for user |
| `/analyze/realtime` | POST | Real-time analysis with feedback |
| `/process` | POST | Process all unanalyzed logs |

## How Risk Score is Calculated

| Factor | Weight | Description |
|--------|--------|-------------|
| Stress Level | 25% | From daily log (1-10) |
| Anxiety Level | 25% | From daily log (1-10) |
| Sleep Hours | 20% | Optimal: 7-9 hours |
| Mood | 15% | Negative moods add risk |
| Sentiment | 15% | From journal text analysis |
| Keywords | Bonus | Concern words add extra risk |

## Risk Levels

- **Low** (0-39): Good mental wellness
- **Moderate** (40-59): Some concerns
- **High** (60-74): Needs attention
- **Critical** (75-100): Immediate support recommended
