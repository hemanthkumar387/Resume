import { useContext } from "react";
import { ResumeContext } from "../../context/ResumeContext";

const SummaryForm = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  return (
    <div className="form-section">
      <h3>Professional Summary</h3>

      <textarea
        placeholder="Write a short professional summary"
        rows="4"
        value={resumeData.summary}
        onChange={(e) =>
          setResumeData({ ...resumeData, summary: e.target.value })
        }
      />
    </div>
  );
};

export default SummaryForm;
