import { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";

const ExperienceForm = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [exp, setExp] = useState({
    role: "",
    company: "",
    from: "",
    to: "",
    description: "",
  });

  const addExperience = () => {
    if (!exp.role || !exp.company || !exp.from) return;

    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, exp],
    });

    setExp({ role: "", company: "", from: "", to: "", description: "" });
  };

  const removeExperience = (i) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((_, idx) => idx !== i),
    });
  };

  return (
    <div className="form-section">
      <h3>Experience</h3>

      <input
        placeholder="Role"
        value={exp.role}
        onChange={(e) => setExp({ ...exp, role: e.target.value })}
      />

      <input
        placeholder="Company"
        value={exp.company}
        onChange={(e) => setExp({ ...exp, company: e.target.value })}
      />

      <div className="date-checkbox-row">
        <input
          type="month"
          value={exp.from}
          onChange={(e) => setExp({ ...exp, from: e.target.value })}
        />

        <input
          type="month"
          value={exp.to}
          disabled={exp.to === "Present"}
          onChange={(e) => setExp({ ...exp, to: e.target.value })}
        />

        <label className="checkbox-inline">
          <input
            type="checkbox"
            checked={exp.to === "Present"}
            onChange={(e) =>
              setExp({
                ...exp,
                to: e.target.checked ? "Present" : "",
              })
            }
          />
          <span>Currently working here</span>
        </label>
      </div>

      <textarea
        placeholder="Description"
        value={exp.description}
        onChange={(e) => setExp({ ...exp, description: e.target.value })}
      />

      <button onClick={addExperience}>Add Experience</button>

      {resumeData.experience.map((_, i) => (
        <button key={i} onClick={() => removeExperience(i)}>
          ❌ Remove {i + 1}
        </button>
      ))}
    </div>
  );
};

export default ExperienceForm;
