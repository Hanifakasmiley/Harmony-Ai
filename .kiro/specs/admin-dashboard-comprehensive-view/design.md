# Design: System Administrator Comprehensive Dashboard

## Overview

The System Administrator Comprehensive Dashboard provides a unified view of all critical data from the harmony_db database. It displays four main sections:
1. **Patients Data** - All patient information with search and sort
2. **AI Analysis Data** - Risk scores and sentiment analysis linked to patients
3. **Doctor/Counsellor Assignment** - Sessions showing patient-doctor relationships
4. **All Users by Designation** - Users grouped by their role

The dashboard uses a tab-based navigation system to switch between different data views, with each table supporting search, filtering, and sorting capabilities.

## Architecture

### Frontend Components

```
admin-dashboard-comprehensive.html
├── Navigation Bar (with theme toggle, logout)
├── Header Section (title, role badge)
├── Tab Navigation (Patients, AI Analysis, Sessions, Users)
└── Data Display Section
    ├── Search/Filter Bar
    ├── Data Table
    ├── Pagination Controls
    └── Loading/Error States
```

### Data Flow

```
User Access → Permission Check → Load API Data → Render Tables
                                        ↓
                                   Fallback to Mock Data
```

## Components and Interfaces

### 1. Patients Table Component

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

### Property 1: Patient Data Completeness
**For any** patient displayed in the Patients table, all required fields (User ID, Full Name, Email) SHALL be present and non-empty.
**Validates: Requirements 1.1, 1.2**

### Property 2: AI Analysis Risk Level Accuracy
**For any** AI analysis record, the Risk Level badge color SHALL correctly correspond to the Risk Score (Red if >70, Yellow if 40-70, Green if <40).
**Validates: Requirements 2.3**

### Property 3: Session Patient-Doctor Relationship
**For any** session displayed in the Sessions table, the Patient Name and Counsellor Name SHALL match their respective IDs from the database.
**Validates: Requirements 3.2, 3.3**

### Property 4: User Designation Filtering
**For any** designation filter applied to the Users table, only users with that exact designation SHALL be displayed.
**Validates: Requirements 4.3, 4.4**

### Property 5: Search Functionality Accuracy
**For any** search query entered in a table, only records containing the search term in searchable columns SHALL be displayed.
**Validates: Requirements 1.5, 2.5, 3.4, 4.5**

### Property 6: Sort Order Consistency
**For any** column sorted in ascending order, each row's value SHALL be less than or equal to the next row's value for that column.
**Validates: Requirements 1.4, 2.4, 3.4, 4.5**

### Property 7: Access Control Enforcement
**For any** non-System Administrator user attempting to access the comprehensive dashboard, the system SHALL redirect them to the regular dashboard.
**Validates: Requirements 9.1, 9.3**

### Property 8: Data Freshness
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

