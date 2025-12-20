# Implementation Plan: System Administrator Comprehensive Dashboard

## Overview

Implement a comprehensive System Administrator dashboard that displays patients, AI analysis, doctor assignments, and all users in organized, searchable, sortable tables.

## Tasks

- [ ] 1. Create comprehensive dashboard HTML structure
  - Create `admin-dashboard-comprehensive.html` with tab navigation
  - Add header with role badge and navigation
  - Create containers for each table (Patients, AI Analysis, Sessions, Users)
  - Add search/filter bars for each table
  - Add pagination controls
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 6.1_

- [ ] 2. Implement Patients Data Table
  - [ ] 2.1 Create API endpoint to fetch patients data
    - Add new endpoint in `backend/api.php` to get patients with all fields
    - _Requirements: 1.1, 1.2_
  
  - [ ] 2.2 Implement Patients table rendering
    - Fetch patients from API
    - Display columns: User ID, Full Name, Email, Phone, Gender, Date of Birth, Preferences
    - Implement search by name/email
    - Implement sort by any column
    - _Requirements: 1.2, 1.4, 1.5_
  
  - [ ]* 2.3 Write property test for Patients data completeness
    - **Property 1: Patient Data Completeness**
    - **Validates: Requirements 1.1, 1.2**

- [ ] 3. Implement AI Analysis Data Table
  - [ ] 3.1 Create API endpoint to fetch AI analysis with patient names
    - Add endpoint in `backend/api.php` to join ai_analysis with users table
    - Return: Analysis ID, Patient Name, Patient ID, Risk Score, Sentiment, Emotion, Timestamp
    - _Requirements: 2.1, 2.2_
  
  - [ ] 3.2 Implement AI Analysis table rendering
    - Fetch AI analysis data from API
    - Display all required columns
    - Implement color-coded risk levels (Red >70, Yellow 40-70, Green <40)
    - Implement search by patient name/emotion
    - Implement sort by Risk Score, Sentiment, Timestamp
    - _Requirements: 2.2, 2.3, 2.4, 2.5_
  
  - [ ]* 3.3 Write property test for risk level color accuracy
    - **Property 2: AI Analysis Risk Level Accuracy**
    - **Validates: Requirements 2.3**

- [ ] 4. Implement Sessions/Doctor Assignment Table
  - [ ] 4.1 Create API endpoint to fetch sessions with patient and counsellor names
    - Add endpoint in `backend/api.php` to join sessions with users and counsellors tables
    - Return: Session ID, Patient Name, Patient ID, Counsellor Name, Counsellor ID, Session Time, Status
    - _Requirements: 3.1, 3.2_
  
  - [ ] 4.2 Implement Sessions table rendering
    - Fetch sessions data from API
    - Display all required columns
    - Implement search by patient/counsellor name
    - Implement sort by Session Date, Patient Name, Counsellor Name
    - Show session status indicators
    - _Requirements: 3.2, 3.3, 3.4_
  
  - [ ]* 4.3 Write property test for patient-doctor relationship
    - **Property 3: Session Patient-Doctor Relationship**
    - **Validates: Requirements 3.2, 3.3**

- [ ] 5. Implement All Users by Designation Table
  - [ ] 5.1 Create API endpoint to fetch all users
    - Add endpoint in `backend/api.php` to get all users with all fields
    - _Requirements: 4.1, 4.2_
  
  - [ ] 5.2 Implement Users table rendering
    - Fetch all users from API
    - Display columns: User ID, Full Name, Email, Designation, Phone, Date of Birth
    - Implement designation filter dropdown
    - Implement search by name/email/designation
    - Implement sort by any column
    - Add designation badges with color coding
    - _Requirements: 4.2, 4.3, 4.4, 4.5_
  
  - [ ]* 5.3 Write property test for designation filtering
    - **Property 4: User Designation Filtering**
    - **Validates: Requirements 4.3, 4.4**

- [ ] 6. Implement shared table features
  - [ ] 6.1 Create reusable table component with search/sort/filter
    - Implement generic table rendering function
    - Implement search functionality for all tables
    - Implement sort functionality for all tables
    - _Requirements: 1.4, 1.5, 2.4, 2.5, 3.4, 4.5_
  
  - [ ] 6.2 Implement tab navigation
    - Add click handlers for tab switching
    - Load appropriate table data when tab is clicked
    - Highlight active tab
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [ ]* 6.3 Write property test for search accuracy
    - **Property 5: Search Functionality Accuracy**
    - **Validates: Requirements 1.5, 2.5, 3.4, 4.5**
  
  - [ ]* 6.4 Write property test for sort consistency
    - **Property 6: Sort Order Consistency**
    - **Validates: Requirements 1.4, 2.4, 3.4, 4.5**

- [ ] 7. Implement access control and security
  - [ ] 7.1 Add permission check on page load
    - Check if user is System Administrator
    - Redirect to dashboard if not authorized
    - _Requirements: 9.1, 9.3_
  
  - [ ] 7.2 Add session verification
    - Verify user session is valid
    - Redirect to login if session expired
    - _Requirements: 9.2_
  
  - [ ]* 7.3 Write property test for access control
    - **Property 7: Access Control Enforcement**
    - **Validates: Requirements 9.1, 9.3**

- [ ] 8. Implement data loading and error handling
  - [ ] 8.1 Create data loading functions
    - Implement API calls for each table
    - Add loading indicators
    - Add error handling with retry functionality
    - Implement fallback to mock data
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [ ] 8.2 Implement error states
    - Display error messages for failed API calls
    - Display empty state messages
    - Display "no results" messages for searches
    - _Requirements: 7.3_
  
  - [ ]* 8.3 Write property test for data freshness
    - **Property 8: Data Freshness**
    - **Validates: Requirements 7.1, 7.2**

- [ ] 9. Checkpoint - Ensure all tables load and display correctly
  - Verify all four tables (Patients, AI Analysis, Sessions, Users) load with data
  - Verify tab switching works correctly
  - Verify search and sort work on all tables
  - Verify access control redirects unauthorized users
  - Ask the user if questions arise

- [ ] 10. Integrate with existing admin panel
  - [ ] 10.1 Add link to comprehensive dashboard from admin.html
    - Add button/link in admin panel to access comprehensive view
    - _Requirements: 6.1_
  
  - [ ] 10.2 Ensure consistent styling with existing admin panel
    - Use same color scheme and CSS classes
    - Maintain responsive design
    - _Requirements: All_

- [ ] 11. Final checkpoint - Ensure all tests pass
  - Run all property-based tests
  - Run all unit tests
  - Verify all features work as expected
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional property-based tests and can be skipped for faster MVP
- Each table should support search, sort, and filter independently
- Use API endpoints for data fetching with fallback to mock data
- Implement pagination for large datasets (50 rows per page)
- Maintain consistent styling with existing admin panel
- All data should be fetched from harmony_db database via API

