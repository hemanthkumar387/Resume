import { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";

const skillCategories = [
  "Programming Languages",
  "Web Technologies",
  "Backend Technologies",
  "Databases"
];

const SkillsForm = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [skill, setSkill] = useState("");
  const [category, setCategory] = useState(skillCategories[0]);

  const addSkill = () => {
    const cleaned = skill.trim();
    if (!cleaned) return;

    const existing =
      resumeData.skills[category]?.some(
        (s) => s.toLowerCase() === cleaned.toLowerCase()
      );

    if (existing) {
      setSkill("");
      return;
    }

    setResumeData({
      ...resumeData,
      skills: {
        ...resumeData.skills,
        [category]: [...resumeData.skills[category], cleaned]
      }
    });

    setSkill("");
  };

  const removeSkill = (cat, index) => {
    const updated = resumeData.skills[cat].filter((_, i) => i !== index);

    setResumeData({
      ...resumeData,
      skills: {
        ...resumeData.skills,
        [cat]: updated
      }
    });
  };

  return (
    <div className="form-section">
      <h3>Skills</h3>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {skillCategories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <input
        value={skill}
        placeholder="Enter skill"
        onChange={(e) => setSkill(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addSkill()}
      />

      <button onClick={addSkill}>Add Skill</button>

      {skillCategories.map((cat) => (
        resumeData.skills[cat]?.length > 0 && (
          <div key={cat} className="skill-group">
            <strong>{cat}</strong>

            <div className="skill-list">
              {resumeData.skills[cat].map((s, i) => (
                <span key={i} className="skill-chip">
                  {s}
                  <button
                    className="remove-skill"
                    onClick={() => removeSkill(cat, i)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default SkillsForm;
