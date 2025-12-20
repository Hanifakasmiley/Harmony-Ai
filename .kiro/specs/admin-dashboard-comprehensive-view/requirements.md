# Requirements: System Administrator Comprehensive Dashboard

## Introduction

The System Administrator Dashboard needs to display comprehensive data from all tables in the harmony_db database in organized, easy-to-read tables. This allows administrators to monitor all system data including patients, AI analysis results, doctor assignments, and user information across all designations.

## Glossary

- **System Administrator**: User with designation 'System Administrator' who can access all data
- **Patient**: User with designation 'Patient/User' who logs daily mood/stress data
- **Counsellor/Doctor**: User with designation 'Mental Health Administrator' or similar who conducts sessions
- **AI Analysis**: Risk scores and sentiment analysis generated from patient data
- **Session**: A counselling session between a patient and a counsellor
- **Daily Log**: Patient's daily mood, stress, anxiety, and sleep data
- **Designation**: User role/type in the system (Patient/User, System Administrator, Data Scientist, etc.)

## Requirements

### Requirement 1: Patients Data Table

**User Story:** As a System Administrator, I want to view all patient data in a comprehensive table, so that I can monitor all patients in the system.

#### Acceptance Criteria

1. WHEN the System Administrator accesses the dashboard, THE system SHALL display a "Patients" table showing all users with designation 'Patient/User'
2. THE Patients table SHALL display columns: User ID, Full Name, Email, Phone, Gender, Date of Birth, Preferences
3. WHEN a patient record is displayed, THE system SHALL show all available patient information without truncation (or with expandable rows for long text)
4. THE Patients table SHALL be sortable by any column (User ID, Name, Email, etc.)
5. THE Patients table SHALL have search/filter functionality to find patients by name or email

### Requirement 2: AI Analysis Data Table

**User Story:** As a System Administrator, I want to view AI analysis results linked to patients, so that I can monitor risk scores and emotional states.

#### Acceptance Criteria

1. WHEN the System Administrator views the AI Analysis section, THE system SHALL display a table with all AI analysis records
2. THE AI Analysis table SHALL display columns: Analysis ID, Patient Name, Patient ID, Risk Score, Risk Level (High/Medium/Low), Sentiment Value, Emotion Label, Analysis Timestamp
3. WHEN a risk score is displayed, THE system SHALL color-code it (Red for High >70, Yellow for Medium 40-70, Green for Low <40)
4. THE AI Analysis table SHALL be sortable by Risk Score, Sentiment, or Timestamp
5. THE AI Analysis table SHALL have search functionality to find records by patient name or emotion label

### Requirement 3: Doctor/Counsellor Assignment Table

**User Story:** As a System Administrator, I want to see which doctors are assigned to which patients through sessions, so that I can manage counsellor workload.

#### Acceptance Criteria

1. WHEN the System Administrator views the Sessions section, THE system SHALL display a table showing all sessions
2. THE Sessions table SHALL display columns: Session ID, Patient Name, Patient ID, Counsellor Name, Counsellor ID, Session Date/Time, Session Status (Completed/Scheduled/Cancelled)
3. THE Sessions table SHALL show the relationship between patients and their assigned counsellors
4. THE Sessions table SHALL be sortable by Session Date, Patient Name, or Counsellor Name
5. THE Sessions table SHALL have search functionality to find sessions by patient or counsellor name

### Requirement 4: All Users by Designation Table

**User Story:** As a System Administrator, I want to view all users grouped by their designation, so that I can manage different user types in the system.

#### Acceptance Criteria

1. WHEN the System Administrator views the Users section, THE system SHALL display a table with all users in the system
2. THE Users table SHALL display columns: User ID, Full Name, Email, Designation, Phone, Date of Birth
3. THE Users table SHALL allow filtering by Designation (Patient/User, System Administrator, Data Scientist, Mental Health Administrator, etc.)
4. WHEN a designation filter is applied, THE system SHALL display only users with that designation
5. THE Users table SHALL be sortable by any column
6. THE Users table SHALL have search functionality to find users by name, email, or designation

### Requirement 5: Additional Data Tables

**User Story:** As a System Administrator, I want to view other important data tables, so that I have complete visibility into all system data.

#### Acceptance Criteria

1. WHEN the System Administrator accesses the dashboard, THE system SHALL provide access to additional tables: Daily Logs, Progress, Feedback, Recommendations, Crisis Alerts, Emergency Contacts
2. EACH additional table SHALL display all relevant columns from the database
3. EACH table SHALL be sortable and searchable
4. THE Daily Logs table SHALL show: Log ID, Patient Name, Mood Level, Stress Level, Anxiety Level, Sleep Hours, Log Date
5. THE Progress table SHALL show: Progress ID, Patient Name, Emotional Stability Score, Improvement %, Trend Notes
6. THE Crisis Alerts table SHALL show: Alert ID, Patient Name, Risk Level, Alert Timestamp, Contacted Counsellor Name

### Requirement 6: Dashboard Navigation

**User Story:** As a System Administrator, I want to easily navigate between different data tables, so that I can quickly access the information I need.

#### Acceptance Criteria

1. WHEN the System Administrator is on the dashboard, THE system SHALL display tabs or buttons for each data section (Patients, AI Analysis, Sessions, Users, Daily Logs, Progress, Feedback, Recommendations, Crisis Alerts, Emergency Contacts)
2. WHEN a tab is clicked, THE system SHALL load and display the corresponding table
3. THE active tab SHALL be visually highlighted
4. THE system SHALL remember the last viewed tab during the session

### Requirement 7: Data Refresh and Real-time Updates

**User Story:** As a System Administrator, I want the dashboard data to be current, so that I can make decisions based on up-to-date information.

#### Acceptance Criteria

1. WHEN the dashboard loads, THE system SHALL fetch all data from the database API
2. WHEN the user clicks a refresh button, THE system SHALL reload all data from the API
3. THE system SHALL display a loading indicator while fetching data
4. IF the API fails, THE system SHALL display a fallback message and optionally use cached/mock data

### Requirement 8: Data Export and Reporting

**User Story:** As a System Administrator, I want to export dashboard data, so that I can create reports and share information.

#### Acceptance Criteria

1. WHEN viewing any table, THE system SHALL provide an "Export to CSV" button
2. WHEN the Export button is clicked, THE system SHALL download the table data as a CSV file
3. THE CSV file SHALL include all columns and rows currently displayed in the table
4. THE CSV file name SHALL include the table name and current date (e.g., "patients_2025-12-20.csv")

### Requirement 9: Access Control

**User Story:** As a System Administrator, I want the comprehensive dashboard to be protected, so that only authorized users can access sensitive data.

#### Acceptance Criteria

1. WHEN a non-System Administrator user tries to access the comprehensive dashboard, THE system SHALL redirect them to the regular dashboard
2. WHEN a user is not logged in, THE system SHALL redirect them to the login page
3. THE system SHALL verify the user's designation before displaying any data
4. IF the user's session expires, THE system SHALL redirect them to login

### Requirement 10: Performance and Optimization

**User Story:** As a System Administrator, I want the dashboard to load quickly, so that I can efficiently manage the system.

#### Acceptance Criteria

1. WHEN the dashboard loads, THE system SHALL display initial data within 2 seconds
2. WHEN switching between tabs, THE system SHALL load new data within 1 second
3. THE system SHALL implement pagination for large tables (e.g., 50 rows per page)
4. THE system SHALL cache data to reduce API calls when possible
5. THE system SHALL display row counts (e.g., "Showing 1-50 of 250 records")

