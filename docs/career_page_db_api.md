# Career Page - Database Schema & API Documentation

This document defines the database schema and REST API endpoints required to support the front-end features of the **Career Page** (Job Listings, Application Forms, User Auth).

---

## 1. Database Schema

For a relational database system (e.g., PostgreSQL), the following tables are required for the career page functionality.

### `users` Table
Stores login credentials and basic contact information for both candidates and administrators.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'candidate' CHECK (role IN ('candidate', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `jobs` Table
Stores job vacancies published on the career website.

```sql
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    department VARCHAR(100) NOT NULL,
    job_type VARCHAR(50) NOT NULL, -- e.g., 'Full-time', 'Part-time', 'Contract'
    category VARCHAR(100) NOT NULL, -- e.g., 'Academic Positions', 'Administrative Positions'
    location VARCHAR(100) NOT NULL, -- e.g., 'Guwahati, Assam'
    deadline DATE NOT NULL,
    description TEXT NOT NULL,
    qualifications JSONB NOT NULL, -- Array of strings: ["B.Ed or equivalent", "M.Sc in Physics"]
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `otp_verifications` Table
Stores temporary codes for password resets or email/phone verification.

```sql
CREATE TABLE otp_verifications (
    id SERIAL PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL, -- email or phone number
    code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 2. API Documentation

### Base URL
`https://api.southpointschool.edu/v1`

---

### A. Authentication & Registration

#### 1. Register Candidate
* **Endpoint**: `POST /auth/register`
* **Description**: Registers a new user.
* **Request Body**:
```json
{
  "name": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "phone": "9876543210",
  "password": "SecurePassword123"
}
```
* **Success Response (201 Created)**:
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 42,
      "name": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "phone": "9876543210",
      "role": "candidate"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. User Login
* **Endpoint**: `POST /auth/login`
* **Description**: Authenticates user using email or phone.
* **Request Body**:
```json
{
  "identifier": "johndoe@example.com", 
  "password": "SecurePassword123"
}
```
* **Success Response (200 OK)**:
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 42,
      "name": "John",
      "lastName": "Doe",
      "email": "johndoe@example.com",
      "phone": "9876543210",
      "role": "candidate"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 3. Forgot Password / Request OTP
* **Endpoint**: `POST /auth/forgot-password/request`
* **Request Body**:
```json
{
  "identifier": "johndoe@example.com"
}
```
* **Success Response (200 OK)**:
```json
{
  "status": "success",
  "message": "Verification code sent to your registered contact info."
}
```

#### 4. Verify OTP & Reset Password
* **Endpoint**: `POST /auth/forgot-password/reset`
* **Request Body**:
```json
{
  "identifier": "johndoe@example.com",
  "otp": "123456",
  "newPassword": "MyNewSecurePassword456"
}
```
* **Success Response (200 OK)**:
```json
{
  "status": "success",
  "message": "Password updated successfully."
}
```

---

### B. Job Openings

#### 1. List All Active Jobs
* **Endpoint**: `GET /jobs`
* **Description**: Retrieves active job postings. Supports filtering by category and query search.
* **Query Parameters**:
  * `category` (optional) - e.g. `Academic Positions`
  * `search` (optional) - e.g. `Physics`
* **Success Response (200 OK)**:
```json
{
  "status": "success",
  "results": 2,
  "data": [
    {
      "id": 1,
      "title": "Senior Mathematics Teacher",
      "department": "Academic Department",
      "type": "Full-time",
      "category": "Academic Positions",
      "location": "Guwahati, Assam",
      "deadline": "2026-07-15",
      "description": "We are looking for an experienced Mathematics teacher...",
      "qualifications": [
        "Master's degree in Mathematics or related field",
        "B.Ed or equivalent teaching certification",
        "Experience in CBSE curriculum"
      ]
    }
  ]
}
```

#### 2. Get Job Details
* **Endpoint**: `GET /jobs/:id`
* **Success Response (200 OK)**:
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "Senior Mathematics Teacher",
    "department": "Academic Department",
    "type": "Full-time",
    "category": "Academic Positions",
    "location": "Guwahati, Assam",
    "deadline": "2026-07-15",
    "description": "We are looking for an experienced Mathematics teacher...",
    "qualifications": [
      "Master's degree in Mathematics",
      "B.Ed or equivalent teaching certification"
    ]
  }
}
```

---

### C. Application Submission

#### 1. Submit Job Application
* **Endpoint**: `POST /applications`
* **Headers**: `Authorization: Bearer <token>` (Required to link to the logged-in candidate)
* **Request Body (Multipart Form-Data)**:
  * `jobId`: `1`
  * `coverLetter`: "I am highly interested..."
  * `noticePeriod`: "30 Days"
  * `hasReferral`: `true`
  * `referralEmpId`: "SPS-987"
* **Success Response (201 Created)**:
```json
{
  "status": "success",
  "message": "Application submitted successfully",
  "data": {
    "applicationId": 501,
    "jobId": 1,
    "status": "Under Review",
    "appliedDate": "2026-06-24T11:51:00Z"
  }
}
```
