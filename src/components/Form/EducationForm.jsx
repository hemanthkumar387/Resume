import { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";

const EducationForm = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [edu, setEdu] = useState({
    degree: "",
    course: "",
    institution: "",
    from: "",
    to: "",
    score: "",
  });

  const addEducation = () => {
    if (!edu.degree || !edu.institution) return;

    setResumeData({
      ...resumeData,
      education: [...resumeData.education, edu],
    });

    setEdu({ degree: "", course: "", institution: "", from: "", to: "", score: "" });
  };

  const removeEducation = (i) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((_, idx) => idx !== i),
    });
  };

  return (
    <div className="form-section">
      <h3>Education</h3>

      <input
        placeholder="Degree (e.g. B.Tech, B.Sc)"
        value={edu.degree}
        onChange={(e) => setEdu({ ...edu, degree: e.target.value })}
      />

      <input
        placeholder="Course / Specialization (e.g. Computer Science)"
        value={edu.course}
        onChange={(e) => setEdu({ ...edu, course: e.target.value })}
      />

      <input
        placeholder="Institution / College"
        value={edu.institution}
        onChange={(e) => setEdu({ ...edu, institution: e.target.value })}
      />

      <div className="date-checkbox-row">
        <input
          type="month"
          value={edu.from}
          onChange={(e) => setEdu({ ...edu, from: e.target.value })}
        />

        <input
          type="month"
          value={edu.to}
          onChange={(e) => setEdu({ ...edu, to: e.target.value })}
        />
      </div>

      <input
        placeholder="CGPA / Percentage (optional)"
        value={edu.score}
        onChange={(e) => setEdu({ ...edu, score: e.target.value })}
      />

      <button onClick={addEducation}>Add Education</button>

      {resumeData.education.map((_, i) => (
        <button key={i} onClick={() => removeEducation(i)}>
          ❌ Remove {i + 1}
        </button>
      ))}
    </div>
  );
};

export default EducationForm;
