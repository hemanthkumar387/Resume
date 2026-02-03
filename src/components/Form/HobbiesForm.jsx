import { useContext, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";

const HobbiesForm = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [hobby, setHobby] = useState("");

  const addHobby = () => {
    if (!hobby.trim()) return;

    setResumeData({
      ...resumeData,
      hobbies: [...resumeData.hobbies, hobby],
    });

    setHobby("");
  };

  const removeHobby = (index) => {
    setResumeData({
      ...resumeData,
      hobbies: resumeData.hobbies.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="form-section">
      <h3>Hobbies</h3>

      <input
        placeholder="e.g. Badminton, Photography"
        value={hobby}
        onChange={(e) => setHobby(e.target.value)}
      />

      <button onClick={addHobby}>Add Hobby</button>

      <div className="chip-list">
        {resumeData.hobbies.map((h, i) => (
          <span key={i} className="chip">
            {h}
            <button onClick={() => removeHobby(i)}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default HobbiesForm;
