import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, FileText } from "lucide-react";
import { toast } from "sonner";

const MAROON = "#72102a";
const GOLD = "#c9a84c";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1.5px solid #e5e7eb",
  borderRadius: "8px",
  fontSize: "0.875rem",
  background: "#f9fafb",
  outline: "none",
  boxSizing: "border-box",
  color: "#1a0a0a",
};

const readOnlyStyle: React.CSSProperties = {
  ...inputStyle,
  background: "#f3f4f6",
  color: "#6b5c5c",
};

const sectionStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "20px",
  marginBottom: "16px",
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontWeight: 700,
  fontSize: "0.95rem",
  color: MAROON,
  marginBottom: "16px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.78rem",
  fontWeight: 600,
  color: "#4a4a4a",
  display: "block",
  marginBottom: "5px",
};

const ALL_ROLES = [
  "Senior Mathematics Teacher",
  "English Language & Literature Teacher",
  "Physics Teacher",
  "School Counsellor",
  "Computer Science Teacher",
  "Physical Education Teacher",
  "Academic Coordinator",
  "Office Administrator",
  "Facilities & Maintenance Supervisor",
  "IT Support Technician",
];

const ALL_SKILLS = [
  "Curriculum Development",
  "Classroom Management",
  "Student Assessment",
  "Communication",
  "Leadership",
  "Team Collaboration",
  "Microsoft Office",
  "Data Analysis",
  "Project Management",
  "Problem Solving",
  "CBSE Curriculum",
  "Digital Literacy",
  "Research & Development",
  "Counselling",
  "Event Management",
  "Administration",
  "IT Support",
  "Sports Coaching",
  "Content Creation",
  "Public Speaking",
];

function SkillsMultiSelect({
  options,
  selected,
  onChange,
  placeholder,
  readOnly = false,
}: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  placeholder: string;
  readOnly?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState("");

  const toggle = (opt: string) => {
    if (readOnly) return;
    onChange(
      selected.includes(opt)
        ? selected.filter((s) => s !== opt)
        : [...selected, opt],
    );
  };

  const addCustom = () => {
    if (readOnly) return;
    const trimmed = custom.trim();
    if (trimmed && !selected.includes(trimmed)) {
      onChange([...selected, trimmed]);
    }
    setCustom("");
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => !readOnly && setOpen(!open)}
        style={{
          minHeight: "42px",
          padding: "8px 32px 8px 12px",
          border: "1.5px solid #e5e7eb",
          borderRadius: "8px",
          background: readOnly ? "#f3f4f6" : "#f9fafb",
          cursor: readOnly ? "default" : "pointer",
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          position: "relative",
        }}
      >
        {selected.length === 0 && (
          <span
            style={{
              color: "#9ca3af",
              fontSize: "0.875rem",
              alignSelf: "center",
            }}
          >
            {placeholder}
          </span>
        )}
        {selected.map((s) => (
          <span
            key={s}
            onClick={(e) => {
              e.stopPropagation();
              if (readOnly) return;
              toggle(s);
            }}
            style={{
              background: `rgba(114,16,42,0.1)`,
              color: MAROON,
              fontSize: "0.72rem",
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: "999px",
              cursor: readOnly ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {s}{!readOnly && " ×"}
          </span>
        ))}
        {!readOnly && (
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
              transition: "transform 0.2s",
              color: "#6b5c5c",
              fontSize: "0.75rem",
            }}
          >
            ▼
          </span>
        )}
      </div>
      {open && !readOnly && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            borderRadius: "8px",
            zIndex: 100,
            maxHeight: "220px",
            overflowY: "auto",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              padding: "8px",
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              gap: "6px",
            }}
          >
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustom()}
              placeholder="Add custom…"
              style={{
                flex: 1,
                padding: "6px 10px",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                fontSize: "0.8rem",
                outline: "none",
              }}
            />
            <button
              onClick={addCustom}
              style={{
                background: MAROON,
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "6px 12px",
                fontSize: "0.78rem",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Add
            </button>
          </div>
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => toggle(opt)}
              style={{
                padding: "9px 12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.82rem",
                color: selected.includes(opt) ? MAROON : "#1a0a0a",
                background: selected.includes(opt)
                  ? "rgba(114,16,42,0.05)"
                  : "transparent",
                fontWeight: selected.includes(opt) ? 600 : 400,
              }}
            >
              {opt}
              {selected.includes(opt) && <Check size={13} color={MAROON} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface Props {
  job: { id: number; title: string; department: string; location: string; type: string } | null;
  onClose: () => void;
  onSubmit: (
    jobId: number,
    formData: { coverLetter: string; noticePeriod: string; hasReferral: string; referralEmpId: string },
    professionalData?: {
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
    }
  ) => void;
  onEditProfile: (draftData: any, section: "personal" | "professional" | "resume") => void;
  profileData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
  };
  resumeFile?: string | null;
  resumeUrl?: string | null;
  draftData?: any;
  savedProfileData?: any;
  scrollToSection?: "personal" | "professional" | "resume";
}

const JobApplicationModal = ({ job, onClose, onSubmit, onEditProfile, profileData, resumeFile, resumeUrl, draftData, savedProfileData, scrollToSection }: Props) => {
  const [submitted, setSubmitted] = useState(false);

  // Professional Information
  const [education, setEducation] = useState(draftData?.education ?? savedProfileData?.education ?? "");
  const [degreeName, setDegreeName] = useState(draftData?.degreeName ?? savedProfileData?.degreeName ?? "");
  const [professionalQual, setProfessionalQual] = useState(draftData?.professionalQual ?? savedProfileData?.professionalQualification ?? "");
  const [professionalQualOther, setProfessionalQualOther] = useState(draftData?.professionalQualOther ?? savedProfileData?.professionalQualificationOther ?? "");
  const [experience, setExperience] = useState(draftData?.experience ?? savedProfileData?.experience ?? "");
  const [salary, setSalary] = useState(draftData?.salary ?? savedProfileData?.salary ?? "");
  const [extracurricular, setExtracurricular] = useState(draftData?.extracurricular ?? savedProfileData?.extracurricular ?? "");
  const [extracurricularOther, setExtracurricularOther] = useState(draftData?.extracurricularOther ?? savedProfileData?.extracurricularOther ?? "");
  const [selectedRoles, setSelectedRoles] = useState<string[]>(draftData?.selectedRoles ?? savedProfileData?.selectedRoles ?? []);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(draftData?.selectedSkills ?? savedProfileData?.selectedSkills ?? []);
  const [linkedin, setLinkedin] = useState(draftData?.linkedin ?? savedProfileData?.linkedin ?? "");
  const [portfolio, setPortfolio] = useState(draftData?.portfolio ?? savedProfileData?.portfolio ?? "");

  // Additional Information
  const [coverLetter, setCoverLetter] = useState(draftData?.coverLetter ?? "");
  const [availability, setAvailability] = useState(draftData?.availability ?? "");
  const [reference, setReference] = useState(draftData?.reference ?? "");
  const [hasReferral, setHasReferral] = useState(draftData?.hasReferral ?? "No");
  const [referralEmpId, setReferralEmpId] = useState(draftData?.referralEmpId ?? "");

  const personalSectionRef = useRef<HTMLDivElement>(null);
  const professionalSectionRef = useRef<HTMLDivElement>(null);
  const resumeSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToSection) {
      setTimeout(() => {
        if (scrollToSection === "personal") {
          personalSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (scrollToSection === "professional") {
          professionalSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (scrollToSection === "resume") {
          resumeSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 350);
    }
  }, [scrollToSection]);

  const handleEditProfileClick = (section: "personal" | "professional" | "resume" = "personal") => {
    onEditProfile({
      education,
      degreeName,
      professionalQual,
      professionalQualOther,
      experience,
      salary,
      extracurricular,
      extracurricularOther,
      selectedRoles,
      selectedSkills,
      linkedin,
      portfolio,
      coverLetter,
      availability,
      hasReferral,
      referralEmpId,
    }, section);
  };

  const handleViewResume = () => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
      return;
    }
    
    const fullName = [profileData.firstName, profileData.lastName].filter(Boolean).join(" ") || "Candidate Profile";
    const email = profileData.email || "candidate@example.com";
    const phone = profileData.phone || "Not provided";
    const locationVal = profileData.location || "Not provided";
    
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
                  <div class="meta-value">${education || "Not specified"}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Degree Name</div>
                  <div class="meta-value">${degreeName || "Not specified"}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Professional Qualification</div>
                  <div class="meta-value">${
                    professionalQual === "Other" 
                      ? (professionalQualOther || "Other Qualification") 
                      : (professionalQual || "None")
                  }</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Years of Experience</div>
                  <div class="meta-value">${experience || "None"}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Expected Salary</div>
                  <div class="meta-value">${salary || "Not specified"}</div>
                </div>
                <div class="meta-item">
                  <div class="meta-label">Extracurricular Activities</div>
                  <div class="meta-value">${
                    extracurricular === "Other"
                      ? (extracurricularOther || "Other Activities")
                      : (extracurricular || "None")
                  }</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Interested Roles</div>
              <div>
                ${
                  selectedRoles.length > 0 
                    ? selectedRoles.map(role => `<span class="tag">${role}</span>`).join("") 
                    : '<span style="color: #9ca3af; font-style: italic; font-size: 14px;">No roles selected</span>'
                }
              </div>
            </div>

            <div class="section">
              <div class="section-title">Skills</div>
              <div>
                ${
                  selectedSkills.length > 0 
                    ? selectedSkills.map(skill => `<span class="tag">${skill}</span>`).join("") 
                    : '<span style="color: #9ca3af; font-style: italic; font-size: 14px;">No skills listed</span>'
                }
              </div>
            </div>

            ${(linkedin || portfolio) ? `
            <div class="section">
              <div class="section-title">Professional Links</div>
              <div class="grid-2">
                ${linkedin ? `
                <div class="meta-item">
                  <div class="meta-label">LinkedIn Profile</div>
                  <div class="meta-value"><a href="${linkedin.startsWith('http') ? linkedin : 'https://' + linkedin}" target="_blank" style="color: #72102a; text-decoration: none; font-weight: 600;">${linkedin} ↗</a></div>
                </div>` : ''}
                ${portfolio ? `
                <div class="meta-item">
                  <div class="meta-label">Portfolio URL</div>
                  <div class="meta-value"><a href="${portfolio.startsWith('http') ? portfolio : 'https://' + portfolio}" target="_blank" style="color: #72102a; text-decoration: none; font-weight: 600;">${portfolio} ↗</a></div>
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

  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !profileData.firstName?.trim() ||
      !profileData.lastName?.trim() ||
      !profileData.email?.trim() ||
      !profileData.phone?.trim() ||
      !profileData.location?.trim()
    ) {
      toast.error("Please complete all personal information fields (First Name, Last Name, Email, Phone, Location) in your profile before applying.");
      return;
    }

    if (!education) {
      toast.error("Educational Qualification is required");
      return;
    }
    if (!degreeName.trim()) {
      toast.error("Degree Name is required");
      return;
    }
    if (!experience) {
      toast.error("Years of Experience is required");
      return;
    }
    if (!salary) {
      toast.error("Salary Expectations is required");
      return;
    }
    if (selectedRoles.length === 0) {
      toast.error("Please select at least one Role Interested In");
      return;
    }
    if (selectedSkills.length === 0) {
      toast.error("Please select at least one Skill / Strength");
      return;
    }
    if (!coverLetter.trim()) {
      toast.error("Cover Letter is required");
      return;
    }
    if (!availability) {
      toast.error("Notice Period is required");
      return;
    }
    if (hasReferral === "Yes" && !referralEmpId.trim()) {
      toast.error("Please enter the Employee ID for the referral");
      return;
    }
    if (!resumeFile) {
      toast.error("Please upload your resume in your profile dashboard before applying for this job");
      return;
    }

    onSubmit(job.id, {
      coverLetter,
      noticePeriod: availability,
      hasReferral,
      referralEmpId,
    }, {
      education,
      degreeName,
      professionalQualification: professionalQual,
      professionalQualificationOther: professionalQualOther,
      experience,
      salary,
      extracurricular,
      extracurricularOther,
      selectedRoles,
      selectedSkills,
      linkedin,
      portfolio,
    });
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          background: "rgba(0,0,0,0.55)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "24px 16px",
          overflowY: "auto",
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
            background: "#f3f4f6",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "560px",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
            marginBottom: "24px",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <X size={15} color="#fff" />
          </button>

          {/* Header */}
          <div
            style={{
              background: `linear-gradient(135deg, ${MAROON} 0%, #3a0a1a 100%)`,
              padding: "28px 24px 22px",
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontSize: "1.3rem",
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                marginBottom: "6px",
              }}
            >
              {job.title}
            </h2>
            <div
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "0.82rem",
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <span>{job.department}</span>
              <span style={{ color: GOLD }}>·</span>
              <span>{job.location}</span>
              <span style={{ color: GOLD }}>·</span>
              <span>{job.type}</span>
            </div>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ padding: "48px 24px", textAlign: "center" }}
            >
              <div
                style={{
                  background: "rgba(114,16,42,0.08)",
                  borderRadius: "50%",
                  width: "64px",
                  height: "64px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Check size={28} color={MAROON} />
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: MAROON,
                  fontSize: "1.3rem",
                  fontWeight: 700,
                }}
              >
                Application Submitted!
              </h3>
              <p
                style={{
                  color: "#6b5c5c",
                  fontSize: "0.875rem",
                  marginTop: "8px",
                  lineHeight: 1.6,
                }}
              >
                Thank you for applying for <strong>{job.title}</strong>. We'll be in touch soon.
              </p>
              <button
                onClick={onClose}
                style={{
                  marginTop: "20px",
                  background: MAROON,
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 32px",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ padding: "20px" }}>

              {/* ── Section 1: Personal Information (read-only) ── */}
              <div ref={personalSectionRef} style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Personal Information</h3>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]"
                >
                  <div>
                    <label style={labelStyle}>
                      First Name <span style={{ color: MAROON }}>*</span>
                    </label>
                    <input
                      style={readOnlyStyle}
                      value={profileData.firstName}
                      readOnly
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>
                      Last Name <span style={{ color: MAROON }}>*</span>
                    </label>
                    <input
                      style={readOnlyStyle}
                      value={profileData.lastName}
                      readOnly
                    />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>
                      Email Address <span style={{ color: MAROON }}>*</span>
                    </label>
                    <input
                      style={readOnlyStyle}
                      value={profileData.email}
                      readOnly
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>
                      Phone <span style={{ color: MAROON }}>*</span>
                    </label>
                    <input
                      style={readOnlyStyle}
                      value={profileData.phone}
                      readOnly
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>
                      Current Location <span style={{ color: MAROON }}>*</span>
                    </label>
                    <input
                      style={readOnlyStyle}
                      value={profileData.location}
                      readOnly
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleEditProfileClick("personal")}
                  style={{
                    marginTop: "14px",
                    background: "transparent",
                    border: `1.5px solid ${MAROON}`,
                    color: MAROON,
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    padding: "8px 18px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    letterSpacing: "0.03em",
                  }}
                >
                  Edit Profile
                </button>
              </div>

              {/* ── Section 2: Professional Information ── */}
              <div ref={professionalSectionRef} style={sectionStyle}>
                <h3 style={sectionTitleStyle}>Professional Information</h3>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]"
                >
                  {/* Educational Qualification */}
                  <div>
                    <label style={labelStyle}>
                      Educational Qualification <span style={{ color: MAROON }}>*</span>
                    </label>
                    <select
                      required
                      style={readOnlyStyle}
                      value={education}
                      disabled
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
                    <label style={labelStyle}>
                      Degree Name <span style={{ color: MAROON }}>*</span>
                    </label>
                    <input
                      required
                      style={readOnlyStyle}
                      placeholder="e.g. M.Sc Mathematics"
                      value={degreeName}
                      readOnly
                    />
                  </div>

                  {/* Professional Qualification */}
                  <div>
                    <label style={labelStyle}>
                      Professional Qualification{" "}
                      <span style={{ fontWeight: 400, color: "#9a8a8a" }}>(Optional)</span>
                    </label>
                    <select
                      style={readOnlyStyle}
                      value={professionalQual}
                      disabled
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
                    <label style={labelStyle}>Degree Name</label>
                    <input
                      style={readOnlyStyle}
                      placeholder="e.g. B.Ed, CTET, NET"
                      value={professionalQualOther}
                      readOnly
                    />
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label style={labelStyle}>
                      Years of Experience <span style={{ color: MAROON }}>*</span>
                    </label>
                    <select
                      required
                      style={readOnlyStyle}
                      value={experience}
                      disabled
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
                    <label style={labelStyle}>
                      Extracurricular Qualification{" "}
                      <span style={{ fontWeight: 400, color: "#9a8a8a" }}>(Optional)</span>
                    </label>
                    <select
                      style={readOnlyStyle}
                      value={extracurricular}
                      disabled
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
                    <label style={labelStyle}>Degree Name</label>
                    <input
                      style={readOnlyStyle}
                      placeholder="e.g. Sports Coach, Music Diploma"
                      value={extracurricularOther}
                      readOnly
                    />
                  </div>
                </div>

                {/* Roles Interested In */}
                <div style={{ marginTop: "14px" }}>
                  <label style={labelStyle}>Roles Interested In</label>
                  <SkillsMultiSelect
                    options={ALL_ROLES}
                    selected={selectedRoles}
                    onChange={setSelectedRoles}
                    placeholder="Select one or more roles…"
                    readOnly
                  />
                </div>

                {/* Skills & Strengths */}
                <div style={{ marginTop: "14px" }}>
                  <label style={labelStyle}>Skills & Strengths</label>
                  <SkillsMultiSelect
                    options={ALL_SKILLS}
                    selected={selectedSkills}
                    onChange={setSelectedSkills}
                    placeholder="Select your skills…"
                    readOnly
                  />
                </div>

                {/* Salary Expectations + LinkedIn + Portfolio */}
                <div
                  style={{ marginTop: "14px" }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]"
                >
                  <div>
                    <label style={labelStyle}>
                      Salary Expectations (₹ per annum) <span style={{ color: MAROON }}>*</span>
                    </label>
                    <select
                      required
                      style={readOnlyStyle}
                      value={salary}
                      disabled
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
                    <label style={labelStyle}>
                      LinkedIn Profile{" "}
                      <span style={{ fontWeight: 400, color: "#9a8a8a" }}>(Optional)</span>
                    </label>
                    <input
                      style={readOnlyStyle}
                      placeholder="https://linkedin.com/in/yourname"
                      value={linkedin}
                      readOnly
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>
                      Portfolio / GitHub / Other{" "}
                      <span style={{ fontWeight: 400, color: "#9a8a8a" }}>(Optional)</span>
                    </label>
                    <input
                      style={readOnlyStyle}
                      placeholder="https://github.com/username"
                      value={portfolio}
                      readOnly
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleEditProfileClick("professional")}
                  style={{
                    marginTop: "14px",
                    background: "transparent",
                    border: `1.5px solid ${MAROON}`,
                    color: MAROON,
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    padding: "8px 18px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    letterSpacing: "0.03em",
                  }}
                >
                  Edit Profile
                </button>
              </div>

              {/* ── Section 3: Additional Information ── */}
              <div style={sectionStyle}>
                             {/* Cover Letter */}
                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>
                    Cover Letter / Why this role? <span style={{ color: MAROON }}>*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us why you're interested in this role and what makes you a great fit…"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                    }}
                  />
                </div>

                {/* Notice Period */}
                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>
                    Notice Period <span style={{ color: MAROON }}>*</span>
                  </label>
                  <select
                    required
                    style={inputStyle}
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  >
                    <option value="">Select notice period</option>
                    <option value="Immediate">Immediate</option>
                    <option value="7 Days">7 Days</option>
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="45 Days">45 Days</option>
                    <option value="60 Days">60 Days</option>
                  </select>
                </div>

                {/* Referral (Optional) */}
                <div style={{ marginBottom: "14px" }}>
                  <label style={labelStyle}>
                    Referral{" "}
                    <span style={{ fontWeight: 400, color: "#9a8a8a" }}>(Optional)</span>
                  </label>
                  <select
                    style={inputStyle}
                    value={hasReferral}
                    onChange={(e) => {
                      setHasReferral(e.target.value);
                      if (e.target.value === "No") {
                        setReferralEmpId("");
                      }
                    }}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {hasReferral === "Yes" && (
                  <div style={{ marginBottom: "14px" }}>
                    <label style={labelStyle}>
                      Employee ID <span style={{ color: MAROON }}>*</span>
                    </label>
                    <input
                      style={inputStyle}
                      placeholder="Enter employee ID"
                      value={referralEmpId}
                      onChange={(e) => setReferralEmpId(e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>

              {/* ── Section 4: CV / Resume ── */}
              <div ref={resumeSectionRef} style={sectionStyle}>
                <h3 style={sectionTitleStyle}>
                  CV / Resume <span style={{ color: MAROON }}>*</span>
                </h3>
                {resumeFile ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      background: "#fdf8f9",
                      border: `1.5px solid rgba(114,16,42,0.15)`,
                      borderRadius: "8px",
                      padding: "16px 20px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <FileText size={20} style={{ color: MAROON }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1a0a0a", wordBreak: "break-all" }}>
                          {resumeFile}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#6b5c5c" }}>
                          Uploaded in your profile
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      <button
                        type="button"
                        onClick={handleViewResume}
                        style={{
                          background: "#fff",
                          border: `1.5px solid ${MAROON}`,
                          color: MAROON,
                          fontWeight: 600,
                          fontSize: "0.78rem",
                          padding: "6px 14px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          transition: "opacity 0.2s",
                        }}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEditProfileClick("resume")}
                        style={{
                          background: MAROON,
                          color: "#fff",
                          border: "none",
                          fontWeight: 600,
                          fontSize: "0.78rem",
                          padding: "6px 14px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          transition: "opacity 0.2s",
                        }}
                      >
                        Update in My Profile
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      background: "#fafafa",
                      border: `1.5px dashed #ccc`,
                      borderRadius: "8px",
                      padding: "20px",
                    }}
                  >
                    <div style={{ fontSize: "0.875rem", color: "#6b5c5c", marginBottom: "10px" }}>
                      No resume found in your profile. Please upload a resume to apply.
                    </div>
                    <button
                      type="button"
                      onClick={() => handleEditProfileClick("resume")}
                      style={{
                        background: MAROON,
                        color: "#fff",
                        border: "none",
                        fontWeight: 600,
                        fontSize: "0.78rem",
                        padding: "8px 18px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "opacity 0.2s",
                      }}
                    >
                      Upload Resume in Profile
                    </button>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                style={{
                  background: MAROON,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  padding: "14px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  letterSpacing: "0.04em",
                  transition: "opacity 0.2s",
                }}
                className="hover:opacity-90"
              >
                Submit Application
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JobApplicationModal;
