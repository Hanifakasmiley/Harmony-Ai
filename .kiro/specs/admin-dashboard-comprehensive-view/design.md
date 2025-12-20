# Design: System Administrator Comprehensive Dashboard

## Overview

The System Administrator Comprehensive Dashboard provides a unified view of all critical data from the harmony_db database. It displays:

1. **KPI Cards** - Key performance indicators showing system health at a glance
2. **Trend Chart** - Visual representation of mood trends over the last 7 days
3. **Recent Activity Feed** - Latest system events and activities
4. **Data Tables** - Detailed views of patients, AI analysis, sessions, and users

The dashboard uses a professional layout with KPIs at the top, followed by charts and activity feed, with tab-based navigation for detailed data tables below.

## Architecture

### Frontend Components

```
admin-dashboard-comprehensive.html
├── Navigation Bar (with theme toggle, logout)
├── Header Section (title, role badge)
├── KPI Cards Section
│   ├── Total Users Card
│   ├── Active Patients Card
│   ├── Total Sessions Card
│   ├── High-Risk Alerts Card
│   ├── Average Mood Score Card
│   └── Counsellor Utilization Card
├── Dashboard Summary Section
│   ├── System Status
│   ├── Last Refresh Time
│   ├── Active Sessions Today
│   ├── New Alerts Today
│   └── Refresh Button
├── Charts Section
│   └── Mood Trend Chart (7-day line chart)
├── Recent Activity Feed
│   └── Activity Items (with timestamps and icons)
├── Tab Navigation (Patients, AI Analysis, Sessions, Users)
└── Data Display Section
    ├── Search/Filter Bar
    ├── Data Table
    ├── Pagination Controls
    └── Loading/Error States
```

### Data Flow

```
User Access → Permission Check → Load KPI Data → Render KPIs
                                        ↓
                                   Load Chart Data → Render Chart
                                        ↓
                                   Load Activity Data → Render Feed
                                        ↓
                                   Load Table Data → Render Tables
                                        ↓
                                   Fallback to Mock Data (if API fails)
```

## Components and Interfaces

### 1. KPI Cards Component

**Purpose:** Display key performance indicators for quick system health assessment

**Data Sources:** 
- `users` table (for Total Users count)
- `users` table filtered by designation (for Active Patients count)
- `sessions` table (for Total Sessions count)
- `ai_analysis` table (for High-Risk Alerts count where risk_score > 70)
- `dailylogs` table (for Average Mood Score)
- `sessions` table (for Counsellor Utilization Rate)

**KPI Cards:**

1. **Total Users**
   - Value: Count of all users
   - Trend: % change from previous week
   - Color: Green if stable/increasing, Yellow if decreasing

2. **Active Patients**
   - Value: Count of users with designation 'Patient/User'
   - Trend: % change from previous week
   - Color: Green if increasing, Yellow if stable, Red if decreasing

3. **Total Sessions**
   - Value: Count of all sessions
   - Trend: % change from previous week
   - Color: Green if increasing, Yellow if stable

4. **High-Risk Alerts**
   - Value: Count of AI analysis records with risk_score > 70
   - Trend: % change from previous week
   - Color: Red if increasing, Yellow if stable, Green if decreasing

5. **Average Mood Score**
   - Value: Average of all mood_level values from dailylogs (1-10 scale)
   - Trend: % change from previous week
   - Color: Green if > 6, Yellow if 4-6, Red if < 4

6. **Counsellor Utilization Rate**
   - Value: (Total Sessions / (Counsellors Count * 10)) * 100 (percentage)
   - Trend: % change from previous week
   - Color: Green if 70-90%, Yellow if 50-70% or >90%, Red if <50%

### 2. Dashboard Summary Component

**Purpose:** Display system status and quick actions

**Data Sources:**
- API health check
- Last data refresh timestamp
- `sessions` table (for today's sessions)
- `crisisalerts` table (for today's alerts)

**Display Elements:**
- System Status: Online/Offline indicator
- Last Refresh: Timestamp of last data update
- Active Sessions Today: Count of sessions with today's date
- New Alerts Today: Count of crisis alerts with today's date
- Refresh Button: Manual data refresh trigger

### 3. Mood Trend Chart Component

**Purpose:** Visualize mood trends over the last 7 days

**Data Source:** `dailylogs` table (last 7 days of data)

**Chart Type:** Line chart with area fill

**Data Points:**
- X-axis: Date (last 7 days)
- Y-axis: Average mood score (1-10 scale)
- Line: Daily average mood
- Trend Line: 7-day trend indicator

**Features:**
- Interactive tooltips on hover
- Color gradient (Red for low mood, Yellow for medium, Green for high)
- Legend showing mood line and trend line
- Responsive sizing

### 4. Recent Activity Feed Component

**Purpose:** Display recent system events and activities

**Data Sources:**
- `users` table (for new registrations)
- `sessions` table (for new sessions)
- `crisisalerts` table (for crisis alerts)
- `dailylogs` table (for significant mood changes)
- `ai_analysis` table (for new analysis)

**Activity Types:**

1. **New User Registration**
   - Icon: 👤
   - Color: Blue
   - Message: "New user registered: [User Name]"
   - Timestamp: User creation time

2. **New Session Scheduled**
   - Icon: 📅
   - Color: Green
   - Message: "[Patient Name] scheduled session with [Counsellor Name]"
   - Timestamp: Session time

3. **Crisis Alert Triggered**
   - Icon: 🚨
   - Color: Red
   - Message: "Crisis alert for [Patient Name] - Risk Level: [Level]"
   - Timestamp: Alert timestamp

4. **Significant Mood Change**
   - Icon: 📊
   - Color: Orange
   - Message: "[Patient Name]'s mood changed from [Old] to [New]"
   - Timestamp: Log timestamp

5. **Counsellor Assigned**
   - Icon: 👨‍⚕️
   - Color: Purple
   - Message: "[Counsellor Name] assigned to [Patient Name]"
   - Timestamp: Assignment time

**Features:**
- Sortable by timestamp (newest first)
- Clickable items that navigate to relevant records
- Auto-refresh every 30 seconds
- Maximum 10 items displayed
- "View All" link to see full activity history

### 5. Patients Table Component

**Purpose:** Display all patients with their basic information

**Data Source:** `users` table (filtered by designation = 'Patient/User')

**Columns:**
- User ID
- Full Name
- Email
- Phone
- Gender
- Date of Birth
- Preferences (truncated with expand option)

**Features:**
- Sortable by any column
- Search by name or email
- Color-coded status indicators

### 2. AI Analysis Table Component

**Purpose:** Display AI analysis results linked to patients

**Data Source:** `ai_analysis` table joined with `users` table

**Columns:**
- Analysis ID
- Patient Name (from users table)
- Patient ID
- Risk Score (0-100)
- Risk Level (High/Medium/Low - color-coded)
- Sentiment Value (-1 to 1)
- Emotion Label
- Analysis Timestamp

**Features:**
- Sortable by Risk Score, Sentiment, Timestamp
- Search by patient name or emotion
- Color-coded risk levels (Red >70, Yellow 40-70, Green <40)

### 3. Sessions/Doctor Assignment Table Component

**Purpose:** Show which doctors are assigned to which patients

**Data Source:** `sessions` table joined with `users` and `counsellors` tables

**Columns:**
- Session ID
- Patient Name (from users table)
- Patient ID
- Counsellor Name (from counsellors table)
- Counsellor ID
- Session Date/Time
- Session Status (Completed/Scheduled)

**Features:**
- Sortable by Session Date, Patient Name, Counsellor Name
- Search by patient or counsellor name
- Status indicators

### 4. All Users by Designation Table Component

**Purpose:** Display all users grouped by designation

**Data Source:** `users` table

**Columns:**
- User ID
- Full Name
- Email
- Designation
- Phone
- Date of Birth

**Features:**
- Filterable by Designation
- Sortable by any column
- Search by name, email, or designation
- Designation badges with color coding

## Data Models

### Patient Data Model
```javascript
{
  user_id: number,
  full_name: string,
  email: string,
  phone: string,
  gender: string,
  date_of_birth: string (YYYY-MM-DD),
  designation: string,
  preferences: string
}
```

### AI Analysis Data Model
```javascript
{
  analysis_id: number,
  user_id: number,
  patient_name: string,
  risk_score: number (0-100),
  risk_level: string (High/Medium/Low),
  sentiment_value: number (-1 to 1),
  emotion_label: string,
  created_at: string (timestamp)
}
```

### Session Data Model
```javascript
{
  session_id: number,
  user_id: number,
  patient_name: string,
  counsellor_id: number,
  counsellor_name: string,
  session_time: string (datetime),
  session_status: string (Completed/Scheduled),
  session_notes: string
}
```

### User Data Model
```javascript
{
  user_id: number,
  full_name: string,
  email: string,
  designation: string,
  phone: string,
  date_of_birth: string (YYYY-MM-DD)
}
```

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: KPI Card Accuracy
**For any** KPI card displayed on the dashboard, the metric value SHALL match the count/average from the database within the last 5 seconds.
**Validates: Requirements 11.2, 11.3**

### Property 2: KPI Trend Calculation
**For any** KPI card with a trend indicator, the percentage change SHALL be correctly calculated as (current_value - previous_value) / previous_value * 100.
**Validates: Requirements 11.4**

### Property 3: KPI Color Coding
**For any** KPI card, the color SHALL correctly correspond to the status (Green for healthy, Yellow for warning, Red for critical) based on the defined thresholds.
**Validates: Requirements 11.5**

### Property 4: Mood Trend Chart Data Accuracy
**For any** day displayed in the mood trend chart, the average mood value SHALL match the average of all mood_level entries for that day from the dailylogs table.
**Validates: Requirements 12.2**

### Property 5: Mood Trend Chart Completeness
**For any** 7-day period, the mood trend chart SHALL display data for all 7 days (or fewer if insufficient data exists).
**Validates: Requirements 12.1, 12.2**

### Property 6: Recent Activity Feed Accuracy
**For any** activity item displayed in the feed, the event description and timestamp SHALL match the source data from the database.
**Validates: Requirements 13.2, 13.3**

### Property 7: Recent Activity Feed Ordering
**For any** recent activity feed, items SHALL be ordered by timestamp in descending order (newest first).
**Validates: Requirements 13.5**

### Property 8: Recent Activity Feed Limit
**For any** recent activity feed, the number of displayed items SHALL not exceed 10.
**Validates: Requirements 13.1**

### Property 9: Dashboard Summary Accuracy
**For any** dashboard summary metric, the displayed value SHALL match the current state of the database.
**Validates: Requirements 14.2**

### Property 10: Patient Data Completeness
**For any** patient displayed in the Patients table, all required fields (User ID, Full Name, Email) SHALL be present and non-empty.
**Validates: Requirements 1.1, 1.2**

### Property 11: AI Analysis Risk Level Accuracy
**For any** AI analysis record, the Risk Level badge color SHALL correctly correspond to the Risk Score (Red if >70, Yellow if 40-70, Green if <40).
**Validates: Requirements 2.3**

### Property 12: Session Patient-Doctor Relationship
**For any** session displayed in the Sessions table, the Patient Name and Counsellor Name SHALL match their respective IDs from the database.
**Validates: Requirements 3.2, 3.3**

### Property 13: User Designation Filtering
**For any** designation filter applied to the Users table, only users with that exact designation SHALL be displayed.
**Validates: Requirements 4.3, 4.4**

### Property 14: Search Functionality Accuracy
**For any** search query entered in a table, only records containing the search term in searchable columns SHALL be displayed.
**Validates: Requirements 1.5, 2.5, 3.4, 4.5**

### Property 15: Sort Order Consistency
**For any** column sorted in ascending order, each row's value SHALL be less than or equal to the next row's value for that column.
**Validates: Requirements 1.4, 2.4, 3.4, 4.5**

### Property 16: Access Control Enforcement
**For any** non-System Administrator user attempting to access the comprehensive dashboard, the system SHALL redirect them to the regular dashboard.
**Validates: Requirements 9.1, 9.3**

### Property 17: Data Freshness
**For any** dashboard load or refresh action, the displayed data SHALL match the current state of the database within 5 seconds.
**Validates: Requirements 7.1, 7.2**

## Error Handling

### API Failures
- If API call fails, display error message: "Failed to load data. Please try again."
- Provide "Retry" button to reload data
- Fallback to mock data from PatientData if available

### Empty Data States
- If no records found: Display "No records found" message
- If search returns no results: Display "No results match your search"
- If table is empty: Display "No data available"

### Permission Errors
- If user is not System Administrator: Redirect to dashboard.html
- If session expired: Redirect to login.html
- Display appropriate error messages

### Data Validation
- Validate all API responses before rendering
- Handle null/undefined values gracefully
- Truncate long text with ellipsis and expand option

## Testing Strategy

### Unit Tests
- Test table rendering with sample data
- Test search functionality with various inputs
- Test sort functionality for each column
- Test filter functionality for designations
- Test color-coding logic for risk levels
- Test permission checks and redirects

### Property-Based Tests
- **Property 1**: Generate random patient data and verify all required fields are present
- **Property 2**: Generate random risk scores and verify color-coding matches
- **Property 3**: Generate random sessions and verify patient-doctor relationships
- **Property 4**: Generate random users with different designations and verify filtering
- **Property 5**: Generate random search queries and verify only matching records display
- **Property 6**: Generate random data and verify sort order is correct
- **Property 7**: Test with different user designations and verify access control
- **Property 8**: Verify data freshness by comparing timestamps

### Integration Tests
- Test full dashboard load with all tables
- Test tab switching between different views
- Test API fallback to mock data
- Test permission checks on page load
- Test data refresh functionality

