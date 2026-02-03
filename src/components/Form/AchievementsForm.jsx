import { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";

const AchievementsForm = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [achievement, setAchievement] = useState("");

  const addAchievement = () => {
    if (!achievement.trim()) return;

    setResumeData({
      ...resumeData,
      achievements: [...resumeData.achievements, achievement],
    });

    setAchievement("");
  };

  const removeAchievement = (index) => {
    setResumeData({
      ...resumeData,
      achievements: resumeData.achievements.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="form-section">
      <h3>Achievements</h3>

      <input
        placeholder="e.g. Won Hackathon 2024"
        value={achievement}
        onChange={(e) => setAchievement(e.target.value)}
      />

      <button onClick={addAchievement}>Add Achievement</button>

      {resumeData.achievements.map((item, i) => (
        <div key={i} className="list-item">
          <span>{item}</span>
          <button onClick={() => removeAchievement(i)}>❌</button>
        </div>
      ))}
    </div>
  );
};

export default AchievementsForm;
