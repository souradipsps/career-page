import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  LayoutDashboard,
  FileText,
  Upload,
  User,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Briefcase,
  MapPin,
  Calendar,
  Download,
  Eye,
  Menu,
  Video,
  Link,
  PartyPopper,
  ClipboardCheck,
  Camera,
  Trash2,
} from "lucide-react";
import logoImg from "../../imports/images__1_-removebg-preview.png";
import type { ApplyFormData } from "./ApplyModal";
import { toast } from "sonner";

const MAROON = "#72102a";

const ALL_SKILLS = [
  "Curriculum Development", "Classroom Management", "Student Assessment",
  "Communication", "Leadership", "Team Collaboration", "Microsoft Office",
  "Data Analysis", "Project Management", "Problem Solving",
  "CBSE Curriculum", "Digital Literacy", "Research & Development",
  "Counselling", "Event Management", "Administration", "IT Support",
  "Sports Coaching", "Content Creation", "Public Speaking",
];

function SkillsMultiSelect({ selected, onChange }: { selected: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState("");
  const toggle = (opt: string) => onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);
  const addCustom = () => {
    const trimmed = custom.trim();
    if (trimmed && !selected.includes(trimmed)) { onChange([...selected, trimmed]); }
    setCustom("");
  };
  return (
    <div style={{ position: "relative" }}>
      <div onClick={() => setOpen(!open)} style={{ minHeight: "42px", padding: "8px 32px 8px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", background: "#faf8f5", cursor: "pointer", display: "flex", flexWrap: "wrap", gap: "4px", position: "relative" }}>
        {selected.length === 0 && <span style={{ color: "#9ca3af", fontSize: "0.85rem", alignSelf: "center" }}>Select or add skills…</span>}
        {selected.map((s) => (
          <span key={s} onClick={(e) => { e.stopPropagation(); toggle(s); }} style={{ background: `rgba(114,16,42,0.1)`, color: MAROON, fontSize: "0.72rem", fontWeight: 600, padding: "2px 8px", borderRadius: "999px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
            {s} ×
          </span>
        ))}
        <span style={{ position: "absolute", right: "10px", top: "50%", transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`, transition: "transform 0.2s", color: "#6b5c5c", fontSize: "0.75rem" }}>▼</span>
      </div>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: "8px", zIndex: 100, maxHeight: "220px", overflowY: "auto", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
          <div style={{ padding: "8px", borderBottom: "1px solid #f0f0f0", display: "flex", gap: "6px" }}>
            <input value={custom} onChange={(e) => setCustom(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCustom()} placeholder="Add custom skill…" style={{ flex: 1, padding: "6px 10px", border: "1px solid #e5e7eb", borderRadius: "6px", fontSize: "0.8rem", outline: "none" }} />
            <button onClick={addCustom} style={{ background: MAROON, color: "#fff", border: "none", borderRadius: "6px", padding: "6px 12px", fontSize: "0.78rem", cursor: "pointer", fontWeight: 600 }}>Add</button>
          </div>
          {ALL_SKILLS.map((opt) => (
            <div key={opt} onClick={() => toggle(opt)} style={{ padding: "9px 12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.82rem", color: selected.includes(opt) ? MAROON : "#1a0a0a", background: selected.includes(opt) ? "rgba(114,16,42,0.05)" : "transparent", fontWeight: selected.includes(opt) ? 600 : 400 }}>
              {opt}
              {selected.includes(opt) && <span style={{ color: MAROON }}>✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
const GOLD = "#c9a84c";
const CREAM = "#faf8f5";

const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

interface JobItem {
  id: number;
  title: string;
  department: string;
  type: string;
  location: string;
  deadline: string;
  category: string;
  description: string;
  qualifications: string[];
}

interface Props {
  onClose: () => void;
  userName?: string;
  signupData?: { name: string; lastName: string; email: string; phone: string } | null;
  appliedJobIds?: number[];
  allJobs?: JobItem[];
  onLogout?: () => void;
  initialProfileData?: ApplyFormData | null;
  initialTab?: string;
  initialSection?: "personal" | "professional" | "resume";
  onProfileUpdate?: (updatedData: ApplyFormData) => void;
  applicationsData?: Record<number, {
    coverLetter: string;
    noticePeriod: string;
    hasReferral: string;
    referralEmpId: string;
  }>;
}

const appliedJobs = [
  {
    id: 1,
    title: "Senior Mathematics Teacher",
    department: "Academic Department",
    location: "Guwahati, Assam",
    appliedDate: "June 10, 2026",
    status: "Under Review",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Physics Teacher",
    department: "Academic Department",
    location: "Guwahati, Assam",
    appliedDate: "June 8, 2026",
    status: "Shortlisted",
    type: "Full-time",
  },
  {
    id: 3,
    title: "Academic Coordinator",
    department: "Administration",
    location: "Guwahati, Assam",
    appliedDate: "June 5, 2026",
    status: "Rejected",
    type: "Full-time",
  },
  {
    id: 4,
    title: "Computer Science Teacher",
    department: "Academic Department",
    location: "Guwahati, Assam",
    appliedDate: "June 1, 2026",
    status: "Interview Scheduled",
    type: "Full-time",
  },
];

const notifications = [
  {
    id: 1,
    text: "Your application for Physics Teacher has been shortlisted.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    text: "Interview scheduled for Computer Science Teacher on June 20.",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    text: "Your application for Academic Coordinator was not successful.",
    time: "3 days ago",
    read: true,
  },
];

const statusConfig: Record<
  string,
  { color: string; bg: string; icon: React.ReactNode }
> = {
  "Under Review": {
    color: "#b45309",
    bg: "#fef3c7",
    icon: <Clock size={13} />,
  },
  Shortlisted: {
    color: "#065f46",
    bg: "#d1fae5",
    icon: <CheckCircle size={13} />,
  },
  Rejected: {
    color: "#991b1b",
    bg: "#fee2e2",
    icon: <XCircle size={13} />,
  },
  "Interview Scheduled": {
    color: "#1e40af",
    bg: "#dbeafe",
    icon: <AlertCircle size={13} />,
  },
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "applications", label: "My Applications", icon: FileText },
  { id: "resume", label: "My Profile & Resume", icon: Upload },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "interviews", label: "Upcoming Interviews", icon: Video },
  { id: "onboarding", label: "Onboarding", icon: ClipboardCheck },
];

const interviews = [
  {
    id: 1,
    role: "Computer Science Teacher",
    date: "June 20, 2026",
    time: "11:00 AM",
    mode: "Online",
    platform: "Google Meet",
    link: "https://meet.google.com/abc-defg-hij",
    interviewer: "Mr. Rajesh Kumar, HOD Technology",
    status: "Upcoming",
  },
  {
    id: 2,
    role: "Physics Teacher",
    date: "June 25, 2026",
    time: "2:30 PM",
    mode: "In-Person",
    platform: null,
    link: null,
    interviewer: "Dr. Anita Sharma, Academic Head",
    status: "Upcoming",
  },
];

const offerLetter = {
  role: "Computer Science Teacher",
  issuedDate: "June 28, 2026",
  expiryDate: "July 10, 2026",
  joiningDate: "July 15, 2026",
  department: "Academic Department",
  salary: "₹5.2 LPA",
};

export function CandidateDashboard({
  onClose,
  userName = "Candidate",
  signupData,
  appliedJobIds = [],
  allJobs = [],
  onLogout,
  initialProfileData,
  initialTab = "dashboard",
  initialSection,
  onProfileUpdate,
  applicationsData = {},
}: Props) {
  const dynamicApplications = allJobs
    .filter((j) => appliedJobIds.includes(j.id))
    .map((j) => ({
      id: j.id,
      title: j.title,
      department: j.department,
      location: j.location,
      appliedDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      status: "Under Review",
      type: j.type,
    }));
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedJobDesc, setSelectedJobDesc] = useState<JobItem | null>(null);
  const [resumeFile, setResumeFile] = useState<string | null>(
    initialProfileData?.resumeFile || null,
  );
  const [resumeUrl, setResumeUrl] = useState<string | null>(
    initialProfileData?.resumeUrl || null,
  );
  const [updateResume, setUpdateResume] = useState(false);
  const [fileSizeError, setFileSizeError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: initialProfileData?.fullName
      ? initialProfileData.fullName.trim().split(" ")[0]
      : (signupData?.name || userName),
    lastName: initialProfileData?.fullName
      ? initialProfileData.fullName.trim().split(" ").slice(1).join(" ")
      : (signupData?.lastName || ""),
    email: signupData?.email || "",
    phone: initialProfileData?.phone ?? (signupData?.phone || ""),
    location: initialProfileData?.location ?? "Guwahati, Assam",
    highestEducation: initialProfileData?.education ?? "",
    degreeName: initialProfileData?.degreeName ?? "",
    professionalQualification: initialProfileData?.professionalQualification ?? "",
    professionalQualificationOther: initialProfileData?.professionalQualificationOther ?? "",
    experience: initialProfileData?.experience ?? "",
    salary: initialProfileData?.salary ?? "",
    extracurricular: initialProfileData?.extracurricular ?? "",
    extracurricularOther: initialProfileData?.extracurricularOther ?? "",
    roles: (initialProfileData?.selectedRoles ?? []) as string[],
    skills: (initialProfileData?.selectedSkills ?? []) as string[],
    linkedin: initialProfileData?.linkedin ?? "",
    portfolio: initialProfileData?.portfolio ?? "",
  });
  const [saved, setSaved] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [resumeReplaced, setResumeReplaced] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<{
    type: "tab" | "close" | "logout";
    targetId?: string;
  } | null>(null);
  const personalSectionRef = useRef<HTMLDivElement>(null);
  const professionalSectionRef = useRef<HTMLDivElement>(null);
  const resumeSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialTab === "resume") {
      setTimeout(() => {
        if (initialSection === "personal") {
          personalSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (initialSection === "professional") {
          professionalSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          resumeSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, [initialTab, initialSection]);

  const revertUnsavedChanges = () => {
    setResumeFile(initialProfileData?.resumeFile || null);
    setResumeUrl(initialProfileData?.resumeUrl || null);
    setResumeReplaced(false);
  };

  const picRef = useRef<HTMLInputElement>(null);
  const [showPhotoPopup, setShowPhotoPopup] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraTargetDocKey, setCameraTargetDocKey] = useState<string | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 300, height: 300, facingMode: "user" }
      });
      setCameraStream(stream);
      setShowCamera(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      toast.error("Could not access camera. Please check permissions or device connection.");
    }
  };

  const startDocCamera = async (docKey: string) => {
    setCameraTargetDocKey(docKey);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "environment" }
      });
      setCameraStream(stream);
      setShowCamera(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      toast.error("Could not access camera. Please check permissions or device connection.");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
    setCameraTargetDocKey(null);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = cameraTargetDocKey ? 640 : 300;
      canvas.height = cameraTargetDocKey ? 480 : 300;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");

        if (cameraTargetDocKey) {
          setDocs((prev) => ({
            ...prev,
            [cameraTargetDocKey]: `Captured_${cameraTargetDocKey}.jpg`
          }));
          setDocUrls((prev) => ({
            ...prev,
            [cameraTargetDocKey]: dataUrl
          }));
        } else {
          setProfilePic(dataUrl);
        }
      }
    }
    stopCamera();
    setShowPhotoPopup(false);
  };

  const closePhotoPopup = () => {
    stopCamera();
    setShowPhotoPopup(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setProfilePic(URL.createObjectURL(f));
      setShowPhotoPopup(false);
    }
  };
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [offerRejected, setOfferRejected] = useState(false);
  const [showOfferConfirm, setShowOfferConfirm] = useState<"accept" | "reject" | null>(null);
  const [docs, setDocs] = useState<Record<string, string>>({});
  const [docUrls, setDocUrls] = useState<Record<string, string>>({});
  const [docStatus] = useState<Record<string, "pending" | "verified" | "rejected">>({});
  const [aadharNumber, setAadharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [pfNumber, setPfNumber] = useState("");
  const [esiNumber, setEsiNumber] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankHolder, setBankHolder] = useState("");
  const [docsSubmitted, setDocsSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmitDocs = () => {
    const requiredKeys = ["aadhar", "pan", "bank_details", "photo"];
    const missing = requiredKeys.filter(k => !docs[k]);
    if (missing.length > 0) {
      const getFriendlyName = (k: string) => {
        switch (k) {
          case "aadhar": return "Aadhaar Card";
          case "class10": return "Class 10 Marksheet";
          case "class12": return "Class 12 Marksheet";
          case "degree": return "Degree Certificate";
          case "photo": return "Passport Size Photo";
          case "pan": return "PAN Card";
          case "bank_details": return "Bank Details";
          case "experience_cert": return "Experience Certificate";
          case "driving_license": return "Driving License";
          case "prof_cert": return "Professional Certificate";
          default: return k;
        }
      };
      toast.error(`Please upload required documents. Missing: ${missing.map(getFriendlyName).join(", ")}`);
      return;
    }
    if (aadharNumber.replace(/\s/g, "").length !== 12) {
      toast.error("Please enter a valid 12-digit Aadhaar number");
      return;
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)) {
      toast.error("Please enter a valid 10-character PAN number");
      return;
    }
    if (!bankAccount.trim() || !bankIfsc.trim() || !bankName.trim() || !bankHolder.trim()) {
      toast.error("Please fill all bank details (Account Number, IFSC, Bank Name, Holder Name)");
      return;
    }
    setDocsSubmitted(true);
    toast.success("Documents submitted successfully!");
  };

  const unreadCount = notifications.filter(
    (n) => !n.read,
  ).length;

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { setFileSizeError("File exceeds 5 MB limit. Please upload a smaller file."); return; }
    setFileSizeError("");
    if (resumeUrl) URL.revokeObjectURL(resumeUrl);
    const url = URL.createObjectURL(f);
    setResumeFile(f.name);
    setResumeUrl(url);
    setUpdateResume(false);
    setResumeReplaced(true);
  };

  const handleViewResume = () => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
      return;
    }

    const fullName = [profile.name, profile.lastName].filter(Boolean).join(" ") || "Candidate Profile";
    const email = profile.email || "candidate@example.com";
    const phone = profile.phone || "Not provided";
    const locationVal = profile.location || "Not provided";

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Resume Preview - ${resumeFile || "Resume"}</title>
          <style>
            body {
              font-family: 'Inter', system-ui, -apple-system, sans-serif;
              background-color: #f3f4f6;
              margin: 0;
              padding: 40px 20px;
              color: #1f2937;
              line-height: 1.5;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
              background: #ffffff;
              padding: 50px 60px;
              box-shadow: 0 10px 25px rgba(0,0,0,0.05);
              border-radius: 12px;
              box-sizing: border-box;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #72102a;
              padding-bottom: 25px;
              margin-bottom: 30px;
            }
            .name {
              font-size: 32px;
              font-weight: 800;
              color: #72102a;
              margin: 0 0 5px 0;
              letter-spacing: -0.5px;
            }
            .subtitle {
              font-size: 15px;
              color: #c9a84c;
              text-transform: uppercase;
              letter-spacing: 2px;
              font-weight: 600;
              margin: 0 0 15px 0;
            }
            .contact-info {
              display: flex;
              justify-content: center;
              gap: 20px;
              font-size: 13px;
              color: #4b5563;
              flex-wrap: wrap;
            }
            .contact-info span {
              display: flex;
              align-items: center;
              gap: 5px;
            }
            .section {
              margin-bottom: 30px;
            }
            .section-title {
              font-size: 18px;
              font-weight: 700;
              color: #72102a;
              text-transform: uppercase;
              letter-spacing: 1px;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 6px;
              margin-bottom: 15px;
            }
            .grid-2 {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            .meta-item {
              margin-bottom: 12px;
            }
            .meta-label {
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              color: #9ca3af;
              letter-spacing: 0.5px;
              margin-bottom: 2px;
            }
            .meta-value {
              font-size: 14px;
              font-weight: 500;
              color: #111827;
            }
            .tag {
              display: inline-block;
              background-color: #f3f4f6;
              color: #374151;
              padding: 4px 10px;
              border-radius: 6px;
              font-size: 13px;
              margin-right: 6px;
              margin-bottom: 6px;
              font-weight: 500;
            }
            .alert-banner {
              background-color: #fef3c7;
              border: 1px solid #fcd34d;
              color: #92400e;
              padding: 12px;
              border-radius: 8px;
              font-size: 12px;
              text-align: center;
              margin-top: 40px;
              font-weight: 500;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="name">${fullName}</div>
              <div class="subtitle">Candidate Profile & Resume</div>
              <div class="contact-info">
                <span>✉ ${email}</span>
                <span>📞 ${phone}</span>
                <span>📍 ${locationVal}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Educational & Professional Background</div>
              <div class="grid-2">
                <div class="meta-item">
                  <div class="meta-label">Highest Qualification</div>
                  <div class="meta-value">${profile.highestEducation || "Not specified"}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Degree Name</div>
                  <div class="meta-value">${profile.degreeName || "Not specified"}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Professional Qualification</div>
                  <div class="meta-value">${profile.professionalQualification === "Other"
        ? (profile.professionalQualificationOther || "Other Qualification")
        : (profile.professionalQualification || "None")
      }</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Years of Experience</div>
                  <div class="meta-value">${profile.experience || "None"}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Expected Salary</div>
                  <div class="meta-value">${profile.salary || "Not specified"}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Extracurricular Activities</div>
                  <div class="meta-value">${profile.extracurricular === "Other"
        ? (profile.extracurricularOther || "Other Activities")
        : (profile.extracurricular || "None")
      }</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Interested Roles</div>
              <div>
                ${profile.roles && profile.roles.length > 0
        ? profile.roles.map(role => `<span class="tag">${role}</span>`).join("")
        : '<span style="color: #9ca3af; font-style: italic; font-size: 14px;">No roles selected</span>'
      }
              </div>
            </div>

            <div class="section">
              <div class="section-title">Skills</div>
              <div>
                ${profile.skills && profile.skills.length > 0
        ? profile.skills.map(skill => `<span class="tag">${skill}</span>`).join("")
        : '<span style="color: #9ca3af; font-style: italic; font-size: 14px;">No skills listed</span>'
      }
              </div>
            </div>

            ${(profile.linkedin || profile.portfolio) ? `
            <div class="section">
              <div class="section-title">Professional Links</div>
              <div class="grid-2">
                ${profile.linkedin ? `
                <div class="meta-item">
                  <div class="meta-label">LinkedIn Profile</div>
                  <div class="meta-value"><a href="${profile.linkedin.startsWith('http') ? profile.linkedin : 'https://' + profile.linkedin}" target="_blank" style="color: #72102a; text-decoration: none; font-weight: 600;">${profile.linkedin} ↗</a></div>
                </div>` : ''}
                ${profile.portfolio ? `
                <div class="meta-item">
                  <div class="meta-label">Portfolio URL</div>
                  <div class="meta-value"><a href="${profile.portfolio.startsWith('http') ? profile.portfolio : 'https://' + profile.portfolio}" target="_blank" style="color: #72102a; text-decoration: none; font-weight: 600;">${profile.portfolio} ↗</a></div>
                </div>` : ''}
              </div>
            </div>` : ''}

            <div class="alert-banner">
              This is a generated mockup preview representing the uploaded file: <strong>${resumeFile}</strong>.
            </div>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const [emailEdit, setEmailEdit] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const MOCK_OTP = "123456";

  const handleSave = () => {
    if (!profile.phone || profile.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }
    setSaved(true);
    toast.success("Profile changes saved successfully!");
    const updatedData: ApplyFormData = {
      fullName: [profile.name, profile.lastName].filter(Boolean).join(" "),
      email: profile.email || "",
      phone: profile.phone || "",
      location: profile.location || "",
      education: profile.highestEducation || "",
      degreeName: profile.degreeName || "",
      professionalQualification: profile.professionalQualification || "",
      professionalQualificationOther: profile.professionalQualificationOther || "",
      experience: profile.experience || "",
      salary: profile.salary || "",
      extracurricular: profile.extracurricular || "",
      extracurricularOther: profile.extracurricularOther || "",
      selectedRoles: profile.roles || [],
      selectedSkills: profile.skills || [],
      linkedin: profile.linkedin || "",
      portfolio: profile.portfolio || "",
      resumeFile: resumeFile || "",
      resumeUrl: resumeUrl || "",
    };
    onProfileUpdate?.(updatedData);
    setResumeReplaced(false);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          background: MAROON,
          padding: "0 24px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              padding: "4px",
            }}
          >
            <Menu size={20} />
          </button>
          <img
            src={logoImg}
            alt="South Point School"
            style={{ height: "32px", objectFit: "contain" }}
          />
          <div>
            <div
              style={{
                color: GOLD,
                fontSize: "0.85rem",
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                lineHeight: 1.1,
              }}
            >
              South Point School
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
              }}
            >
              CANDIDATE PORTAL
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div style={{ position: "relative" }}>
            <Bell
              size={18}
              color="rgba(255,255,255,0.8)"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (activeTab === "resume" && resumeReplaced) {
                  setPendingNavigation({ type: "tab", targetId: "notifications" });
                } else {
                  setActiveTab("notifications");
                }
              }}
            />
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: GOLD,
                  color: "#1a0a0a",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  borderRadius: "50%",
                  width: "15px",
                  height: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {unreadCount}
              </span>
            )}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.78rem",
            }}
            className="hidden sm:block"
          >
            {profile.name}
          </div>
          <button
            onClick={() => {
              const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
              if (isMobile && activeTab !== "dashboard") {
                if (activeTab === "resume" && resumeReplaced) {
                  setPendingNavigation({ type: "tab", targetId: "dashboard" });
                } else {
                  setActiveTab("dashboard");
                }
              } else {
                if (activeTab === "resume" && resumeReplaced) {
                  setPendingNavigation({ type: "close" });
                } else {
                  onClose();
                }
              }
            }}
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "6px",
              padding: "5px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#fff",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            <ChevronLeft size={14} color="#fff" /> Back
          </button>
        </div>
      </div>

      <div
        style={{ display: "flex", flex: 1, overflow: "hidden" }}
      >
        {/* Sidebar Backdrop Overlay on Mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                top: "56px",
                zIndex: 998,
                background: "rgba(0,0,0,0.4)",
              }}
              className="md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside
          style={{
            width: "220px",
            background: "#fff",
            borderRight: "1px solid #e5e7eb",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
          className={`fixed left-0 top-[56px] bottom-0 z-[999] shadow-lg flex transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:top-0 md:shadow-none md:flex md:translate-x-0`}
        >
          {/* User avatar */}
          <div
            style={{
              padding: "20px 16px",
              borderBottom: "1px solid #f0f0f0",
              textAlign: "center",
            }}
          >
            {/* Profile Picture Circle */}
            <div
              onClick={() => setShowPhotoPopup(true)}
              style={{
                position: "relative",
                width: "64px",
                height: "64px",
                margin: "0 auto 10px",
                cursor: "pointer",
                borderRadius: "50%",
                overflow: "hidden",
                border: `2px solid ${MAROON}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, border-color 0.2s",
              }}
              className="hover:scale-105 hover:border-[#c9a84c] group"
              title="Update profile picture"
            >
              {profilePic ? (
                <img src={profilePic} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${MAROON}, #4a0a1a)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", color: "#fff", fontWeight: 700 }}>
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              )}
              {/* Subtle hover overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0, 0, 0, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.2s",
                  color: "#fff",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                }}
                className="group-hover:opacity-100"
              >
                CHANGE
              </div>
            </div>
            <input
              ref={picRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoUpload}
            />
            <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#1a0a0a" }}>{profile.name}</div>
            <div style={{ color: "#6b5c5c", fontSize: "0.72rem", marginTop: "2px" }}>Job Applicant</div>
          </div>

          {/* Nav */}
          <nav style={{ padding: "12px 8px", flex: 1 }}>
            {[...navItems.filter(n => n.id !== "notifications"), ...navItems.filter(n => n.id === "notifications")].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  if (activeTab === "resume" && resumeReplaced) {
                    setPendingNavigation({ type: "tab", targetId: id });
                  } else {
                    setActiveTab(id);
                    setSidebarOpen(false);
                  }
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  background:
                    activeTab === id
                      ? `rgba(114,16,42,0.08)`
                      : "transparent",
                  color:
                    activeTab === id ? MAROON : "#4a4a4a",
                  fontWeight: activeTab === id ? 600 : 400,
                  fontSize: "0.82rem",
                  marginBottom: "2px",
                  transition: "all 0.15s",
                  textAlign: "left",
                }}
              >
                <Icon size={16} />
                {label}
                {id === "notifications" &&
                  unreadCount > 0 && (
                    <span
                      style={{
                        marginLeft: "auto",
                        background: MAROON,
                        color: "#fff",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        borderRadius: "999px",
                        padding: "1px 6px",
                      }}
                    >
                      {unreadCount}
                    </span>
                  )}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div
            style={{
              padding: "12px 8px",
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <button
              onClick={() => {
                if (activeTab === "resume" && resumeReplaced) {
                  setPendingNavigation({ type: "logout" });
                } else {
                  onLogout?.();
                }
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                background: "transparent",
                color: "#991b1b",
                fontSize: "0.82rem",
                fontWeight: 500,
              }}
            >
              <LogOut size={16} /> Log Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main
          onClick={() => sidebarOpen && setSidebarOpen(false)}
          style={{
            flex: 1,
            overflowY: "auto",
          }}
          className="p-4 md:p-6"
        >
          {/* Dashboard Overview */}
          {activeTab === "dashboard" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#1a0a0a",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                Welcome back, {profile.name}!
              </h1>
              <p
                style={{
                  color: "#6b5c5c",
                  fontSize: "0.85rem",
                  marginBottom: "20px",
                }}
              >
                Here's an overview of your applications and
                activity.
              </p>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "14px",
                  marginBottom: "24px",
                }}
              >
                {[
                  {
                    label: "Total Applied",
                    value: dynamicApplications.length,
                    color: MAROON,
                  },
                  {
                    label: "Shortlisted",
                    value: dynamicApplications.filter(
                      (j) => j.status === "Shortlisted",
                    ).length,
                    color: "#065f46",
                  },
                  {
                    label: "Interviews",
                    value: dynamicApplications.filter(
                      (j) => j.status === "Interview Scheduled",
                    ).length,
                    color: "#1e40af",
                  },
                  {
                    label: "Under Review",
                    value: dynamicApplications.filter(
                      (j) => j.status === "Under Review",
                    ).length,
                    color: "#b45309",
                  },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    style={{
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "10px",
                      padding: "16px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        color,
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        color: "#6b5c5c",
                        fontSize: "0.72rem",
                        marginTop: "4px",
                        fontWeight: 600,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Applications */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h2
                    style={{
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "#1a0a0a",
                    }}
                  >
                    Recent Applications
                  </h2>
                  <button
                    onClick={() => setActiveTab("applications")}
                    style={{
                      color: MAROON,
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    View All <ChevronRight size={13} />
                  </button>
                </div>
                {dynamicApplications.slice(0, 3).map((job) => {
                  const s = statusConfig[job.status] || {
                    color: "#555",
                    bg: "#f5f5f5",
                    icon: null,
                  };
                  return (
                    <div
                      key={job.id}
                      style={{
                        padding: "14px 20px",
                        borderBottom: "1px solid #f9f9f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: "0.875rem",
                            color: "#1a0a0a",
                          }}
                        >
                          {job.title}
                        </div>
                        <div
                          style={{
                            color: "#6b5c5c",
                            fontSize: "0.75rem",
                            marginTop: "2px",
                            display: "flex",
                            gap: "10px",
                          }}
                        >
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                            }}
                          >
                            <Calendar size={11} />
                            {job.appliedDate}
                          </span>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                            }}
                          >
                            <MapPin size={11} />
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <span
                        style={{
                          background: s.bg,
                          color: s.color,
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          padding: "4px 10px",
                          borderRadius: "999px",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {s.icon}
                        {job.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* My Applications */}
          {activeTab === "applications" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#1a0a0a",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                My Applications
              </h1>
              <p
                style={{
                  color: "#6b5c5c",
                  fontSize: "0.85rem",
                  marginBottom: "20px",
                }}
              >
                Track the status of all your submitted
                applications.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {dynamicApplications.length === 0 && (
                  <div style={{ textAlign: "center", padding: "40px 20px", color: "#9a8a8a", fontSize: "0.875rem" }}>
                    <Briefcase size={32} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
                    <div style={{ fontWeight: 600 }}>No applications yet</div>
                    <div style={{ marginTop: "4px", fontSize: "0.8rem" }}>Apply for jobs on the careers page to see them here.</div>
                  </div>
                )}
                {dynamicApplications.map((job) => {
                  const s = statusConfig[job.status] || {
                    color: "#555",
                    bg: "#f5f5f5",
                    icon: null,
                  };
                  return (
                    <div
                      key={job.id}
                      style={{
                        background: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        padding: "18px 20px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          gap: "12px",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontFamily:
                                "'Playfair Display', serif",
                              fontWeight: 700,
                              fontSize: "1rem",
                              color: "#1a0a0a",
                              marginBottom: "4px",
                            }}
                          >
                            {job.title}
                          </div>
                          <div
                            style={{
                              color: "#6b5c5c",
                              fontSize: "0.78rem",
                              marginBottom: "10px",
                            }}
                          >
                            {job.department}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "12px",
                            }}
                          >
                            <span
                              style={{
                                color: "#4a4a4a",
                                fontSize: "0.75rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <Briefcase
                                size={12}
                                color={MAROON}
                              />
                              {job.type}
                            </span>
                            <span
                              style={{
                                color: "#4a4a4a",
                                fontSize: "0.75rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <MapPin
                                size={12}
                                color={MAROON}
                              />
                              {job.location}
                            </span>
                            <span
                              style={{
                                color: "#4a4a4a",
                                fontSize: "0.75rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <Calendar
                                size={12}
                                color={MAROON}
                              />
                              Applied: {job.appliedDate}
                            </span>
                          </div>
                        </div>
                        <span
                          style={{
                            background: s.bg,
                            color: s.color,
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            padding: "5px 12px",
                            borderRadius: "999px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          {s.icon}
                          {job.status}
                        </span>
                      </div>
                      <div
                        style={{
                          marginTop: "12px",
                          paddingTop: "12px",
                          borderTop: "1px solid #f0f0f0",
                          display: "flex",
                          gap: "8px",
                        }}
                      >
                        <button
                          onClick={() => {
                            const fullJob = allJobs.find((j) => j.id === job.id);
                            if (fullJob) setSelectedJobDesc(fullJob);
                          }}
                          style={{
                            fontSize: "0.75rem",
                            color: MAROON,
                            fontWeight: 600,
                            background: "none",
                            border: `1px solid ${MAROON}`,
                            borderRadius: "6px",
                            padding: "5px 12px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <Eye size={12} /> View Job Description
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* My Profile & Resume */}
          {activeTab === "resume" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#1a0a0a",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  marginBottom: "4px",
                }}
              >
                My Profile & Resume
              </h1>
              <p
                style={{
                  color: "#6b5c5c",
                  fontSize: "0.85rem",
                  marginBottom: "20px",
                }}
              >
                Keep your profile updated to improve your
                chances.
              </p>

              {/* Card 1 — Personal Information */}
              <div
                ref={personalSectionRef}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "16px",
                }}
              >
                <h2
                  style={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: MAROON,
                    marginBottom: "16px",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Personal Information
                </h2>
                <div style={{ gap: "14px" }} className="grid grid-cols-1 sm:grid-cols-2">
                  {/* First Name */}
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>First Name</label>
                    <input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: capitalizeWords(e.target.value) })}
                      placeholder="First name"
                      style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: "#faf8f5", color: "#1a0a0a", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* Last Name */}
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>Last Name</label>
                    <input
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: capitalizeWords(e.target.value) })}
                      placeholder="Last name"
                      style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: "#faf8f5", color: "#1a0a0a", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* Email with OTP change flow */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>Email Address</label>
                    {!emailEdit ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <input value={profile.email} readOnly style={{ flex: 1, padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: "#f3f4f6", color: "#6b5c5c", boxSizing: "border-box" }} />
                        <button onClick={() => { setEmailEdit(true); setNewEmail(""); setOtpSent(false); setEnteredOtp(""); setOtpError(""); setEmailVerified(false); }}
                          style={{ background: MAROON, color: "#fff", border: "none", borderRadius: "8px", padding: "9px 16px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                          Change Email
                        </button>
                      </div>
                    ) : emailVerified ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", background: "#f0fdf4", border: "1px solid #6ee7b7", borderRadius: "8px" }}>
                        <CheckCircle size={16} color="#065f46" />
                        <span style={{ fontSize: "0.85rem", color: "#065f46", fontWeight: 600 }}>Email updated to {profile.email}</span>
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Enter new email address"
                            style={{ flex: 1, padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: "#faf8f5", color: "#1a0a0a", boxSizing: "border-box" }} />
                          {!otpSent ? (
                            <button onClick={() => { if (newEmail) { setOtpSent(true); setOtpError(""); } }}
                              style={{ background: MAROON, color: "#fff", border: "none", borderRadius: "8px", padding: "9px 16px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                              Send OTP
                            </button>
                          ) : (
                            <button onClick={() => { setOtpSent(false); setEnteredOtp(""); setOtpError(""); }}
                              style={{ background: "transparent", color: MAROON, border: `1px solid ${MAROON}`, borderRadius: "8px", padding: "9px 14px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                              Resend
                            </button>
                          )}
                        </div>
                        {otpSent && (
                          <>
                            <div style={{ fontSize: "0.75rem", color: "#065f46", background: "#f0fdf4", padding: "8px 12px", borderRadius: "6px", border: "1px solid #6ee7b7" }}>
                              OTP sent to <strong>{newEmail}</strong>. Enter the OTP you received.
                            </div>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <input value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value.slice(0, 6))} placeholder="Enter 6-digit OTP" maxLength={6} inputMode="numeric"
                                style={{ flex: 1, padding: "9px 12px", border: `1.5px solid ${otpError ? "#fca5a5" : "#e5e7eb"}`, borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: "#faf8f5", color: "#1a0a0a", letterSpacing: "0.15em", boxSizing: "border-box" }} />
                              <button onClick={() => {
                                if (enteredOtp.length > 0) {
                                  setProfile({ ...profile, email: newEmail });
                                  setEmailVerified(true);
                                  setEmailEdit(false);
                                  setOtpError("");
                                } else {
                                  setOtpError("Please enter the OTP.");
                                }
                              }} style={{ background: "#065f46", color: "#fff", border: "none", borderRadius: "8px", padding: "9px 16px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                                Verify OTP
                              </button>
                            </div>
                            {otpError && <div style={{ color: "#991b1b", fontSize: "0.75rem" }}>{otpError}</div>}
                          </>
                        )}
                        <button onClick={() => { setEmailEdit(false); setOtpSent(false); setEnteredOtp(""); setOtpError(""); }}
                          style={{ alignSelf: "flex-start", background: "transparent", color: "#6b5c5c", border: "none", fontSize: "0.75rem", cursor: "pointer", padding: 0, textDecoration: "underline" }}>
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Phone */}
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>Phone Number</label>
                    <input
                      value={profile.phone}
                      inputMode="numeric"
                      maxLength={10}
                      minLength={10}
                      pattern="\d{10}"
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                      placeholder="Enter a number"
                      style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: "#faf8f5", color: "#1a0a0a", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* Location */}
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>Current Location</label>
                    <input
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      placeholder="Guwahati, Assam"
                      style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: "#faf8f5", color: "#1a0a0a", boxSizing: "border-box" }}
                    />
                  </div>
                </div>
              </div>

              {/* Card 2 — Professional Information */}
              <div
                ref={professionalSectionRef}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "20px",
                  marginBottom: "16px",
                }}
              >
                <h2
                  style={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: MAROON,
                    marginBottom: "16px",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Professional Information
                </h2>
                <div style={{ gap: "14px" }} className="grid grid-cols-1 sm:grid-cols-2">
                  {/* Educational Qualification (mandatory) */}
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>Educational Qualification <span style={{ color: MAROON }}>*</span></label>
                    <select
                      value={profile.highestEducation}
                      onChange={(e) => setProfile({ ...profile, highestEducation: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", background: "#faf8f5", color: "#1a0a0a", boxSizing: "border-box" }}
                    >
                      <option value="">Select education</option>
                      <option>High School / 12th</option>
                      <option>Diploma</option>
                      <option>Bachelor's Degree</option>
                      <option>Master's Degree</option>
                      <option>M.Phil</option>
                      <option>PhD / Doctorate</option>
                      <option>B.Ed / M.Ed</option>
                    </select>
                  </div>

                  {/* Degree Name */}
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>Degree Name</label>
                    <input
                      value={profile.degreeName}
                      onChange={(e) => setProfile({ ...profile, degreeName: e.target.value })}
                      placeholder="e.g. M.Sc Mathematics"
                      style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: "#faf8f5", color: "#1a0a0a", boxSizing: "border-box" }}
                    />
                  </div>

                  {/* Professional Qualification */}
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>Professional Qualification <span style={{ fontWeight: 400, color: "#9a8a8a" }}>(Optional)</span></label>
                    <select
                      value={profile.professionalQualification}
                      onChange={(e) => setProfile({ ...profile, professionalQualification: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", background: "#faf8f5", color: "#1a0a0a", boxSizing: "border-box" }}
                    >
                      <option value="">Select qualification</option>
                      <option>B.Ed (Bachelor of Education)</option>
                      <option>M.Ed (Master of Education)</option>
                      <option>CTET / STET Certified</option>
                      <option>NET / SET Qualified</option>
                      <option>NTT (Nursery Teacher Training)</option>
                      <option>D.El.Ed (Diploma in Elementary Education)</option>
                      <option>PG Diploma in Education</option>
                      <option>Other</option>
                    </select>
                  </div>
                  {/* Degree Name */}
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>Degree Name</label>
                    <input
                      value={profile.professionalQualificationOther}
                      onChange={(e) => setProfile({ ...profile, professionalQualificationOther: e.target.value })}
                      placeholder="e.g. B.Ed, CTET, NET"
                      style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: "#faf8f5", color: "#1a0a0a", boxSizing: "border-box" }}
                    />
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>Years of Experience</label>
                    <select
                      value={profile.experience}
                      onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", background: "#faf8f5", color: "#1a0a0a", boxSizing: "border-box" }}
                    >
                      <option value="">Select experience</option>
                      <option>0–1 years (Fresher)</option>
                      <option>1–3 years</option>
                      <option>3–5 years</option>
                      <option>5–8 years</option>
                      <option>8+ years</option>
                    </select>
                  </div>

                  {/* Extracurricular Qualification */}
                  <div className="sm:col-start-1">
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>Extracurricular Qualification <span style={{ fontWeight: 400, color: "#9a8a8a" }}>(Optional)</span></label>
                    <select
                      value={profile.extracurricular}
                      onChange={(e) => setProfile({ ...profile, extracurricular: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", background: "#faf8f5", color: "#1a0a0a", boxSizing: "border-box" }}
                    >
                      <option value="">Select qualification</option>
                      <option>Sports Coaching</option>
                      <option>Music / Performing Arts</option>
                      <option>Drama / Theatre</option>
                      <option>Visual Arts / Craft</option>
                      <option>Debate / Public Speaking</option>
                      <option>Yoga / Physical Education</option>
                      <option>Scouting / NCC</option>
                      <option>Community Service / Social Work</option>
                      <option>STEM / Robotics Club</option>
                      <option>Environmental Activities</option>
                      <option>Other</option>
                    </select>
                  </div>
                  {/* Degree Name */}
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>Degree Name</label>
                    <input
                      value={profile.extracurricularOther}
                      onChange={(e) => setProfile({ ...profile, extracurricularOther: e.target.value })}
                      placeholder="e.g. Sports Coach, Music Diploma"
                      style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: "#faf8f5", color: "#1a0a0a", boxSizing: "border-box" }}
                    />
                  </div>
                </div>
                {/* Roles Interested In — full width */}
                <div style={{ marginTop: "14px" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>Roles Interested In</label>
                  <SkillsMultiSelect selected={profile.roles} onChange={(v) => setProfile({ ...profile, roles: v })} />
                </div>
                {/* Skills & Strengths — full width */}
                <div style={{ marginTop: "14px" }}>
                  <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>Skills & Strengths</label>
                  <SkillsMultiSelect selected={profile.skills} onChange={(v) => setProfile({ ...profile, skills: v })} />
                </div>
                {/* Salary Expectations + LinkedIn + Portfolio */}
                <div style={{ marginTop: "14px", gap: "14px" }} className="grid grid-cols-1 sm:grid-cols-2">
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>Salary Expectations (₹ per annum)</label>
                    <select
                      value={profile.salary}
                      onChange={(e) => setProfile({ ...profile, salary: e.target.value })}
                      style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", background: "#faf8f5", color: "#1a0a0a", boxSizing: "border-box" }}
                    >
                      <option value="">Select expected salary</option>
                      <option value="200000">₹2,00,000</option>
                      <option value="300000">₹3,00,000</option>
                      <option value="400000">₹4,00,000</option>
                      <option value="500000">₹5,00,000</option>
                      <option value="600000">₹6,00,000</option>
                      <option value="700000">₹7,00,000</option>
                      <option value="800000">₹8,00,000</option>
                      <option value="1000000">₹10,00,000</option>
                      <option value="1200000">₹12,00,000+</option>
                    </select>
                  </div>
                  <div className="hidden sm:block"></div>
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>LinkedIn Profile <span style={{ fontWeight: 400, color: "#9a8a8a" }}>(Optional)</span></label>
                    <input value={profile.linkedin} onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })} placeholder="https://linkedin.com/in/yourname"
                      style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: "#faf8f5", color: "#1a0a0a", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "5px" }}>Portfolio / GitHub / Other <span style={{ fontWeight: 400, color: "#9a8a8a" }}>(Optional)</span></label>
                    <input value={profile.portfolio} onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })} placeholder="https://github.com/username"
                      style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: "#faf8f5", color: "#1a0a0a", boxSizing: "border-box" }} />
                  </div>
                </div>
              </div>

              {/* CV / Resume — last section */}
              <div ref={resumeSectionRef} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px", marginBottom: "16px" }}>
                <h2 style={{ fontWeight: 700, fontSize: "0.95rem", color: MAROON, marginBottom: "16px", fontFamily: "'Playfair Display', serif" }}>CV / Resume</h2>
                <div style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "14px", marginBottom: "16px", background: "#faf8f5" }}>
                  <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1a0a0a", marginBottom: "6px" }}>Current Resume</div>
                  {resumeFile ? (
                    <>
                      <div style={{ fontSize: "0.8rem", color: "#6b5c5c", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <FileText size={13} color={MAROON} /> {resumeFile}
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={handleViewResume} style={{ border: `1px solid ${MAROON}`, color: MAROON, background: "white", borderRadius: "6px", padding: "7px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem" }}>
                          <Eye size={14} /> View Resume
                        </button>
                        <a href={resumeUrl || "#"} download={resumeFile} style={{ border: `1px solid ${MAROON}`, color: MAROON, background: "white", borderRadius: "6px", padding: "7px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", textDecoration: "none" }}>
                          <Download size={14} /> Download
                        </a>
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize: "0.8rem", color: "#9a8a8a", fontStyle: "italic" }}>No resume uploaded yet.</div>
                  )}
                </div>
                <div onClick={() => fileRef.current?.click()} style={{ border: `2px dashed ${MAROON}`, borderRadius: "10px", padding: "24px", textAlign: "center", cursor: "pointer", background: "#fdf8f9" }}>
                  <Upload size={28} style={{ color: MAROON, margin: "0 auto 10px" }} />
                  <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#1a0a0a" }}>{resumeFile ? "Replace Resume" : "Upload Resume"}</div>
                  <div style={{ color: "#6b5c5c", fontSize: "0.75rem", marginTop: "4px" }}>PDF, DOC or DOCX • Maximum 5 MB</div>
                  {fileSizeError && <div style={{ color: "#d00", fontSize: "0.75rem", marginTop: "6px" }}>{fileSizeError}</div>}
                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={handleResumeUpload} />
                </div>
              </div>

              {/* Save Changes */}
              <button onClick={handleSave} style={{ background: MAROON, color: "#fff", fontWeight: 600, fontSize: "0.85rem", border: "none", borderRadius: "8px", padding: "10px 28px", cursor: "pointer", transition: "opacity 0.2s" }}>
                {saved ? "Saved ✓" : "Save Changes"}
              </button>
            </motion.div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#1a0a0a",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  marginBottom: "20px",
                }}
              >
                Notifications
              </h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      background: n.read ? "#fff" : "#fef9f0",
                      border: `1px solid ${n.read ? "#e5e7eb" : "#fde68a"}`,
                      borderRadius: "10px",
                      padding: "14px 18px",
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: n.read ? "#d1d5db" : GOLD,
                        flexShrink: 0,
                        marginTop: "5px",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "#1a0a0a",
                          lineHeight: 1.5,
                        }}
                      >
                        {n.text}
                      </div>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "#9a8a8a",
                          marginTop: "4px",
                        }}
                      >
                        {n.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Onboarding */}
          {activeTab === "onboarding" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#1a0a0a", fontSize: "1.4rem", fontWeight: 700, marginBottom: "4px" }}>Onboarding</h1>
              <p style={{ color: "#6b5c5c", fontSize: "0.85rem", marginBottom: "20px" }}>Submit required documents and complete your onboarding process.</p>

              {/* Offer Letter — first */}
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <PartyPopper size={16} color={MAROON} />
                  <h2 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1a0a0a" }}>Offer Letter</h2>
                </div>
                <div style={{ padding: "20px" }}>
                  {/* Status Banner */}
                  {offerAccepted && (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#f0fdf4", border: "1px solid #6ee7b7", borderRadius: "10px", padding: "14px", marginBottom: "16px" }}>
                      <CheckCircle size={20} color="#065f46" style={{ flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#065f46" }}>Offer Accepted!</div>
                        <div style={{ color: "#374151", fontSize: "0.78rem", marginTop: "2px" }}>Welcome to South Point School. Joining date: <strong>{offerLetter.joiningDate}</strong></div>
                      </div>
                    </div>
                  )}
                  {offerRejected && (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "10px", padding: "14px", marginBottom: "16px" }}>
                      <XCircle size={20} color="#991b1b" style={{ flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#991b1b" }}>Offer Declined</div>
                        <div style={{ color: "#374151", fontSize: "0.78rem", marginTop: "2px" }}>You have declined the offer. Contact HR if this was a mistake.</div>
                      </div>
                    </div>
                  )}

                  {/* Offer Details */}
                  <div style={{ background: "#fef9f0", border: "1px solid #fde68a", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#1a0a0a", marginBottom: "10px" }}>Offer Details</div>
                    <div style={{ gap: "10px" }} className="grid grid-cols-1 sm:grid-cols-2">
                      {[
                        { label: "Position", value: offerLetter.role },
                        { label: "Department", value: offerLetter.department },
                        { label: "Joining Date", value: offerLetter.joiningDate },
                        { label: "Offered CTC", value: offerLetter.salary },
                        { label: "Issued On", value: offerLetter.issuedDate },
                        { label: "Offer Expires", value: offerLetter.expiryDate },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <div style={{ color: "#6b5c5c", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
                          <div style={{ color: label === "Offer Expires" ? "#b45309" : "#1a0a0a", fontSize: "0.85rem", fontWeight: 600, marginTop: "2px" }}>{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Button Group */}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {/* View Letter: always visible */}
                    <button style={{ border: `1px solid ${MAROON}`, color: MAROON, background: "#fff", borderRadius: "8px", padding: "9px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontWeight: 600 }}>
                      <Eye size={14} /> View Letter
                    </button>

                    {/* Download PDF: visible if not declined */}
                    {!offerRejected && (
                      <button style={{ border: `1px solid ${MAROON}`, color: MAROON, background: "#fff", borderRadius: "8px", padding: "9px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontWeight: 600 }}>
                        <Download size={14} /> Download PDF
                      </button>
                    )}

                    {/* Accept Offer: visible only if pending */}
                    {!offerAccepted && !offerRejected && (
                      <button onClick={() => setShowOfferConfirm("accept")} style={{ background: "#065f46", color: "#fff", border: "none", borderRadius: "8px", padding: "9px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontWeight: 700 }}>
                        <CheckCircle size={14} /> Accept Offer
                      </button>
                    )}

                    {/* Decline Offer: visible only if pending */}
                    {!offerAccepted && !offerRejected && (
                      <button onClick={() => setShowOfferConfirm("reject")} style={{ background: "#fff", border: "1px solid #fca5a5", color: "#991b1b", borderRadius: "8px", padding: "9px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontWeight: 600, marginLeft: "auto" }}>
                        <XCircle size={14} /> Decline Offer
                      </button>
                    )}
                  </div>

                  {/* Confirmation boxes */}
                  {showOfferConfirm === "accept" && (
                    <div style={{ marginTop: "14px", background: "#f0fdf4", border: "1px solid #6ee7b7", borderRadius: "10px", padding: "16px" }}>
                      <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#065f46", marginBottom: "10px" }}>Confirm acceptance of the offer for <strong>{offerLetter.role}</strong>?</div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => { setOfferAccepted(true); setShowOfferConfirm(null); }} style={{ background: "#065f46", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 20px", cursor: "pointer", fontWeight: 700, fontSize: "0.82rem" }}>Yes, Accept</button>
                        <button onClick={() => setShowOfferConfirm(null)} style={{ background: "#fff", border: "1px solid #d1d5db", color: "#4a4a4a", borderRadius: "6px", padding: "8px 16px", cursor: "pointer", fontSize: "0.82rem" }}>Cancel</button>
                      </div>
                    </div>
                  )}
                  {showOfferConfirm === "reject" && (
                    <div style={{ marginTop: "14px", background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "10px", padding: "16px" }}>
                      <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#991b1b", marginBottom: "10px" }}>Are you sure you want to decline the offer for <strong>{offerLetter.role}</strong>? This cannot be undone.</div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => { setOfferRejected(true); setShowOfferConfirm(null); }} style={{ background: "#991b1b", color: "#fff", border: "none", borderRadius: "6px", padding: "8px 20px", cursor: "pointer", fontWeight: 700, fontSize: "0.82rem" }}>Yes, Decline</button>
                        <button onClick={() => setShowOfferConfirm(null)} style={{ background: "#fff", border: "1px solid #d1d5db", color: "#4a4a4a", borderRadius: "6px", padding: "8px 16px", cursor: "pointer", fontSize: "0.82rem" }}>Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Document Uploads — shown only after offer accepted */}
              {offerAccepted && <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Upload size={16} color={MAROON} />
                  <h2 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1a0a0a" }}>Required Documents</h2>
                </div>
                <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {(() => {
                    const renderDoc = ({ key, label, accept, note }: any) => {
                      const uploaded = docs[key];
                      const verif = docsSubmitted && uploaded ? (docStatus[key] || "pending") : null;
                      const verifConfig = {
                        verified: { label: "Verified", color: "#065f46", bg: "#f0fdf4", border: "#6ee7b7", icon: <CheckCircle size={11} /> },
                        pending: { label: "Under Review", color: "#b45309", bg: "#fef3c7", border: "#fde68a", icon: <Clock size={11} /> },
                        rejected: { label: "Rejected", color: "#991b1b", bg: "#fee2e2", border: "#fca5a5", icon: <XCircle size={11} /> },
                      };
                      return (
                        <div key={key} style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "14px" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1a0a0a" }}>{label}</div>
                              <div style={{ color: "#9a8a8a", fontSize: "0.72rem", marginTop: "2px" }}>{uploaded ? uploaded : note}</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              {uploaded ? (
                                <>
                                  <div style={{ background: "#f0fdf4", border: "1px solid #6ee7b7", color: "#065f46", borderRadius: "6px", padding: "6px 12px", fontSize: "0.75rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
                                    <CheckCircle size={12} /> Uploaded
                                  </div>
                                  <button
                                    onClick={() => {
                                      const url = docUrls[key];
                                      if (url) {
                                        window.open(url, "_blank");
                                      } else {
                                        toast.info(`Previewing ${label} (${uploaded})`);
                                      }
                                    }}
                                    style={{ background: "#fff", border: `1.5px solid #e5e7eb`, color: "#4a4a4a", borderRadius: "6px", padding: "6px 12px", fontSize: "0.75rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}
                                    className="hover:bg-[#f0f0f0]"
                                  >
                                    <Eye size={12} /> View
                                  </button>
                                  {!docsSubmitted && (
                                    <button
                                      onClick={() => {
                                        setDocs((prev) => {
                                          const copy = { ...prev };
                                          delete copy[key];
                                          return copy;
                                        });
                                        setDocUrls((prev) => {
                                          const copy = { ...prev };
                                          delete copy[key];
                                          return copy;
                                        });
                                      }}
                                      style={{ background: "transparent", border: "none", color: "#dc2626", cursor: "pointer", display: "flex", alignItems: "center", padding: "4px" }}
                                      title="Remove document"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  )}
                                </>
                              ) : !docsSubmitted ? (
                                <>
                                  <label style={{ cursor: "pointer" }}>
                                    <div style={{ background: `rgba(114,16,42,0.07)`, border: `1px solid ${MAROON}`, color: MAROON, borderRadius: "6px", padding: "6px 12px", fontSize: "0.75rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
                                      <Upload size={12} /> Upload File
                                    </div>
                                    <input type="file" accept={accept} style={{ display: "none" }} onChange={(e) => {
                                      const f = e.target.files?.[0];
                                      if (f) {
                                        const url = URL.createObjectURL(f);
                                        setDocs((prev) => ({ ...prev, [key]: f.name }));
                                        setDocUrls((prev) => ({ ...prev, [key]: url }));
                                      }
                                    }} />
                                  </label>
                                  <button
                                    onClick={() => startDocCamera(key)}
                                    style={{ background: "#faf8f5", border: "1.5px solid #e5e7eb", color: "#4a4a4a", borderRadius: "6px", padding: "6px 12px", fontSize: "0.75rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap", cursor: "pointer" }}
                                    className="hover:bg-[#f0f0f0]"
                                  >
                                    <Camera size={12} /> Take Photo
                                  </button>
                                </>
                              ) : (
                                <span style={{ color: "#dc2626", fontSize: "0.75rem", fontWeight: 600 }}>Missing document</span>
                              )}
                            </div>
                          </div>

                          {/* Aadhaar Number input field */}
                          {key === "aadhar" && (
                            <div style={{ marginTop: "12px", borderTop: "1px solid #f3f4f6", paddingTop: "12px" }}>
                              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "6px" }}>
                                Aadhaar Number <span style={{ color: MAROON }}>*</span>
                              </label>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                                <input
                                  type="text"
                                  value={aadharNumber}
                                  disabled={docsSubmitted}
                                  onChange={(e) => {
                                    const rawVal = e.target.value.replace(/\D/g, "").slice(0, 12);
                                    const formatted = rawVal.replace(/(\d{4})(?=\d)/g, "$1 ");
                                    setAadharNumber(formatted);
                                  }}
                                  placeholder="1234 5678 9012"
                                  style={{
                                    width: "100%",
                                    maxWidth: "260px",
                                    padding: "8px 12px",
                                    border: `1.5px solid ${aadharNumber.replace(/\s/g, "").length === 12 ? "#065f46" : "#e5e7eb"}`,
                                    borderRadius: "8px",
                                    fontSize: "0.85rem",
                                    outline: "none",
                                    background: docsSubmitted ? "#f3f4f6" : "#faf8f5",
                                    color: docsSubmitted ? "#6b5c5c" : "#1a0a0a",
                                    cursor: docsSubmitted ? "not-allowed" : "text",
                                  }}
                                />
                                {aadharNumber.replace(/\s/g, "").length === 12 ? (
                                  <span style={{ color: "#065f46", fontSize: "0.75rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                                    <CheckCircle size={14} /> Valid format (12 digits)
                                  </span>
                                ) : aadharNumber.replace(/\s/g, "").length > 0 ? (
                                  <span style={{ color: "#dc2626", fontSize: "0.75rem", fontWeight: 500 }}>
                                    Enter 12 digits ({12 - aadharNumber.replace(/\s/g, "").length} remaining)
                                  </span>
                                ) : (
                                  <span style={{ color: "#6b5c5c", fontSize: "0.72rem" }}>
                                    Format: 12-digit number
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* PAN Number input field */}
                          {key === "pan" && (
                            <div style={{ marginTop: "12px", borderTop: "1px solid #f3f4f6", paddingTop: "12px" }}>
                              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "6px" }}>
                                PAN Number <span style={{ color: MAROON }}>*</span>
                              </label>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                                <input
                                  type="text"
                                  value={panNumber}
                                  disabled={docsSubmitted}
                                  onChange={(e) => {
                                    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
                                    setPanNumber(val);
                                  }}
                                  placeholder="ABCDE1234F"
                                  style={{
                                    width: "100%",
                                    maxWidth: "260px",
                                    padding: "8px 12px",
                                    border: `1.5px solid ${/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber) ? "#065f46" : "#e5e7eb"}`,
                                    borderRadius: "8px",
                                    fontSize: "0.85rem",
                                    outline: "none",
                                    background: docsSubmitted ? "#f3f4f6" : "#faf8f5",
                                    color: docsSubmitted ? "#6b5c5c" : "#1a0a0a",
                                    cursor: docsSubmitted ? "not-allowed" : "text",
                                  }}
                                />
                                {/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber) ? (
                                  <span style={{ color: "#065f46", fontSize: "0.75rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                                    <CheckCircle size={14} /> Valid format (ABCDE1234F)
                                  </span>
                                ) : panNumber.length > 0 ? (
                                  <span style={{ color: "#dc2626", fontSize: "0.75rem", fontWeight: 500 }}>
                                    Must match alphanumeric format (e.g. ABCDE1234F)
                                  </span>
                                ) : (
                                  <span style={{ color: "#6b5c5c", fontSize: "0.72rem" }}>
                                    Format: 10 characters (e.g. ABCDE1234F)
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Bank Details input fields */}
                          {key === "bank_details" && (
                            <div style={{ marginTop: "12px", borderTop: "1px solid #f3f4f6", paddingTop: "12px" }}>
                              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "10px" }}>
                                Bank Account Details <span style={{ color: MAROON }}>*</span>
                              </label>
                              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                                <div>
                                  <input type="text" value={bankHolder} disabled={docsSubmitted} onChange={(e) => setBankHolder(e.target.value)} placeholder="Account Holder's Name" style={{ width: "100%", padding: "8px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: docsSubmitted ? "#f3f4f6" : "#faf8f5", color: docsSubmitted ? "#6b5c5c" : "#1a0a0a" }} />
                                </div>
                                <div>
                                  <input type="text" value={bankAccount} disabled={docsSubmitted} onChange={(e) => setBankAccount(e.target.value.replace(/\D/g, ""))} placeholder="Account Number" style={{ width: "100%", padding: "8px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: docsSubmitted ? "#f3f4f6" : "#faf8f5", color: docsSubmitted ? "#6b5c5c" : "#1a0a0a" }} />
                                </div>
                                <div>
                                  <input type="text" value={bankIfsc} disabled={docsSubmitted} onChange={(e) => setBankIfsc(e.target.value.toUpperCase())} placeholder="IFSC Code" style={{ width: "100%", padding: "8px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: docsSubmitted ? "#f3f4f6" : "#faf8f5", color: docsSubmitted ? "#6b5c5c" : "#1a0a0a" }} />
                                </div>
                                <div>
                                  <input type="text" value={bankName} disabled={docsSubmitted} onChange={(e) => setBankName(e.target.value)} placeholder="Bank Name" style={{ width: "100%", padding: "8px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: docsSubmitted ? "#f3f4f6" : "#faf8f5", color: docsSubmitted ? "#6b5c5c" : "#1a0a0a" }} />
                                </div>
                              </div>
                            </div>
                          )}

                          {verif && (
                            <div style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "5px", background: verifConfig[verif].bg, border: `1px solid ${verifConfig[verif].border}`, color: verifConfig[verif].color, fontSize: "0.72rem", fontWeight: 700, padding: "3px 10px", borderRadius: "999px" }}>
                              {verifConfig[verif].icon} {verifConfig[verif].label}
                            </div>
                          )}
                        </div>
                      );
                    };

                    return (
                      <>
                        <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: MAROON, marginBottom: "8px" }}>Compulsory Details</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
                          {[
                            { key: "aadhar", label: "Aadhaar Card *", accept: ".pdf,.jpg,.jpeg,.png", note: "Front & back scan — PDF or image" },
                            { key: "pan", label: "PAN Card *", accept: ".pdf,.jpg,.jpeg,.png", note: "Required for salary processing" },
                            { key: "bank_details", label: "Bank Details *", accept: ".pdf,.jpg,.jpeg,.png", note: "Passbook or cancelled cheque" },
                            { key: "photo", label: "Passport Size Photo *", accept: ".jpg,.jpeg,.png", note: "White background, recent photo" },
                          ].map(renderDoc)}
                        </div>

                        <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: MAROON, marginBottom: "8px" }}>Optional Details</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                          <div style={{ border: "1px solid #e5e7eb", borderRadius: "10px", padding: "14px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                            <div>
                              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "6px" }}>PF Number</label>
                              <input type="text" value={pfNumber} disabled={docsSubmitted} onChange={(e) => setPfNumber(e.target.value.replace(/\D/g, ""))} placeholder="Enter PF Number" style={{ width: "100%", padding: "8px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: docsSubmitted ? "#f3f4f6" : "#faf8f5", color: docsSubmitted ? "#6b5c5c" : "#1a0a0a" }} />
                            </div>
                            <div>
                              <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a", display: "block", marginBottom: "6px" }}>ESI Number</label>
                              <input type="text" value={esiNumber} disabled={docsSubmitted} onChange={(e) => setEsiNumber(e.target.value.replace(/\D/g, ""))} placeholder="Enter ESI Number" style={{ width: "100%", padding: "8px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "0.85rem", outline: "none", background: docsSubmitted ? "#f3f4f6" : "#faf8f5", color: docsSubmitted ? "#6b5c5c" : "#1a0a0a" }} />
                            </div>
                          </div>
                          {[
                            { key: "driving_license", label: "Driving License", accept: ".pdf,.jpg,.jpeg,.png", note: "Valid driving license (Optional)" },
                            { key: "class10", label: "Class 10 Marksheet", accept: ".pdf,.jpg,.jpeg,.png", note: "Board certificate or marksheet (Optional)" },
                            { key: "class12", label: "Class 12 Marksheet", accept: ".pdf,.jpg,.jpeg,.png", note: "Board certificate or marksheet (Optional)" },
                            { key: "degree", label: "Degree / Graduation Certificate", accept: ".pdf,.jpg,.jpeg,.png", note: "Final degree or provisional certificate (Optional)" },
                            { key: "experience_cert", label: "Experience Certificate", accept: ".pdf,.jpg,.jpeg,.png", note: "From previous employer (Optional)" },
                            { key: "prof_cert", label: "Professional Certificate", accept: ".pdf,.jpg,.jpeg,.png", note: "Any relevant professional certificate (Optional)" },
                          ].map(renderDoc)}
                        </div>
                      </>
                    );
                  })()}

                  {/* Submit Button or Status Notice */}
                  {docsSubmitted ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#fef9f0", border: "1px solid #fde68a", borderRadius: "10px", padding: "14px", marginTop: "8px" }}>
                      <Clock size={20} color="#b45309" style={{ flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#b45309" }}>Documents Under Review</div>
                        <div style={{ color: "#374151", fontSize: "0.78rem", marginTop: "2px" }}>Your documents have been submitted and are currently under review by HR.</div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                      <button
                        onClick={handleSubmitDocs}
                        style={{
                          background: MAROON,
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          border: "none",
                          borderRadius: "8px",
                          padding: "10px 24px",
                          cursor: "pointer",
                          transition: "opacity 0.2s",
                        }}
                        className="hover:opacity-90"
                      >
                        Submit Documents
                      </button>
                    </div>
                  )}
                </div>
              </div>}

              {/* Onboarding Progress */}
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "8px" }}>
                  <ClipboardCheck size={16} color={MAROON} />
                  <h2 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1a0a0a" }}>Onboarding Progress</h2>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  {(() => {
                    const uploadedKeys = Object.keys(docs);
                    const allRequiredUploaded = docsSubmitted;
                    const anyUploadedAndVerified = uploadedKeys.some(k => docStatus[k] === "verified");
                    const steps = [
                      { label: "Profile Submitted", done: true, desc: "Your basic profile has been received." },
                      { label: "Offer Letter Accepted", done: offerAccepted, desc: "Accept your offer letter to proceed." },
                      { label: "Documentation Upload", done: allRequiredUploaded, desc: "Upload all required documents after accepting the offer." },
                      { label: "Document Verification", done: anyUploadedAndVerified, desc: "HR will verify your submitted documents." },
                      { label: "Background Check", done: false, desc: "HR will initiate a background verification." },
                      { label: "Joining Confirmation", done: false, desc: "You will receive a final confirmation email." },
                    ];
                    const completedCount = steps.filter(s => s.done).length;
                    const pct = Math.round((completedCount / steps.length) * 100);
                    return (
                      <>
                        <div style={{ marginBottom: "16px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4a4a4a" }}>Overall Progress</span>
                            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: MAROON }}>{pct}%</span>
                          </div>
                          <div style={{ background: "#f0f0f0", borderRadius: "999px", height: "8px", overflow: "hidden" }}>
                            <div style={{ background: MAROON, width: `${pct}%`, height: "100%", borderRadius: "999px", transition: "width 0.4s" }} />
                          </div>
                        </div>
                        {steps.map(({ label, done, desc }, idx) => (
                          <div key={label} style={{ display: "flex", gap: "12px", padding: "10px 0", borderBottom: idx < steps.length - 1 ? "1px solid #f9f9f9" : "none" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                              <div style={{ width: "22px", height: "22px", borderRadius: "50%", border: `2px solid ${done ? "#065f46" : "#d1d5db"}`, background: done ? "#065f46" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                {done ? <CheckCircle size={12} color="#fff" /> : <span style={{ fontSize: "0.6rem", color: "#9ca3af", fontWeight: 700 }}>{idx + 1}</span>}
                              </div>
                              {idx < steps.length - 1 && <div style={{ width: "2px", flex: 1, background: done ? "#065f46" : "#e5e7eb", minHeight: "12px" }} />}
                            </div>
                            <div style={{ paddingBottom: "8px" }}>
                              <div style={{ fontSize: "0.85rem", fontWeight: 600, color: done ? "#065f46" : "#1a0a0a" }}>{label}</div>
                              <div style={{ fontSize: "0.75rem", color: "#9a8a8a", marginTop: "2px" }}>{desc}</div>
                            </div>
                          </div>
                        ))}
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* HR Contact */}
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "18px 20px", marginTop: "16px" }}>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1a0a0a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <User size={15} color={MAROON} /> HR Contact
                </div>
                {[
                  { label: "HR Manager", value: "Ms. Priya Borah" },
                  { label: "Email", value: "hr@southpointguwahati.in" },
                  { label: "Office Hours", value: "Mon–Fri, 9 AM – 5 PM" },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", gap: "10px", fontSize: "0.82rem", marginBottom: "6px" }}>
                    <span style={{ color: "#6b5c5c", minWidth: "90px", fontWeight: 600 }}>{label}:</span>
                    <span style={{ color: "#1a0a0a" }}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Upcoming Interviews — separate tab */}
          {activeTab === "interviews" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#1a0a0a", fontSize: "1.4rem", fontWeight: 700, marginBottom: "4px" }}>Upcoming Interviews</h1>
              <p style={{ color: "#6b5c5c", fontSize: "0.85rem", marginBottom: "20px" }}>Your scheduled interviews and meeting links.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {interviews.length === 0 ? (
                  <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "48px", textAlign: "center", color: "#9a8a8a" }}>
                    <Video size={32} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
                    <div style={{ fontWeight: 600 }}>No interviews scheduled yet.</div>
                  </div>
                ) : interviews.map((iv) => (
                  <div key={iv.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap", marginBottom: "12px" }}>
                      <div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "#1a0a0a", marginBottom: "6px" }}>{iv.role}</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                          <span style={{ color: "#4a4a4a", fontSize: "0.78rem", display: "flex", alignItems: "center", gap: "4px" }}><Calendar size={12} color={MAROON} />{iv.date} at {iv.time}</span>
                          <span style={{ color: "#4a4a4a", fontSize: "0.78rem", display: "flex", alignItems: "center", gap: "4px" }}><User size={12} color={MAROON} />{iv.interviewer}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "8px" }}>
                          <span style={{ background: iv.mode === "Online" ? "#dbeafe" : "#f0fdf4", color: iv.mode === "Online" ? "#1e40af" : "#065f46", fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px", borderRadius: "999px" }}>{iv.mode}</span>
                          {iv.platform && <span style={{ color: "#6b5c5c", fontSize: "0.75rem" }}>via {iv.platform}</span>}
                        </div>
                      </div>
                      <span style={{ background: "#fef3c7", color: "#b45309", fontSize: "0.7rem", fontWeight: 700, padding: "4px 10px", borderRadius: "999px", flexShrink: 0 }}>{iv.status}</span>
                    </div>
                    {iv.link && (
                      <div style={{ padding: "12px 16px", background: "#eff6ff", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <Link size={14} color="#1e40af" />
                          <span style={{ color: "#1e40af", fontSize: "0.8rem", fontWeight: 600 }}>Meeting Link</span>
                          <span style={{ color: "#6b5c5c", fontSize: "0.75rem" }}>{iv.link}</span>
                        </div>
                        <a href={iv.link} target="_blank" rel="noreferrer" style={{ background: "#1e40af", color: "#fff", fontSize: "0.78rem", fontWeight: 600, padding: "7px 16px", borderRadius: "6px", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}>
                          <Video size={12} /> Join Interview
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#1a0a0a",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  marginBottom: "20px",
                }}
              >
                Settings
              </h1>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                {[
                  {
                    label: "Email Notifications",
                    desc: "Receive updates about your applications via email",
                  },
                  {
                    label: "SMS Alerts",
                    desc: "Get text message alerts for interview invitations",
                  },
                  {
                    label: "Profile Visibility",
                    desc: "Allow recruiters to find your profile",
                  },
                ].map(({ label, desc }, i) => (
                  <div
                    key={label}
                    style={{
                      padding: "16px 20px",
                      borderBottom:
                        i < 2 ? "1px solid #f0f0f0" : "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          color: "#1a0a0a",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          color: "#6b5c5c",
                          fontSize: "0.75rem",
                          marginTop: "2px",
                        }}
                      >
                        {desc}
                      </div>
                    </div>
                    <div
                      style={{
                        width: "40px",
                        height: "22px",
                        borderRadius: "999px",
                        background: MAROON,
                        cursor: "pointer",
                        position: "relative",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          right: "3px",
                          top: "3px",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: "#fff",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: "16px",
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "16px 20px",
                }}
              >
                <button
                  onClick={onClose}
                  style={{
                    color: "#991b1b",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    background: "none",
                    border: "1px solid #fca5a5",
                    borderRadius: "8px",
                    padding: "9px 20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {selectedJobDesc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedJobDesc(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2000,
              background: "rgba(0,0,0,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 16px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                background: "#fff",
                borderRadius: "16px",
                width: "100%",
                maxWidth: "500px",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.3)",
                padding: "28px",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedJobDesc(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
                }}
              >
                <X size={18} />
              </button>

              {/* Title & Department */}
              <h2
                style={{
                  color: MAROON,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  marginBottom: "6px",
                  paddingRight: "24px",
                }}
              >
                {selectedJobDesc.title}
              </h2>
              <div
                style={{
                  color: "#6b5c5c",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  marginBottom: "20px",
                }}
              >
                {selectedJobDesc.department} • {selectedJobDesc.location}
              </div>

              {/* Job Info Pills */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                <span style={{ background: "rgba(114,16,42,0.08)", color: MAROON, fontSize: "0.72rem", fontWeight: 600, padding: "4px 10px", borderRadius: "999px" }}>
                  {selectedJobDesc.type}
                </span>
                <span style={{ background: "rgba(201,168,76,0.12)", color: "#9a781b", fontSize: "0.72rem", fontWeight: 600, padding: "4px 10px", borderRadius: "999px" }}>
                  Deadline: {selectedJobDesc.deadline}
                </span>
              </div>

              {/* Description */}
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1a0a0a", marginBottom: "6px" }}>
                  Job Description
                </h4>
                <p style={{ fontSize: "0.82rem", color: "#4a4a4a", lineHeight: 1.6 }}>
                  {selectedJobDesc.description}
                </p>
              </div>

              {/* Qualifications */}
              {selectedJobDesc.qualifications && selectedJobDesc.qualifications.length > 0 && (
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1a0a0a", marginBottom: "8px" }}>
                    Required Qualifications
                  </h4>
                  <ul style={{ paddingLeft: "16px", margin: 0 }}>
                    {selectedJobDesc.qualifications.map((qual, idx) => (
                      <li key={idx} style={{ fontSize: "0.82rem", color: "#4a4a4a", lineHeight: 1.6, marginBottom: "4px", listStyleType: "disc" }}>
                        {qual}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Additional Information Submitted */}
              {appliedJobIds.includes(selectedJobDesc.id) && (
                <div style={{ marginTop: "20px", borderTop: "1.5px solid #e5e7eb", paddingTop: "20px" }}>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: MAROON, marginBottom: "12px" }}>
                    Your Additional Information
                  </h4>
                  {(() => {
                    const appData = applicationsData?.[selectedJobDesc.id] || {
                      coverLetter: "Interested in the position.",
                      noticePeriod: "Immediate",
                      hasReferral: "No",
                      referralEmpId: "",
                    };
                    return (
                      <div style={{ background: "#faf8f5", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div>
                          <span style={{ fontSize: "0.72rem", color: "#6b5c5c", fontWeight: 600, textTransform: "uppercase" }}>Notice Period</span>
                          <div style={{ fontSize: "0.82rem", color: "#1a0a0a", fontWeight: 500, marginTop: "2px" }}>{appData.noticePeriod}</div>
                        </div>
                        <div>
                          <span style={{ fontSize: "0.72rem", color: "#6b5c5c", fontWeight: 600, textTransform: "uppercase" }}>Referral Information</span>
                          <div style={{ fontSize: "0.82rem", color: "#1a0a0a", fontWeight: 500, marginTop: "2px" }}>
                            {appData.hasReferral === "Yes" ? `Yes (Employee ID: ${appData.referralEmpId})` : "No Referral"}
                          </div>
                        </div>
                        {appData.coverLetter && (
                          <div>
                            <span style={{ fontSize: "0.72rem", color: "#6b5c5c", fontWeight: 600, textTransform: "uppercase" }}>Cover Letter / SOP</span>
                            <div style={{ fontSize: "0.82rem", color: "#4a4a4a", marginTop: "2px", whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
                              {appData.coverLetter}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Action Button */}
              <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setSelectedJobDesc(null)}
                  style={{
                    background: MAROON,
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 24px",
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Picture Option Modal */}
      <AnimatePresence>
        {showPhotoPopup && !showCamera && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1100,
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
            onClick={closePhotoPopup}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                width: "100%",
                maxWidth: "360px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: MAROON,
                  marginBottom: "6px",
                }}
              >
                Profile Photo
              </h3>
              <p style={{ color: "#6b5c5c", fontSize: "0.82rem", marginBottom: "20px" }}>
                Update your candidate profile picture
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* Take Photo */}
                <button
                  onClick={startCamera}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    background: "rgba(114,16,42,0.05)",
                    border: `1.5px solid ${MAROON}`,
                    borderRadius: "10px",
                    padding: "12px",
                    color: MAROON,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  className="hover:bg-[rgba(114,16,42,0.1)]"
                >
                  <Camera size={16} /> Take Photo
                </button>

                {/* Choose Photo */}
                <button
                  onClick={() => picRef.current?.click()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    background: "#faf8f5",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: "10px",
                    padding: "12px",
                    color: "#4a4a4a",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  className="hover:bg-[#f0f0f0]"
                >
                  <Upload size={16} /> Choose Photo
                </button>

                {/* Remove Photo */}
                {profilePic && (
                  <button
                    onClick={() => {
                      setProfilePic(null);
                      setShowPhotoPopup(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      background: "rgba(220,38,38,0.05)",
                      border: "1.5px solid #ef4444",
                      borderRadius: "10px",
                      padding: "12px",
                      color: "#dc2626",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    className="hover:bg-[rgba(220,38,38,0.1)]"
                  >
                    <Trash2 size={16} /> Remove Photo
                  </button>
                )}

                {/* Cancel */}
                <button
                  onClick={closePhotoPopup}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#6b5c5c",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    padding: "10px",
                    marginTop: "6px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Camera Modal */}
      <AnimatePresence>
        {showCamera && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1200,
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
            onClick={stopCamera}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "24px",
                width: "100%",
                maxWidth: "380px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: MAROON,
                  marginBottom: "16px",
                }}
              >
                {cameraTargetDocKey ? "Scan Document" : "Take Photo"}
              </h3>

              {/* Video wrapper preview */}
              <div
                style={{
                  width: cameraTargetDocKey ? "280px" : "180px",
                  height: cameraTargetDocKey ? "190px" : "180px",
                  borderRadius: cameraTargetDocKey ? "8px" : "50%",
                  overflow: "hidden",
                  margin: "0 auto 20px",
                  border: `3px solid ${MAROON}`,
                  background: "#000",
                  position: "relative",
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  onClick={capturePhoto}
                  style={{
                    background: MAROON,
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    padding: "12px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Camera size={16} /> Capture {cameraTargetDocKey ? "Document" : "Photo"}
                </button>

                <button
                  onClick={stopCamera}
                  style={{
                    background: "#faf8f5",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: "10px",
                    padding: "12px",
                    color: "#4a4a4a",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
        {pendingNavigation && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2000,
              background: "rgba(0,0,0,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
            onClick={() => setPendingNavigation(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "28px 24px",
                width: "100%",
                maxWidth: "400px",
                boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  background: "rgba(114,16,42,0.08)",
                  borderRadius: "50%",
                  width: "56px",
                  height: "56px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <AlertCircle size={28} color={MAROON} />
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: MAROON,
                  marginBottom: "8px",
                }}
              >
                Unsaved Changes
              </h3>
              <p
                style={{
                  color: "#6b5c5c",
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  marginBottom: "24px",
                }}
              >
                Are you sure you do not want to save the changes? If you proceed, your new resume upload will be lost.
              </p>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => {
                    const action = pendingNavigation;
                    setPendingNavigation(null);
                    revertUnsavedChanges();
                    if (action.type === "tab" && action.targetId) {
                      setActiveTab(action.targetId);
                      setSidebarOpen(false);
                    } else if (action.type === "close") {
                      onClose();
                    } else if (action.type === "logout") {
                      onLogout?.();
                    }
                  }}
                  style={{
                    flex: 1,
                    background: MAROON,
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "opacity 0.2s",
                  }}
                  className="hover:opacity-90"
                >
                  Discard Changes
                </button>
                <button
                  onClick={() => setPendingNavigation(null)}
                  style={{
                    flex: 1,
                    background: "#faf8f5",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "12px",
                    color: "#4a4a4a",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  className="hover:bg-gray-50"
                >
                  Keep Editing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}