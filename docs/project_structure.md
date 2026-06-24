# Project Directory & Component Structure Documentation

This document provides a comprehensive overview of the `src` directory, file structures, components, styling, and design system of the application.

---

## 1. Project Directory Overview

The project is built using **React**, **Vite**, **TypeScript**, and styled with **Tailwind CSS** and customized custom properties (CSS variables). The root project contains standard files like `package.json`, `tailwind.config.js` (or inline PostCSS configuration), `vite.config.ts`, and an `index.html` entry page, alongside the `src/` and `docs/` directories.

Below is the file tree of the source directory:

```text
src/
├── main.tsx                    # React application mount/entry point
├── app/
│   ├── App.tsx                 # Core parent component (Landing, Job Listings, main state)
│   └── components/             # Reusable business logic/modal components
│       ├── ApplyModal.tsx      # Comprehensive candidate registration and job apply form
│       ├── LoginModal.tsx      # Multi-step authentication (Login, Register, OTP Forgot Password)
│       ├── JobApplicationModal.tsx # Interactive form modal for candidate job details & skill selection
│       ├── CandidateDashboard.tsx  # Rich student/candidate portal (Interviews, Tests, Profile, Mock Videos)
│       ├── figma/
│       │   └── ImageWithFallback.tsx  # Dynamic image loader with built-in SVG placeholder fallback
│       └── ui/                 # Core modular UI library components (Shadcn style)
│           ├── accordion.tsx, alert.tsx, button.tsx, card.tsx, etc.
│           ├── use-mobile.ts   # Mobile responsiveness context/hook
│           └── utils.ts        # Helper functions (e.g., cn utility class merger)
├── imports/                    # Static image and media assets (png, jpg)
└── styles/                     # CSS stylesheets & theme variables
    ├── fonts.css               # Playfair Display, Inter, and Outfit font imports
    ├── globals.css             # Root Tailwind directives
    ├── index.css               # Shared layout resets
    ├── tailwind.css            # Tailwind directives import
    └── theme.css               # Brand variables (Maroon, Gold, Cream) and Tailwind utility custom variables
```

---

## 2. Core Application Flow (`src/`)

### Entry Point: [main.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/main.tsx)
- Bootstraps the application by rendering the [App](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/App.tsx) component inside the DOM node `#root`.
- Imports basic global styles (`./styles/index.css`).

### Main Page Layer: [App.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/App.tsx)
- Serves as the landing page of the career page portal.
- Displays key marketing headers, stats counters, campus highlights, testimonies, FAQs, and a interactive footer.
- Manages states like the active user login state, selected job category filters, search input, and modal triggers.
- Conditionally renders:
  - [LoginModal](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/LoginModal.tsx)
  - [ApplyModal](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ApplyModal.tsx)
  - [CandidateDashboard](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/CandidateDashboard.tsx)
  - [JobApplicationModal](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/JobApplicationModal.tsx)

---

## 3. Custom Business Components (`src/app/components/`)

### [LoginModal.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/LoginModal.tsx)
- **Role**: Manages Authentication processes.
- **Sub-Views**:
  1. **Login**: Simple email/password or phone/password fields with "Remember Me".
  2. **Sign Up**: Simple signup details fields (First name, Last name, email, phone, password).
  3. **Forgot Password**: Multi-step flow:
     - Step 1: Input identifier (Email or Phone).
     - Step 2: Input 6-digit OTP code (with a 30s resend timer countdown).
     - Step 3: Input new password + confirm password.
     - Step 4: Success confirmation leading back to the login page.
- **Key Props**:
  - `onClose: () => void` - Triggers closing the dialog.
  - `initialTab?: "login" | "signup" | "forgot"` - Determines screen default.
  - `onLoginSuccess?: (name: string) => void` - Callback on successful log-in.
  - `onSignupSuccess?: (data: SignupData) => void` - Callback on successful registration.

### [ApplyModal.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ApplyModal.tsx)
- **Role**: A detailed multi-section application form designed to compile candidates' complete portfolios.
- **Fields Captured**:
  - Personal Information (Name, email, phone, location, LinkedIn/Portfolio URLs)
  - Academic Profile (Highest education level, degree name, professional qualification certificates)
  - Experience (Years of experience, current salary/expectations)
  - Preferences (Role selections, extracurricular capability inputs)
  - Resume Document attachment
- **Key Interface**:
  ```typescript
  export interface ApplyFormData {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    education: string;
    degreeName: string;
    professionalQualification: string;
    professionalQualificationOther: string;
    experience: string;
    salary: string;
    extracurricular: string;
    extracurricularOther: string;
    selectedRoles: string[];
    selectedSkills: string[];
    linkedin: string;
    portfolio: string;
    resumeFile: string;
    resumeUrl?: string;
  }
  ```

### [JobApplicationModal.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/JobApplicationModal.tsx)
- **Role**: Displays detailed metadata about a specific selected job and triggers direct application context.
- Includes list constraints and customizable filters.
- Uses dropdown components to handle interactive skills additions.

### [CandidateDashboard.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/CandidateDashboard.tsx)
- **Role**: Fully responsive, sidebar-driven main workspace panel for candidates.
- **Sidebar Tabs**:
  1. **Dashboard Overview**: Displays summaries of active applications, alerts, and quick actions.
  2. **My Applications**: Detailed list of active, accepted, and rejected positions.
  3. **Interview Invites**: Real-time scheduler enabling candidates to view online/offline interview details and request reschedules.
  4. **Online Assessments**: Lists mandatory timed examinations or tests related to the job applications.
  5. **Mock Video Intro**: Allows candidates to record or upload brief video introductions, which are stored locally with custom timestamps.
  6. **Profile Details**: Interactive editing profile form with direct state synchronization.
  7. **Security**: Password changing utility.
  8. **Notification Center**: Bell-triggered popover detailing application updates and alerts.

### [ImageWithFallback.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/figma/ImageWithFallback.tsx)
- **Role**: Wraps standard `<img>` tags.
- Automatically listens to the `onError` image load events.
- In case of failure (broken local path or missing file), displays an elegant base64-encoded SVG placeholder vector representing an image error.

---

## 4. UI Library & Utilities (`src/app/components/ui/`)

This directory follows the Shadcn UI folder style, splitting layout and primitive logic into modular components:

- **Data Tables & Lists**: [table.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/table.tsx), [card.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/card.tsx), [carousel.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/carousel.tsx)
- **Overlay & Popovers**: [dialog.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/dialog.tsx), [drawer.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/drawer.tsx), [sheet.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/sheet.tsx), [dropdown-menu.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/dropdown-menu.tsx), [popover.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/popover.tsx)
- **Forms & Inputs**: [button.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/button.tsx), [input.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/input.tsx), [select.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/select.tsx), [checkbox.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/checkbox.tsx), [form.tsx](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/form.tsx)
- **Utility Hooks & Styles**:
  - [use-mobile.ts](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/use-mobile.ts) - custom react hook to detect screen thresholds (`width < 768px`) for rendering drawer sheets instead of static sidebars.
  - [utils.ts](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/app/components/ui/utils.ts) - exports the `cn` function (using `clsx` and `tailwind-merge`) to allow conditional string class merging inside components.

---

## 5. Style System (`src/styles/`)

The style system leverages a hybrid CSS Variable + Tailwind utility configuration to enforce brand identity:

1. [theme.css](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/styles/theme.css):
   Defines the primary core values of the school theme:
   - `--maroon` (`#72102a`): Brand primary theme color.
   - `--gold` (`#c9a84c`): Brand secondary highlights and buttons.
   - `--cream` (`#faf8f5`): Light-mode cream layout backgrounds.
2. [fonts.css](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/styles/fonts.css):
   Import paths for custom typography:
   - **Playfair Display**: For titles, headers, and section headings.
   - **Outfit** / **Inter**: For body copy, listings, labels, and forms.
3. [globals.css](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/styles/globals.css) & [tailwind.css](file:///c:/Users/Souradip%20Roy/Downloads/Position%20Employee%20Testimonials%20Section%20%282%29/src/styles/tailwind.css):
   Standard directives mapping tailwind layers (`base`, `components`, `utilities`) and injecting custom styling overlays.

---

## 6. Static Imports (`src/imports/`)

Static assets are kept together to prevent external dependencies breakdowns:
- `images__1_-removebg-preview.png`: Core logo asset.
- `10a15b8b-d73e-4e1f-bec7-7aa8264d6092.jpg`: Campus background and banner.
- `image-1.png` to `image-12.png`: Representative thumbnails for job cards, academic profiles, student testimonials, and category visual representation.
