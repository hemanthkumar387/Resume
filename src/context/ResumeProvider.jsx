import { useState, useEffect } from "react";
import { ResumeContext } from "./ResumeContext";

const LOCAL_STORAGE_KEY = "resumeData";

export const ResumeProvider = ({ children }) => {
  const defaultResumeData = {
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    photo: "",
    summary: "",
    skills: {
      "Programming Languages": [],
      "Web Technologies": [],
      "Backend Technologies": [],
      Databases: [],
    },
    education: [],
    experience: [],
    projects: [],
    achievements: [], // ✅ NEW
    certifications: [], // ✅ NEW
    hobbies: [], // ✅ NEW

    sectionOrder: [
      "summary",
      "skills",
      "experience",
      "projects",
      "education",
      "achievements",
      "certifications",
      "hobbies",
    ],
  };

  const [resumeData, setResumeData] = useState(() => {
    const storedData = localStorage.getItem("resumeData");
    return storedData
      ? { ...defaultResumeData, ...JSON.parse(storedData) }
      : defaultResumeData;
  });

  // 2️⃣ Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resumeData));
  }, [resumeData]);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};
