# Candidate Dashboard - Database Schema & API Documentation

This document defines the database schema and REST API endpoints required to support the candidate portal features, including profile management, application status tracking, interview schedules, notifications, and onboarding.

---

## 1. Database Schema

For a relational database system (e.g., PostgreSQL), the following tables are required to back the candidate dashboard:

### `candidates` Table
Extends the basic user account with professional credentials, contact info, and profile details.

```sql
CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    location VARCHAR(150) DEFAULT 'Guwahati, Assam',
    highest_education VARCHAR(100),
    degree_name VARCHAR(150),
    professional_qualification VARCHAR(100),
    professional_qualification_other VARCHAR(255),
    experience VARCHAR(50), -- e.g., '3-5 years'
    current_salary VARCHAR(50), -- e.g., '₹4.5 LPA'
    skills JSONB DEFAULT '[]'::jsonb, -- Array of strings: ["Communication", "CBSE Curriculum"]
    resume_url VARCHAR(512),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `applications` Table
Links candidates to specific jobs they have applied for, and tracks the recruitment funnel.

```sql
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    cover_letter TEXT,
    notice_period VARCHAR(50),
    has_referral BOOLEAN DEFAULT FALSE,
    referral_emp_id VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Under Review' CHECK (status IN ('Under Review', 'Shortlisted', 'Interview Scheduled', 'Offered', 'Rejected', 'Onboarded')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(candidate_id, job_id) -- Prevent duplicate applications to the same job
);
```

### `interviews` Table
Stores interview meetings scheduled for a candidate's application.

```sql
CREATE TABLE interviews (
    id SERIAL PRIMARY KEY,
    application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
    interview_date DATE NOT NULL,
    interview_time TIME NOT NULL,
    mode VARCHAR(20) CHECK (mode IN ('Online', 'In-Person')),
    platform VARCHAR(50), -- e.g., 'Google Meet', 'Zoom', 'None' (if in-person)
    meeting_link VARCHAR(512),
    interviewer_name VARCHAR(150),
    status VARCHAR(20) DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Completed', 'Cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `notifications` Table
Stores personalized updates sent to candidates about their applications.

```sql
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    notification_text VARCHAR(500) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `offers` Table
Stores job offers generated for candidates who successfully clear all rounds.

```sql
CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    application_id INTEGER REFERENCES applications(id) ON DELETE CASCADE,
    salary VARCHAR(50) NOT NULL, -- e.g., '₹5.2 LPA'
    issued_date DATE DEFAULT CURRENT_DATE,
    expiry_date DATE NOT NULL,
    joining_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Accepted', 'Declined')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 2. API Documentation

### Base URL
`https://api.southpointschool.edu/v1`

---

### A. Candidate Profile Management

#### 1. Retrieve Candidate Profile
* **Endpoint**: `GET /profile`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "status": "success",
  "data": {
    "name": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com",
    "phone": "9876543210",
    "location": "Guwahati, Assam",
    "highestEducation": "Postgraduate",
    "degreeName": "M.Sc in Physics",
    "professionalQualification": "B.Ed",
    "professionalQualificationOther": "",
    "experience": "3-5 years",
    "salary": "₹4.5 LPA",
    "skills": ["Physics Instruction", "CBSE Curriculum", "Classroom Management"],
    "resumeUrl": "https://sps-bucket.s3.amazonaws.com/resumes/user_42.pdf"
  }
}
```

#### 2. Update Candidate Profile
* **Endpoint**: `PUT /profile`
* **Headers**: `Authorization: Bearer <token>`
* **Request Body**:
```json
{
  "location": "Guwahati, Assam",
  "highestEducation": "Postgraduate",
  "degreeName": "M.Sc in Physics",
  "professionalQualification": "B.Ed",
  "professionalQualificationOther": "",
  "experience": "5-8 years",
  "salary": "₹5.0 LPA",
  "skills": ["Physics Instruction", "CBSE Curriculum", "Lab Safety"]
}
```
* **Success Response (200 OK)**:
```json
{
  "status": "success",
  "message": "Profile updated successfully"
}
```

#### 3. Upload/Update Resume File
* **Endpoint**: `POST /profile/resume`
* **Headers**: `Authorization: Bearer <token>`
* **Request Body (Multipart Form-Data)**:
  * `resume`: `[PDF file]`
* **Success Response (200 OK)**:
```json
{
  "status": "success",
  "data": {
    "resumeUrl": "https://sps-bucket.s3.amazonaws.com/resumes/user_42_updated.pdf"
  }
}
```

---

### B. Applications & Interviews Tracking

#### 1. Retrieve Candidate Applications
* **Endpoint**: `GET /profile/applications`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "status": "success",
  "data": [
    {
      "id": 501,
      "jobTitle": "Physics Teacher",
      "department": "Academic Department",
      "location": "Guwahati, Assam",
      "appliedDate": "June 8, 2026",
      "status": "Shortlisted",
      "type": "Full-time"
    }
  ]
}
```

#### 2. Retrieve Scheduled Interviews
* **Endpoint**: `GET /profile/interviews`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "status": "success",
  "data": [
    {
      "id": 12,
      "role": "Physics Teacher",
      "date": "June 25, 2026",
      "time": "14:30:00",
      "mode": "Online",
      "platform": "Google Meet",
      "link": "https://meet.google.com/abc-defg-hij",
      "interviewer": "Dr. Anita Sharma, Academic Head",
      "status": "Upcoming"
    }
  ]
}
```

---

### C. Notifications & Onboarding

#### 1. Retrieve Notifications
* **Endpoint**: `GET /notifications`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "text": "Your application for Physics Teacher has been shortlisted.",
      "time": "2 hours ago",
      "read": false
    }
  ]
}
```

#### 2. Mark Notification as Read
* **Endpoint**: `PUT /notifications/:id/read`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "status": "success",
  "message": "Notification marked as read"
}
```

#### 3. Retrieve Active Offer Letter
* **Endpoint**: `GET /profile/offers`
* **Headers**: `Authorization: Bearer <token>`
* **Success Response (200 OK)**:
```json
{
  "status": "success",
  "data": {
    "id": 99,
    "role": "Computer Science Teacher",
    "issuedDate": "June 28, 2026",
    "expiryDate": "July 10, 2026",
    "joiningDate": "July 15, 2026",
    "department": "Academic Department",
    "salary": "₹5.2 LPA",
    "status": "Pending"
  }
}
```

#### 4. Respond to Offer (Accept / Decline)
* **Endpoint**: `POST /profile/offers/:id/respond`
* **Headers**: `Authorization: Bearer <token>`
* **Request Body**:
```json
{
  "action": "accept" -- or "decline"
}
```
* **Success Response (200 OK)**:
```json
{
  "status": "success",
  "message": "Offer accepted successfully. Welcome to South Point School!"
}
```
